import { NewWords, Words } from './types';

export default class AddNewWords {
    static add(contextDict: NewWords, key: number, amount_of_words: number, wordsDict: Words): Words {
        // creates the level in the wordsDict if doesn't exist
        if (!wordsDict[key]) {
            wordsDict[key] = {};
        }

        // converting to array - so that I can shuffle
        const wordsArray = Object.entries(contextDict[key]);

        // contains the "used" indexes
        const takenWordsindexList: number[] = [];

        // loop the amount requested for
        for (let i = 0; i < amount_of_words; i++) {
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