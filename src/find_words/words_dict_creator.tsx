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
import { GameMode } from "../data_objects/general/game_mode";

import { EnricherByGamemode } from "./game_words_enrichers/enricher_by_gamemode";
import BaseWordsEnricher from "./game_words_enrichers/base_words_enricher";

export default class WordsDictCreator {
    private _settings: GameSettings;
    private _flagsCount: number; 
    private _words: GameWords;
    private _enricher: BaseWordsEnricher;

    private _newWords: Words;
    private _statistics: UserStatistics; 

    constructor(settings: GameSettings, newWords: Words, statistics: UserStatistics, gameMode: GameMode) { 
        this._settings = settings;
        this._flagsCount = 0;
        this._updateFlagCount();

        this._words = {};

        this._newWords = newWords;
        this._statistics = statistics;

        this._enricher = EnricherByGamemode(gameMode);
    }

    setSettings(settings: GameSettings): void {
        this._settings = settings;
        this._updateFlagCount();
    }

    _updateFlagCount(){
        this._flagsCount = 0;

        this._flagsCount += Number(this._settings.shouldIncludeNewWords);
        this._flagsCount += Number(this._settings.shouldIncludeIncorrectWords);
        this._flagsCount += Number(this._settings.shouldIncludePracticedwords);
        this._flagsCount += Number(this._settings.shouldIncludeSmartStudy);
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

            this._enricher.enrich(this._words, this._newWords, this._statistics);

            return Object.fromEntries(Object.entries(this._words).filter(([key, value]) => Object.keys(value).length !== 0));
            
        } catch (error) {
            console.error(`error: ${error}`);
        }

        return {};
    }

    private _splitAmountToTypes(totalAmount: number): number[] { 
        const baseValue = Math.floor(totalAmount / this._flagsCount); 
        const remainder = totalAmount % this._flagsCount; 

        const result = Array(this._flagsCount).fill(baseValue);
        
        for (let i = 0; i < remainder; i++) {
            result[this._flagsCount - i - 1] += 1;
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
}