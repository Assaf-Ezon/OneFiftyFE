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
import { GameMode } from "../data_objects/general/game_mode";

import { CreateEnricher } from "./game_words_enrichers/create_enricher";
import BaseWordsEnricher from "./game_words_enrichers/base_words_enricher";
import { WordGroups } from "../data_objects/enums/word_groups";

export default class WordsDictCreator {
    private _settings: GameSettings;
    private _amountInEachFlag: {[x: string]: number};
    private _words: GameWords;
    private _enricher: BaseWordsEnricher;

    private _newWords: Words;
    private _statistics: UserStatistics; 

    private _wordShortageHandler: { [groupId: string]: string[] }; 

    constructor(settings: GameSettings, newWords: Words, statistics: UserStatistics, gameMode: GameMode) { 
        this._settings = settings;

        this._amountInEachFlag = {};

        this._words = {};

        this._newWords = newWords;
        this._statistics = statistics;

        this._enricher = CreateEnricher(gameMode);

        this._wordShortageHandler = {};
    }

    setSettings(settings: GameSettings): void {
        this._settings = settings;
    }
    

    createList(): [GameWords, { [groupId: string]: string[] }] {
        try {
            for (const [groupId, levelWordCount] of Object.entries(this._settings.levels)) {
                if (typeof levelWordCount == 'number' && levelWordCount > 0 && levelWordCount <= 100) { 
                    const amountList = this._distribute(parseInt(groupId), levelWordCount); // split between word groups

                    // sets newWords dict for the current level
                    var newWords: { [word: string]: WordDetails } = {};
                    if (this.checkLevelExistsInNewList(parseInt(groupId))){ 
                        newWords = this._newWords[parseInt(groupId)];
                    }
                    
                    // sets practicedWords dict for the current level
                    var practicedWords: { [word: string]: WordStatisticsData } = {};
                    if (this.checkLevelExistsInStatisticsList(parseInt(groupId))){
                        practicedWords = this._statistics.WordsStatistics.Words[parseInt(groupId)]; 
                    }

                    // selects from each relevant word groups
                    if (this._settings.shouldIncludeNewWords && WordGroups.NEW in amountList)
                    { 
                        new NewWordsSelector().select(newWords, practicedWords, parseInt(groupId), amountList[WordGroups.NEW], this._words);
                    }
                    if (this._settings.shouldIncludeIncorrectWords && WordGroups.INCORRECT in amountList) 
                    { 
                        new IncorrectWordsSelector().select(newWords, practicedWords, parseInt(groupId), amountList[WordGroups.INCORRECT], this._words);
                    }
                    if (this._settings.shouldIncludePracticedwords && WordGroups.PRACTICED in amountList) 
                    { 
                        new PracticeWordsSelector().select(newWords, practicedWords, parseInt(groupId), amountList[WordGroups.PRACTICED], this._words);
                    }
                    if (this._settings.shouldIncludeSmartStudy && WordGroups.SMART in amountList) 
                    { 
                        new SmartWordsSelector().select(newWords, practicedWords, parseInt(groupId), amountList[WordGroups.SMART], this._words);
                    }
                }
            }

            this._enricher.enrich(this._words, this._newWords, this._statistics.WordsStatistics.Words);

            return [Object.fromEntries(Object.entries(this._words).filter(([key, value]) => Object.keys(value).length !== 0)), this._wordShortageHandler];
            
        } catch (error) {
            console.error(`error: ${error}`);
        }

        return [{}, {}];
    }

    _distribute(groupId: number, totalAmount: number): { [wordGroup: string]: number; } {
        // updates how many words you can take in the current level from each words group
        this._updateAmountOfEachGroupPerLevel(groupId);  

        const wordGroups: string[] = Object.keys(this._amountInEachFlag); // list of the word groups (1-3 max)
        const result: {[key: string]: number} = {}; // creates an empty dict for the distribution
        const baseAmount = Math.floor(totalAmount / wordGroups.length); // base split
        const remainder = totalAmount % wordGroups.length; // remaining 

        const idealSplit: {[wordsGroup: string]: number } = {}; // ideal split between all word groups
        // adds the remainder
        wordGroups.forEach((group, index) => {
            idealSplit[group] = baseAmount + (index < remainder ? 1 : 0);
        });

        let remainingAmount = totalAmount;
    
        // try to take the ideal amount from each group
        for (const wordsGroup of wordGroups) {
            // checks if a group of words don't have its relative amount
            if (idealSplit[wordsGroup] > this._amountInEachFlag[wordsGroup]) {
                // creates the list in word shortage handler if not exist
                if (!this._wordShortageHandler[groupId]) {
                    this._wordShortageHandler[groupId] = [];
                }
                
                // adds the words group to the word shortage handler
                this._wordShortageHandler[groupId].push(wordsGroup);
            }

            const take = Math.min(idealSplit[wordsGroup], this._amountInEachFlag[wordsGroup]); // takes as much as you can - the ideal split/as much as the group can give
            result[wordsGroup] = take; // sets the group with the current amount 
            remainingAmount -= take; // updates the remaining amount
        }

        // redistribute whats left
        for (const wordsGroup of wordGroups) {
            // if the distribution is successful
            if (remainingAmount <= 0) {
                break; 
            }
            const extraWordsInCurrentGroup = this._amountInEachFlag[wordsGroup] - result[wordsGroup]; // remaining capacity for this key (group)
            const extraWillTakeFromCurrentGroup = Math.min(remainingAmount, extraWordsInCurrentGroup); // takes the remainig distribution left/as much as the group is left to give
            result[wordsGroup] += extraWillTakeFromCurrentGroup; // updates the amount in the current group
            remainingAmount -= extraWillTakeFromCurrentGroup; // updates the remaining amount
        }

        return result;
    }

    _updateAmountOfEachGroupPerLevel(groupId: number){
        if (this._settings.shouldIncludeNewWords) {
            this._amountInEachFlag[WordGroups.NEW] = new NewWordsSelector().getAmounthOfReleveantWords(
                this._newWords[groupId], 
                this._statistics.WordsStatistics.Words[groupId], 
                true
            );
        }
        if (this._settings.shouldIncludeIncorrectWords) {
            this._amountInEachFlag[WordGroups.INCORRECT] = new IncorrectWordsSelector().getAmounthOfReleveantWords(
                this._newWords[groupId], 
                this._statistics.WordsStatistics.Words[groupId], 
                false
            );
        }
        if (this._settings.shouldIncludePracticedwords) {
            this._amountInEachFlag[WordGroups.PRACTICED] = new PracticeWordsSelector().getAmounthOfReleveantWords(
                this._newWords[groupId], 
                this._statistics.WordsStatistics.Words[groupId], 
                false
            );
        }
        if (this._settings.shouldIncludeSmartStudy) {
            this._amountInEachFlag[WordGroups.SMART] = new SmartWordsSelector().getAmounthOfReleveantWords(
                this._newWords[groupId], 
                this._statistics.WordsStatistics.Words[groupId], 
                false
            ) + 
            new NewWordsSelector().getAmounthOfReleveantWords(
                this._newWords[groupId], 
                this._statistics.WordsStatistics.Words[groupId], 
                true
            );
        }
    }

    checkLevelExistsInNewList(level: number): boolean {
        return level in this._newWords;
    }

    checkLevelExistsInStatisticsList(level: number): boolean {
        return level in this._statistics.WordsStatistics.Words;
    }
}