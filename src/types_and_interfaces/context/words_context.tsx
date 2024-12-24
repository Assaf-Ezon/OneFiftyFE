import { FullWordsDictionary, UserStatistics, NewWords } from '../words_types';

export interface WordsContextProps {
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