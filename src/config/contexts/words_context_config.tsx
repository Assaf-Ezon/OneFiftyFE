import { FullWordsDictionary } from "../../data_objects/Words/dIctionary/full_words_dictionary";
import { NewWords } from "../../data_objects/Words/new_words_dict/new_words";
import { UserStatistics } from "../../data_objects/Words/statistics/user_statistics";

export interface WordsContextConfig {
    hebrewWords: FullWordsDictionary,
    setHebrewWords: (words: FullWordsDictionary) => void;

    englishWords: FullWordsDictionary,
    setEnglishWords: (words: FullWordsDictionary) => void;

    hebrewUserStatistics: UserStatistics,
    setHebrewUserStatistics: (words: UserStatistics) => void;

    englishUserStatistics: UserStatistics,
    setEnglishUserStatistics: (words: UserStatistics) => void;

    hebrewNewWords: NewWords;
    updateNewHebrewWords: () => void;

    englishNewWords: NewWords;
    updateNewEnglishWords: () => void;
};