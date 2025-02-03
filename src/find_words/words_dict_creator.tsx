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

export default class WordsDictCreator {
    private _settings: GameSettings;
    private _amountInEachFlag: {[x: string]: number};
    private _words: GameWords;
    private _enricher: BaseWordsEnricher;

    private _newWords: Words;
    private _statistics: UserStatistics; 

    constructor(settings: GameSettings, newWords: Words, statistics: UserStatistics, gameMode: GameMode) { 
        this._settings = settings;

        this._amountInEachFlag = {};

        this._words = {};

        this._newWords = newWords;
        this._statistics = statistics;

        this._enricher = CreateEnricher(gameMode);
    }

    setSettings(settings: GameSettings): void {
        this._settings = settings;
    }
    

    createList(): GameWords {
        try {
            for (const [groupId, levelWordCount] of Object.entries(this._settings.levels)) {
                if (typeof levelWordCount == 'number' && levelWordCount > 0 && levelWordCount <= 100) { 
                    const amountList = this._distribute(parseInt(groupId), levelWordCount);

                    var newWords: { [word: string]: WordDetails } = {};
                    if (this.checkLevelExistsInNewList(parseInt(groupId))){ 
                        newWords = this._newWords[parseInt(groupId)];
                    }
                    
                    var practicedWords: { [word: string]: WordStatisticsData } = {};
                    if (this.checkLevelExistsInStatisticsList(parseInt(groupId))){
                        practicedWords = this._statistics.WordsStatistics.Words[parseInt(groupId)]; 
                    }

                    if (this._settings.shouldIncludeNewWords && amountList.length > 0)
                    { 
                        new NewWordsSelector().select(newWords, practicedWords, parseInt(groupId), amountList[0], this._words);
                        amountList.shift();
                    }
                    if (this._settings.shouldIncludeIncorrectWords && amountList.length > 0) 
                    { 
                        new IncorrectWordsSelector().select(newWords, practicedWords, parseInt(groupId), amountList[0], this._words);
                        amountList.shift();
                    }
                    if (this._settings.shouldIncludePracticedwords && amountList.length > 0) 
                    { 
                        new PracticeWordsSelector().select(newWords, practicedWords, parseInt(groupId), amountList[0], this._words);
                        amountList.shift();
                    }
                    if (this._settings.shouldIncludeSmartStudy && amountList.length > 0) 
                    { 
                        new SmartWordsSelector().select(newWords, practicedWords, parseInt(groupId), amountList[0], this._words);
                        amountList.shift();
                    }
                }
            }

            this._enricher.enrich(this._words, this._newWords, this._statistics.WordsStatistics.Words);

            return Object.fromEntries(Object.entries(this._words).filter(([key, value]) => Object.keys(value).length !== 0));
            
        } catch (error) {
            console.error(`error: ${error}`);
        }

        return {};
    }

    _distribute(groupId: number, totalAmount: number): number[] {
        // updates how many words you can take in the current level from each words group
        this._updateAmountOfEachGroupPerLevel(groupId);  

        const keys: string[] = Object.keys(this._amountInEachFlag); // list of the keys (1-3 max)
        const result: {[key: string]: number} = {}; // creates an empty dict for the distribution
        const idealSplit = totalAmount / keys.length; // ideal split (1/3 max)
        
        let remainingAmount = totalAmount;
    
        // try to take the ideal amount from each group
        for (const key of keys) {
            const take = Math.min(idealSplit, this._amountInEachFlag[key]); // takes as much as you can - the ideal split/as much as the group can give
            result[key] = take; // sets the group with the current amount 
            remainingAmount -= take; // updates the remaining amount
        }
    
        // redistribute whats left
        for (const key of keys) {
            // if the distribution is successful
            if (remainingAmount <= 0) {
                break; 
            }
            const extraWordsInCurrentGroup = this._amountInEachFlag[key] - result[key]; // remaining capacity for this key (group)
            const extraWillTakeFromCurrentGroup = Math.min(remainingAmount, extraWordsInCurrentGroup); // takes the remainig distribution left/as much as the group is left to give
            result[key] += extraWillTakeFromCurrentGroup; // updates the amount in the current group
            remainingAmount -= extraWillTakeFromCurrentGroup; // updates the remaining amount
        }

        return Object.values(result);
    }

    _updateAmountOfEachGroupPerLevel(groupId: number){
        var count = 1;

        if (this._settings.shouldIncludeNewWords) {
            const newSelector = new NewWordsSelector();
            newSelector.selectNewInternal(this._newWords[groupId]);
            this._amountInEachFlag[count] = newSelector.countWordsMatchingToFilter;
            count++;
        }
        if (this._settings.shouldIncludeIncorrectWords) {
            const incorrectSelector = new IncorrectWordsSelector();
            incorrectSelector.selectPracticedInternal(this._statistics.WordsStatistics.Words[groupId]);
            this._amountInEachFlag[count] = incorrectSelector.countWordsMatchingToFilter;
            count++;
        }
        if (this._settings.shouldIncludePracticedwords) {
            const practicedSelector = new PracticeWordsSelector();
            practicedSelector.selectPracticedInternal(this._statistics.WordsStatistics.Words[groupId]);
            this._amountInEachFlag[count] = practicedSelector.countWordsMatchingToFilter;
            count++;
        }
        if (this._settings.shouldIncludeSmartStudy) {
            const newSelector = new NewWordsSelector();
            newSelector.selectNewInternal(this._newWords[groupId]);

            const smartSelector = new SmartWordsSelector();
            smartSelector.selectPracticedInternal(this._statistics.WordsStatistics.Words[groupId]);

            this._amountInEachFlag[count] = newSelector.countWordsMatchingToFilter + smartSelector.countWordsMatchingToFilter;
            count++;
        }
    }

    checkLevelExistsInNewList(level: number): boolean {
        return level in this._newWords;
    }

    checkLevelExistsInStatisticsList(level: number): boolean {
        return level in this._statistics.WordsStatistics.Words;
    }
}