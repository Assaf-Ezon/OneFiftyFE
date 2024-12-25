import NewWordsHandler from "./game_builders_by_logic/new_words_handler";
import IncorrectWordsHandler from "./game_builders_by_logic/incorrect_words_handler";
import PracticeWordsHandler from "./game_builders_by_logic/practice_words_handler";
import SmartWordsHandler from "./game_builders_by_logic/smart_words_handler";

import { Settings } from "../data_objects/contexts/game_settings";
import { NewWords } from "../data_objects/Words/new_words_dict/new_words";
import { UserStatistics } from "../data_objects/Words/statistics/user_statistics";
import { GameWords } from "../data_objects/Words/game_data_objects/game_words";

export default class WordsDictCreator {
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
                    // TODO: change all "add" methods to handle all levels and not only 0
                    if (this._settings.shouldIncludeNewWords && 
                        amountList.length && 
                        this.checkLevelExistsInNewList(parseInt(level_key))) { 
                        NewWordsHandler.add(this._new_words, 0, Math.min(Object.keys(this._new_words[0]).length, amountList[amountList.length - 1]), this._words);
                        amountList.pop();
                    }
                    if (this._settings.shouldIncludeIncorrectWords && 
                        amountList.length && 
                        this.checkLevelExistsInStatisticsList(parseInt(level_key))) { 
                        IncorrectWordsHandler.add(this._statistics, 0, Math.min(Object.keys(this._statistics.WordsStatistics.Words[0]).length, amountList[amountList.length - 1]), this._words);
                        amountList.pop();
                    }
                    if (this._settings.shouldIncludePracticeWords && 
                        amountList.length && 
                        this.checkLevelExistsInStatisticsList(parseInt(level_key))) { 
                        PracticeWordsHandler.add(this._statistics, 0, Math.min(Object.keys(this._statistics.WordsStatistics.Words[0]).length, amountList[amountList.length - 1]), this._words);
                        amountList.pop();
                    }
                    if (this._settings.shouldIncludeSmartStudy && 
                        amountList.length && 
                        this.checkLevelExistsInNewList(parseInt(level_key)) && 
                        this.checkLevelExistsInStatisticsList(parseInt(level_key))) { 
                        SmartWordsHandler.add(this._new_words, this._statistics, 0, amountList[amountList.length - 1], this._words);
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
        return true; // TODO: remove
        return level in this._new_words;
    }

    checkLevelExistsInStatisticsList(level: number): boolean {
        return true; // TODO: remove. As for now, if there is no validation over if the level exist or not them it might throw an error 
        return level in this._statistics.WordsStatistics.Words;
    }
}