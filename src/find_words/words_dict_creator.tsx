import NewWordsSelector from "./word_selectors/new_words_selector";
import IncorrectWordsSelector from "./word_selectors/incorrect_words_selector";
import PracticeWordsSelector from "./word_selectors/practice_words_selector";
import SmartWordsSelector from "./word_selectors/smart_words_selector";

import { GameSettings } from "../data_objects/contexts/game_settings";
import { Words } from "../data_objects/words/basic_data_objects/words";
import { UserStatistics } from "../data_objects/words/statistics/user_statistics";
import { GameWords } from "../data_objects/words/game_data_objects/game_words";
import { WordStatisticsData } from "../data_objects/words/basic_data_objects/word_statistics_data";
import { WordDetails } from "../data_objects/words/basic_data_objects/word_details";
import { Meaning } from "../data_objects/words/basic_data_objects/meaning";
import { GAMES } from "../data_objects/enums/game_objects";

export default class WordsDictCreator {
    private _settings: GameSettings;
    private _flags_count: number; 
    private _words: GameWords;
    private _game_mode: number;

    private _newWords: Words;
    private _statistics: UserStatistics; 

    constructor(settings: GameSettings, new_words: Words, statistics: UserStatistics, game_mode: number) { 
        this._settings = settings;
        this._flags_count = 0;
        this._updateFlagCount();

        this._words = {};

        this._newWords = new_words;
        this._statistics = statistics;

        this._game_mode = game_mode;
    }

    setSettings(settings: GameSettings): void {
        this._settings = settings;
        this._updateFlagCount();
    }

    _updateFlagCount(){
        this._flags_count = 0;

        this._flags_count += Number(this._settings.shouldIncludeNewWords);
        this._flags_count += Number(this._settings.shouldIncludeIncorrectWords);
        this._flags_count += Number(this._settings.shouldIncludePracticedwords);
        this._flags_count += Number(this._settings.shouldIncludeSmartStudy);
    }
    

    createList(): GameWords {
        try {
            for (const [groupId, levelWordCount] of Object.entries(this._settings.levels)) {
                if (typeof levelWordCount == 'number' && levelWordCount > 0 && levelWordCount <= 100) { 
                    const amountList = this._splitAmountToTypes(levelWordCount); 
                    var newWords: { [word: string]: WordDetails } = {};
                    if (this.checkLevelExistsInNewList(parseInt(groupId))){ // TODO: revert to group id
                        newWords = this._newWords[0];
                    }
                    
                    var practicedWords: { [word: string]: WordStatisticsData } = {};
                    if (this.checkLevelExistsInStatisticsList(parseInt(groupId))){
                        practicedWords = this._statistics.WordsStatistics.Words[0]; // TODO: revert to group id
                    }

                    // TODO: change all "add" methods to handle all levels and not only 0
                    if (this._settings.shouldIncludeNewWords && amountList.length > 0)
                    { 
                        new NewWordsSelector().select(newWords, practicedWords, 0, Math.min(Object.keys(this._newWords[0]).length, amountList[amountList.length - 1]), this._words);
                        amountList.pop();
                    }
                    if (this._settings.shouldIncludeIncorrectWords && amountList.length > 0) 
                    { 
                        new IncorrectWordsSelector().select(newWords, practicedWords, 0, Math.min(Object.keys(this._newWords[0]).length, amountList[amountList.length - 1]), this._words);
                        amountList.pop();
                    }
                    if (this._settings.shouldIncludePracticedwords && amountList.length > 0) 
                    { 
                        new PracticeWordsSelector().select(newWords, practicedWords, 0, Math.min(Object.keys(this._newWords[0]).length, amountList[amountList.length - 1]), this._words);
                        amountList.pop();
                    }
                    if (this._settings.shouldIncludeSmartStudy && amountList.length > 0) 
                    { 
                        new SmartWordsSelector().select(newWords, practicedWords, 0, Math.min(Object.keys(this._newWords[0]).length, amountList[amountList.length - 1]), this._words);
                        amountList.pop();
                    }
                }
            }

            this.enrich();

            return Object.fromEntries(Object.entries(this._words).filter(([key, value]) => Object.keys(value).length !== 0));
            
        } catch (error) {
            console.error(`error: ${error}`);
        }

        return {};
    }

