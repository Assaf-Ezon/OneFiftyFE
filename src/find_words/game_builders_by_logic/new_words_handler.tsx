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

        // contains the "used" indexes
        // const takenWordsindexList: number[] = [];

        // loop the amount requested for
        // for (let i = 0; i < Math.min(amount_of_words, wordsArray.length); i++) {
        //     // random index
        //     let randomIndex = Math.floor(Math.random() * wordsArray.length); 
            
        //     // continues to create random indexes if already inside
        //     while (takenWordsindexList.includes(randomIndex)) {
        //         randomIndex = Math.floor(Math.random() * wordsArray.length); 
        //     }
            
        //     // adding the random words to the wordsDict
        //     wordsDict[key][wordsArray[randomIndex][0]] = {
        //         ...wordsArray[randomIndex][1],
        //         Type: 'חדש'
        //     }
            
        //     // adds the index to the "used" indexes
        //     takenWordsindexList.push(randomIndex);
        // }

        // return wordsDict;

        return NewWordsHandler.create_shuffled_dict_for_new_dict(key, wordsArray, amount_of_words, wordsDict, 'חדש');
    }
}