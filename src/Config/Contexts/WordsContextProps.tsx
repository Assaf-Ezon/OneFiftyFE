import { FullWordsDictionary } from "../../Dataobjects/Words/DIctionary/FullWordsDictionary";
import { NewWords } from "../../Dataobjects/Words/NewWordsDict/NewWords";
import { UserStatistics } from "../../Dataobjects/Words/Statistics/UserStatistics";

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