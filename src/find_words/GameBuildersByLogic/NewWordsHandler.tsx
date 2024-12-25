import { GameWords } from "../../Dataobjects/Words/GameDataObjects/GameWords";
import { NewWords } from "../../Dataobjects/Words/NewWordsDict/NewWords";

export default class NewWordsHandler {
    static add(contextDict: NewWords, key: number, amount_of_words: number, wordsDict: GameWords): GameWords {
        // creates the level in the wordsDict if doesn't exist
        if (!wordsDict[key]) {
            wordsDict[key] = {};
        }

        // converting to array - so that I can shuffle
        const wordsArray = Object.entries(contextDict[key]);

        // contains the "used" indexes
        const takenWordsindexList: number[] = [];

        // loop the amount requested for
        for (let i = 0; i < Math.min(amount_of_words, wordsArray.length); i++) {
            // random index
            let randomIndex = Math.floor(Math.random() * wordsArray.length); 
            
            // continues to create random indexes if already inside
            while (takenWordsindexList.includes(randomIndex)) {
                randomIndex = Math.floor(Math.random() * wordsArray.length); 
            }
            
            // adding the random words to the wordsDict
            wordsDict[key][wordsArray[randomIndex][0]] = {
                ...wordsArray[randomIndex][1],
                Type: 'חדש'
            }
            
            // adds the index to the "used" indexes
            takenWordsindexList.push(randomIndex);
        }

        // TODO: In my opinion the "shuffle and select" code section should be a function in a shared parent for these classes rather than repeated.

        return wordsDict;
    }
}