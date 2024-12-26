import { Words } from "../../data_objects/words/basic_data_objects/words";
import { GameWords } from "../../data_objects/words/game_data_objects/game_words";
import UtilsForGameBuilders from "./utils_for_game_builders";

export default class NewWordsHandler extends UtilsForGameBuilders {
    static add(contextDict: Words, key: number, amount_of_words: number, wordsDict: GameWords): GameWords {
        // creates the level in the wordsDict if doesn't exist
        if (!wordsDict[key]) {
            wordsDict[key] = {};
        }

        // converting to array - so that I can shuffle
        const wordsArray = Object.entries(contextDict[key]);

        return NewWordsHandler.createShuffledDictForNewDict(key, wordsArray, amount_of_words, wordsDict, 'חדש');
    }
}