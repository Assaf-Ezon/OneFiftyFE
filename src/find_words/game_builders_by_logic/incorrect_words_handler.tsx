import { WordStatisticsData } from "../../data_objects/words/basic_data_objects/word_statistics_data";
import { GameWords } from "../../data_objects/words/game_data_objects/game_words";
import { UserStatistics } from "../../data_objects/words/statistics/user_statistics";
import UtilsForGameBuilders from "./utils_for_game_builders";


export default class IncorrectWordsHandler extends UtilsForGameBuilders {
    static add(contextDict: UserStatistics, key: number, amount_of_words: number, wordsDict: GameWords): GameWords {
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
        //         FullWord: wordsArray[randomIndex][1].Word.FullWord,
        //         Meanings: wordsArray[randomIndex][1].Word.Meanings,
        //         Group: wordsArray[randomIndex][1].Word.Group,
        //         Type: 'טעות' 
        //     }
            
        //     // adds the index to the "used" indexes
        //     takenWordsindexList.push(randomIndex);
        // }
        
        // return wordsDict;

        return IncorrectWordsHandler.create_shuffled_dict_for_statistics(key, wordsArray, amount_of_words, wordsDict, 'טעות');
    }
}