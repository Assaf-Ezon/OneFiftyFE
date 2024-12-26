import { WordDetails } from "../../data_objects/words/basic_data_objects/word_details";
import { WordStatisticsData } from "../../data_objects/words/basic_data_objects/word_statistics_data";
import { GameWords } from "../../data_objects/words/game_data_objects/game_words";

export default class UtilsForGameBuilders {
    // wordsArray - list of valid new words/statistics words
    static createShuffledDictForNewDict (key: number, wordsArray: [string, WordDetails][], amount_of_words: number, wordsDict: GameWords, word_type: string): GameWords {
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
                Type: word_type
            }

            // adds the index to the "used" indexes
            takenWordsindexList.push(randomIndex);
        }

        return wordsDict;
    }

    static createShuffledDictForStatistics (key: number, wordsArray: [string, WordStatisticsData][], amount_of_words: number, wordsDict: GameWords, word_type: string): GameWords {
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
                FullWord: wordsArray[randomIndex][1].Word.FullWord,
                Meanings: wordsArray[randomIndex][1].Word.Meanings,
                Group: wordsArray[randomIndex][1].Word.Group,
                Type: word_type
            }

            // adds the index to the "used" indexes
            takenWordsindexList.push(randomIndex);
        }

        return wordsDict;
    }
}