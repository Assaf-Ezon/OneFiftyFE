import { UserStatistics, Words, WordStatisticsData } from './types';

export default class AddWrongWords {
    static add(contextDict: UserStatistics, key: number, amount_of_words: number, wordsDict: Words): Words {
        // creates the level in the wordsDict if doesn't exist
        if (!wordsDict[key]) {
            wordsDict[key] = {};
        }

        // dict of the words that are considered "wrong words"
        const words: { [word: string]: WordStatisticsData } = {};

        // filters only the words that are considered "wrong"
        const listOfWords = contextDict.WordsStatistics.Words[key];
        for (const word in listOfWords) {
            if (listOfWords[word].Successes == 0 && listOfWords[word].Failures !== 0) {
                words[word] = listOfWords[word]
            }
        }

        // converting to array - so that I can shuffle
        const wordsArray = Object.entries(words);

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
                FullWord: wordsArray[randomIndex][1].Word.FullWord,
                Meanings: wordsArray[randomIndex][1].Word.Meanings,
                Group: wordsArray[randomIndex][1].Word.Group,
                Type: 'טעות' 
            }
            
            // adds the index to the "used" indexes
            takenWordsindexList.push(randomIndex);
        }


        // shuffling the array of the potential "wrong" words
        // for (let i = wordsArray.length - 1; i > 0; i--) {
        //     const j = Math.floor(Math.random() * (i + 1)); 
        //     [wordsArray[i], wordsArray[j]] = [wordsArray[j], wordsArray[i]]; 
        // }

        // takes only the amount of words I need from the potential words
        // const selectedWords = wordsArray.slice(0, amount_of_words);

        // adding them to the wordsDict
        // selectedWords.forEach(([word, word_info]) => {
        //     wordsDict[key][word] = {
        //         FullWord: word_info.Word.FullWord,
        //         Meanings: word_info.Word.Meanings,
        //         Group: word_info.Word.Group,
        //         Type: 'טעות'   
        //     };
        // });

        return wordsDict;
    }
}