    private _splitAmountToTypes(totalAmount: number): number[] { 
        const baseValue = Math.floor(totalAmount / this._flags_count); 
        const remainder = totalAmount % this._flags_count; 

        const result = Array(this._flags_count).fill(baseValue);
        
        for (let i = 0; i < remainder; i++) {
            result[this._flags_count - i - 1] += 1;
        }
        
        return result;
    }

    checkLevelExistsInNewList(level: number): boolean {
        return true; // TODO: remove
        return level in this._newWords;
    }

    checkLevelExistsInStatisticsList(level: number): boolean {
        return true; // TODO: remove. As for now, if there is no validation over if the level exist or not them it might throw an error 
        return level in this._statistics.WordsStatistics.Words;
    }

    enrich() {
        switch (this._game_mode) {
            case GAMES.KDK.id:
                break;
            case GAMES.MC.id:
                this._enrichMultipleChoices();
                break;
        }
    }

    _enrichMultipleChoices() {
        for (const level of Object.values(this._words)) {
            for (const word_key of Object.keys(level)) {
                let currectWord = level[word_key];
                const currentWordMeaning = this._getMeaningsAsString(currectWord.Meanings);

                let firstRandomMeaning: string = this._findRandomMeaning();

                while (firstRandomMeaning == currentWordMeaning) {
                    firstRandomMeaning = this._findRandomMeaning();
                }

                let secondRandomMeaning: string = this._findRandomMeaning();

                while (secondRandomMeaning == currentWordMeaning || firstRandomMeaning == secondRandomMeaning) {
                    secondRandomMeaning = this._findRandomMeaning();
                }

                let thirdRandomMeaning: string = this._findRandomMeaning();

                while (thirdRandomMeaning == currentWordMeaning || firstRandomMeaning == thirdRandomMeaning || secondRandomMeaning == thirdRandomMeaning) {
                    thirdRandomMeaning = this._findRandomMeaning();
                }

                const randomMeanings = [firstRandomMeaning, secondRandomMeaning, thirdRandomMeaning];

                const randomIndex: number = Math.floor(Math.random() * (randomMeanings.length + 1));
        
                const allMeanings: string[] = [...randomMeanings];
                allMeanings.splice(randomIndex, 0, this._getMeaningsAsString(currectWord.Meanings));

                currectWord.RandomMeanings = allMeanings;
            }
        }
    }

    _findRandomMeaning(): string {
        let randomWordInLevel: WordDetails;

        const newWordsRatio = this._precentageNewWordsToTotal();

        const randomNumberInRatio = Math.floor(Math.random() * 100) + 1;
        if (randomNumberInRatio > newWordsRatio) {
            const levels = Object.keys(this._statistics.WordsStatistics.Words); // all levels
            let randomLevel = this._statistics.WordsStatistics.Words[Math.floor(Math.random() * levels.length)]; // random level from existing levels
            randomWordInLevel = Object.values(randomLevel)[Math.floor(Math.random() * Object.keys(randomLevel).length)].Word; // random word in the random level
        } 
        else {
            const levels = Object.keys(this._newWords); // all levels
            let randomLevel = this._newWords[Math.floor(Math.random() * levels.length)]; // random level from existing levels
            randomWordInLevel = Object.values(randomLevel)[Math.floor(Math.random() * Object.keys(randomLevel).length)]; // random word in the random level
        }

        return this._getMeaningsAsString(randomWordInLevel.Meanings);
    }

    _getMeaningsAsString (meaningsObject: Meaning[]): string {
        return meaningsObject.map(item => item.Meaning).join("\n");
    }

    _precentageNewWordsToTotal (): number {
        let newWordsTotal = this._getAmountOfWords(this._newWords);
        let practiceWordsTotal = this._getAmountOfWords(this._statistics.WordsStatistics.Words);;

        return Math.floor((newWordsTotal / (newWordsTotal + practiceWordsTotal)) * 100);
    }

    _getAmountOfWords (words: Words | { [groupId: number]: { [word: string]: WordStatisticsData; } }): number {
        let total = 0;

        for (const level of Object.values(words)) {
            for (const word of Object.keys(level)) {
                total += 1;
            }
        }

        return total
    }
}