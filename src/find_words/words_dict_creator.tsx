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

        this._enricher = CreateEnricher(gameMode);
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
                    if (this.checkLevelExistsInNewList(parseInt(groupId))){ 
                        newWords = this._newWords[parseInt(groupId)];
                    }
                    
                    var practicedWords: { [word: string]: WordStatisticsData } = {};
                    if (this.checkLevelExistsInStatisticsList(parseInt(groupId))){
                        practicedWords = this._statistics.WordsStatistics.Words[parseInt(groupId)]; 
                    }

                    if (this._settings.shouldIncludeNewWords && amountList.length > 0)
                    { 
                        new NewWordsSelector().select(newWords, practicedWords, parseInt(groupId), Math.min(Object.keys(this._newWords).length, amountList[amountList.length - 1]), this._words);
                        amountList.pop();
                    }
                    if (this._settings.shouldIncludeIncorrectWords && amountList.length > 0) 
                    { 
                        new IncorrectWordsSelector().select(newWords, practicedWords, parseInt(groupId), Math.min(Object.keys(this._newWords).length, amountList[amountList.length - 1]), this._words);
                        amountList.pop();
                    }
                    if (this._settings.shouldIncludePracticedwords && amountList.length > 0) 
                    { 
                        new PracticeWordsSelector().select(newWords, practicedWords, parseInt(groupId), Math.min(Object.keys(this._newWords).length, amountList[amountList.length - 1]), this._words);
                        amountList.pop();
                    }
                    if (this._settings.shouldIncludeSmartStudy && amountList.length > 0) 
                    { 
                        new SmartWordsSelector().select(newWords, practicedWords, parseInt(groupId), Math.min(Object.keys(this._newWords).length, amountList[amountList.length - 1]), this._words);
                        amountList.pop();
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
        return level in this._newWords;
    }

    checkLevelExistsInStatisticsList(level: number): boolean {
        return level in this._statistics.WordsStatistics.Words;
    }
}