import { WordDetails } from "../../data_objects/words/basic_data_objects/word_details";
import { WordStatisticsData } from "../../data_objects/words/basic_data_objects/word_statistics_data";
import { GameWordDictDetails } from "../../data_objects/words/game_data_objects/game_word_dict_details";
import { GameWords } from "../../data_objects/words/game_data_objects/game_words";

export default abstract class BaseWordsSelector {
    select(newWords: { [word: string]: WordDetails }, practicedWords: { [word: string]: WordStatisticsData }, groupId: number, totalAmount: number, wordsDict: GameWords) {
        if (!wordsDict[groupId]) {
            wordsDict[groupId] = {};
        }

        const split = this.getSplit(totalAmount, newWords, practicedWords);
        const relevantNewWordsArray = Object.entries(this._selectInternal(newWords, practicedWords, true));
        const relevantPracticedWordsArray = Object.entries(this._selectInternal(newWords, practicedWords, false));

        this.addRandomWordsToGameWords(relevantNewWordsArray, split.newWordsAmount, wordsDict, groupId);
        this.addRandomWordsToGameWords(relevantPracticedWordsArray, split.practicedAmount, wordsDict, groupId);

        return wordsDict;

    }

    addRandomWordsToGameWords(relevantWordsArray: [string, GameWordDictDetails][], amountToAdd: number, wordsDict: GameWords, groupId: number){
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