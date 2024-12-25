import { Words } from "../../data_objects/words/basic_data_objects/words";
import { FullWordsDictionary } from "../../data_objects/words/dictionary/full_words_dictionary";
import { UserStatistics } from "../../data_objects/words/statistics/user_statistics";

export interface WordsContextConfig {
    hebrewWords: FullWordsDictionary,
    setHebrewWords: (words: FullWordsDictionary) => void;

    englishWords: FullWordsDictionary,
    setEnglishWords: (words: FullWordsDictionary) => void;

    hebrewUserStatistics: UserStatistics,
    setHebrewUserStatistics: (words: UserStatistics) => void;

    englishUserStatistics: UserStatistics,
    setEnglishUserStatistics: (words: UserStatistics) => void;

    hebrewNewWords: Words;
    updateNewHebrewWords: () => void;

    englishNewWords: Words;
    updateNewEnglishWords: () => void;
};