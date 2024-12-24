import AddWordsClassesHandler from "./add_words_by_flags/classes_handler";
import { GameWords, NewWords, UserStatistics } from '../types_and_interfaces/words_types';
import { Settings } from "../types_and_interfaces/context/game_settings_context";

export default class CreateWordList {
    private _settings: Settings;
    private _flags_count: number; 
    private _words: GameWords;

    private _new_words: NewWords;
    private _statistics: UserStatistics; 

    constructor(settings: Settings, new_words: NewWords, statistics: UserStatistics, flags_count: number) { 
        this._settings = settings;
        this._flags_count = flags_count;

        this._words = {};

        this._new_words = new_words;
        this._statistics = statistics;
    }

    setSettings(settings: Settings): void {
        this._settings = settings;
    }

    createList(): GameWords {
        try {
            for (const [level_key, level_word_count] of Object.entries(this._settings.levels)) {
                if (typeof level_word_count == 'number' && level_word_count > 0 && level_word_count <= 100) { 
                    const amountList = this._divideNumber(level_word_count); 

                    if (this._settings.shouldIncludeNewWords && 
                        amountList.length && 
                        this.checkLevelExistsInNewList(parseInt(level_key))) { 
                            AddWordsClassesHandler.NewWords.add(this._new_words, 0, Math.min(Object.keys(this._new_words[0]).length, amountList[amountList.length - 1]), this._words);
                        // AddWordsClassesHandler.NewWords.add(this._new_words, parseInt(level_key), Math.min(Object.keys(this._new_words[parseInt(level_key)]).length, amountList[amountList.length - 1]), this._words);
                        amountList.pop();
                    }
                    if (this._settings.shouldIncludeIncorrectWords && 
                        amountList.length && 
                        this.checkLevelExistsInStatisticsList(parseInt(level_key))) { 
                            AddWordsClassesHandler.WrongWords.add(this._statistics, 0, Math.min(Object.keys(this._statistics.WordsStatistics.Words[0]).length, amountList[amountList.length - 1]), this._words);
                        // AddWordsClassesHandler.WrongWords.add(this._statistics, parseInt(level_key), Math.min(Object.keys(this._statistics.WordsStatistics.Words[parseInt(level_key)]).length, amountList[amountList.length - 1]), this._words);
                        amountList.pop();
                    }
                    if (this._settings.shouldIncludePracticeWords && 
                        amountList.length && 
                        this.checkLevelExistsInStatisticsList(parseInt(level_key))) { 
                            AddWordsClassesHandler.PracticeWords.add(this._statistics, 0, Math.min(Object.keys(this._statistics.WordsStatistics.Words[0]).length, amountList[amountList.length - 1]), this._words);
                        // AddWordsClassesHandler.PracticeWords.add(this._statistics, parseInt(level_key), Math.min(Object.keys(this._statistics.WordsStatistics.Words[parseInt(level_key)]).length, amountList[amountList.length - 1]), this._words);
                        amountList.pop();
                    }
                    if (this._settings.shouldIncludeSmartStudy && 
                        amountList.length && 
                        this.checkLevelExistsInNewList(parseInt(level_key)) && 
                        this.checkLevelExistsInStatisticsList(parseInt(level_key))) { 
                            AddWordsClassesHandler.SmartWords.add(this._new_words, this._statistics, 0, amountList[amountList.length - 1], this._words);
                        // AddWordsClassesHandler.SmartWords.add(parseInt(level_key), Math.min(Object.keys(this._statistics.WordsStatistics.Words[parseInt(level_key)]).length, amountList[amountList.length - 1]), this._words);
                        amountList.pop();
                    }
                }
            }

            return this._words;

        } catch (error) {
            console.error(`error: ${error}`);
        }

        return {};
    }

    private _divideNumber(word_count: number): number[] { 
        const baseValue = Math.floor(word_count / this._flags_count); 
        const remainder = word_count % this._flags_count; 

        const result = Array(this._flags_count).fill(baseValue);
        
        for (let i = 0; i < remainder; i++) {
            result[this._flags_count - i - 1] += 1;
        }
        
        return result;
    }

    checkLevelExistsInNewList(level: number): boolean {
        return true; // to be removed
        return level in this._new_words;
    }

    checkLevelExistsInStatisticsList(level: number): boolean {
        return true; // to be removed
        return level in this._statistics.WordsStatistics.Words;
    }
}