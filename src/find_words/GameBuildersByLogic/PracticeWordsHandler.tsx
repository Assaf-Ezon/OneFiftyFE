import { WordStatisticsData } from "../../Data objects/Words/BasicDataObjects/WordStatisticsData";
import { GameWords } from "../../Data objects/Words/GameDataObjects/GameWords";
import { UserStatistics } from "../../Data objects/Words/Statistics/UserStatistics";

export default class PracticeWordsHandler {
    static add(contextDict: UserStatistics, key: number, amount_of_words: number, wordsDict: GameWords): GameWords {
        // creates the level in the wordsDict if doesn't exist
        if (!wordsDict[key]) {
            wordsDict[key] = {};
        }

        // dict of the words that are considered "practice words"
        const words: { [word: string]: WordStatisticsData } = {};

        // filters only the words that are considered "pracrice"
        const listOfWords = contextDict.WordsStatistics.Words[key];
        for (const word in listOfWords) {
            if (listOfWords[word].Successes !== 0) {
                words[word] = listOfWords[word]
            }
        }

        // converting to array - so that I can shuffle
        const wordsArray = Object.entries(words);

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
                Type: 'תרגול'  
            }
            
            // adds the index to the "used" indexes
            takenWordsindexList.push(randomIndex);
        }

        return wordsDict;
    }
}