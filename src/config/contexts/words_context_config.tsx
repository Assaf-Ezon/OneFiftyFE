import { Words } from "../../data_objects/words/basic_data_objects/words";
import { WordsDictionary } from "../../data_objects/words/dIctionary/words_dictionary";
import { UserStatistics } from "../../data_objects/words/statistics/user_statistics";

export interface WordsContextConfig {
    hebrewWords: WordsDictionary,
    setHebrewWords: (words: WordsDictionary) => void;

    englishWords: WordsDictionary,
    setEnglishWords: (words: WordsDictionary) => void;

    hebrewUserStatistics: UserStatistics,
    setHebrewUserStatistics: (words: UserStatistics) => void;

    englishUserStatistics: UserStatistics,
    setEnglishUserStatistics: (words: UserStatistics) => void;

    hebrewNewWords: Words;
    updateNewHebrewWords: () => void;

    englishNewWords: Words;
    updateNewEnglishWords: () => void;
};