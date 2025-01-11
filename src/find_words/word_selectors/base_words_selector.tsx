import { GAMES } from "../../data_objects/enums/game_objects";
import { GameMode } from "../../data_objects/general/game_mode";

import { WordDetails } from "../../data_objects/words/basic_data_objects/word_details";
import { WordStatisticsData } from "../../data_objects/words/basic_data_objects/word_statistics_data";
import { Words } from "../../data_objects/words/basic_data_objects/words";
import { GameWordDictDetails } from "../../data_objects/words/game_data_objects/game_word_dict_details";
import { GameWords } from "../../data_objects/words/game_data_objects/game_words";
import { MultipleChoicesGameWords } from "../../data_objects/words/game_data_objects/multiple_choices_game_words";
import { EnrichMultipleChoices } from "../enrich_words/enrich_multiple_choices";

export default abstract class BaseWordsSelector {
    private enrichWordsDictByGameMode;

    constructor () {
        this.enrichWordsDictByGameMode = {
            [GAMES.MC.id]: EnrichMultipleChoices,
            [GAMES.KDK.id]: null,
        } 
    }

    select(newWords: Words, practicedWords: { [groupId: number]: { [word: string]: WordStatisticsData; }; }, groupId: number, totalAmount: number, wordsDict: GameWords, gameMode: number): GameWords | MultipleChoicesGameWords {
        if (!wordsDict[groupId]) {
            wordsDict[groupId] = {};
        }

        const newWordsInLevel = newWords[groupId];
        const practiceWordsInLevel = practicedWords[groupId];

        const split = this.getSplit(totalAmount, newWordsInLevel, practiceWordsInLevel);
        const relevantNewWordsArray = Object.entries(this._selectInternal(newWordsInLevel, practiceWordsInLevel, true));
        const relevantPracticedWordsArray = Object.entries(this._selectInternal(newWordsInLevel, practiceWordsInLevel, false));

        this.addRandomWordsToGameWords(relevantNewWordsArray, split.newWordsAmount, wordsDict, groupId, gameMode);
        this.addRandomWordsToGameWords(relevantPracticedWordsArray, split.practicedAmount, wordsDict, groupId, gameMode);

        const enrichWordsDict = this.enrichWordsDictByGameMode[gameMode as GameMode];
        if (enrichWordsDict) {
            return new enrichWordsDict(newWords, practicedWords).enrich(wordsDict);
        }

        return wordsDict;
    }

    addRandomWordsToGameWords(relevantWordsArray: [string, GameWordDictDetails][], amountToAdd: number, wordsDict: GameWords, groupId: number, gameMode: number) {
        // contains the "used" indexes
        const takenWordsindexList: number[] = [];
        
        // loop the amount requested for
        for (let i = 0; i < Math.min(amountToAdd, relevantWordsArray.length); i++) {
            // random index
            let randomIndex = Math.floor(Math.random() * relevantWordsArray.length); 

            // continues to create random indexes if already inside
            while (takenWordsindexList.includes(randomIndex)) {
                randomIndex = Math.floor(Math.random() * relevantWordsArray.length); 
            }

            // adding the random words to the wordsDict
            wordsDict[groupId][relevantWordsArray[randomIndex][0]] = {
                FullWord: relevantWordsArray[randomIndex][1].FullWord,
                Meanings: relevantWordsArray[randomIndex][1].Meanings,
                Group: relevantWordsArray[randomIndex][1].Group,
                Type: relevantWordsArray[randomIndex][1].Type
            }

            // adds the index to the "used" indexes
            takenWordsindexList.push(randomIndex);
        }
    }

    _selectInternal(newWords: { [word: string]: WordDetails }, practicedWords: { [word: string]: WordStatisticsData }, selectNew: boolean): { [word: string]: GameWordDictDetails } {
        if (selectNew) {
            return this.selectNewInternal(newWords);
        } else {
            return this.selectPracticedInternal(practicedWords);
        }
    }

    abstract getSplit(totalAmount: number, newWords: { [word: string]: WordDetails }, practicedWords: { [word: string]: WordStatisticsData }): { newWordsAmount: number; practicedAmount: number };

    abstract selectPracticedInternal(practicedWords: { [word: string]: WordStatisticsData }): { [word: string]: GameWordDictDetails };

    abstract selectNewInternal(newWords: { [word: string]: WordDetails }): { [word: string]: GameWordDictDetails };
}