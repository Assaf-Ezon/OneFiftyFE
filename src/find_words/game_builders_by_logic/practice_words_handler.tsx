import { WordStatisticsData } from "../../data_objects/words/basic_data_objects/word_statistics_data";
import { GameWords } from "../../data_objects/words/game_data_objects/game_words";
import { UserStatistics } from "../../data_objects/words/statistics/user_statistics";
import UtilsForGameBuilders from "./utils_for_game_builders";

export default class PracticeWordsHandler extends UtilsForGameBuilders {
    static add(contextDict: UserStatistics, key: number, amount_of_words: number, wordsDict: GameWords): GameWords {
        // creates the level in the wordsDict if doesn't exist
        if (!wordsDict[key]) {
            wordsDict[key] = {};
        }

        // dict of the words that are considered "practice words"
        const wordsMatchingToFilter: { [word: string]: WordStatisticsData } = {};

        // filters only the words that are considered "pracrice"
        const listOfWords = contextDict.WordsStatistics.Words[key];
        for (const word in listOfWords) {
            if (listOfWords[word].Successes !== 0) {
                wordsMatchingToFilter[word] = listOfWords[word]
            }
        }

        // converting to array - so that I can shuffle
        const wordsArray = Object.entries(wordsMatchingToFilter);

        return PracticeWordsHandler.createShuffledDictForStatistics(key, wordsArray, amount_of_words, wordsDict, 'תרגול');
    }
}