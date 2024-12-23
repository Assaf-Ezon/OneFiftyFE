import { NewWords, Words } from './types';

export default class AddNewWords {
    static add(contextDict: NewWords, key: number, amount_of_words: number, wordsDict: Words): Words {
        // creates the level in the wordsDict if doesn't exist
        if (!wordsDict[key]) {
            wordsDict[key] = {};
        }

        // converting to array - so that I can shuffle
        const wordsArray = Object.entries(contextDict[key]);
        
        // TODO: bad logic... very compute wasteful... shuffle random integer in the range {0 .. (wordsArray.Length-1)} and select unselected words until your "budget" is full.
        // TODO: In my opinion the "shuffle and select" code section should be a function in a shared parent for these classes rather than repeated.

        // shuffling the array of the potential "new" words
        for (let i = wordsArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1)); 
            [wordsArray[i], wordsArray[j]] = [wordsArray[j], wordsArray[i]]; 
        }

        // takes only the amount of words I need from the potential words
        const selectedWords = wordsArray.slice(0, amount_of_words);

        // adding them to the wordsDict
        selectedWords.forEach(([word, word_info]) => {
            wordsDict[key][word] = {
                ...word_info, 
                Type: 'חדש'   
            };
        });

        return wordsDict;
    }
}