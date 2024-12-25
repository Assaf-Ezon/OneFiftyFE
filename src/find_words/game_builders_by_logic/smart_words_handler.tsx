import { WordStatisticsData } from '../../data_objects/words/basic_data_objects/word_statistics_data';
import { Words } from '../../data_objects/words/basic_data_objects/words';
import { GameWords } from '../../data_objects/words/game_data_objects/game_words';
import { UserStatistics } from '../../data_objects/words/statistics/user_statistics';

import NewWordsHandler from './new_words_handler';

export default class SmartWordsHandler {
    static add(new_words: Words, statistics: UserStatistics, key: number, amount_of_words: number, wordsDict: GameWords): GameWords {
        // creates the level in the wordsDict if doesn't exist
        if (!wordsDict[key]) {
            wordsDict[key] = {};
        }

        // dict of the words that are considered "smart practice words"
        const words: { [word: string]: WordStatisticsData } = {};

        // the part of the statistics dict that you need to search for "smart practice words"
        const listOfWords = statistics.WordsStatistics.Words[key]; 
        
        // filters only the words that are considered "smart pracrice"
        for (const word in listOfWords) {
            // https://docs.google.com/document/d/1bqHCz86ZslXG_MxHGOBIxr1OJxB6c5YJC2EdA8N_D9M/edit?tab=t.0
            // in page 3, under "filters by models"
            if ((listOfWords[word].ConsecutiveSuccesses == 0 && 1 <= SmartWordsHandler.deltaDaysFromToday(listOfWords[word].LastSeen))
                 || 2 ** (listOfWords[word].ConsecutiveSuccesses - 1) <= SmartWordsHandler.deltaDaysFromToday(listOfWords[word].LastSeen)) {
                words[word] = listOfWords[word]
            }
        }

        // splits the amount of words asked for to "new" words and "smart practice" words
        const amounts = SmartWordsHandler.splitNumberBetweenLists(amount_of_words, key, new_words, words);

        // adding the new words part
        NewWordsHandler.add(new_words, key, amounts.newWordsAmount, wordsDict);

        // converting to array - so that I can shuffle
        const wordsArray = Object.entries(words);


        // contains the "used" indexes
        const takenWordsindexList: number[] = [];

        // loop the amount requested for
        for (let i = 0; i < Math.min(wordsArray.length, amounts.statisticsAmount); i++) {
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
                Type: 'תרגול (חכם)'
            }
            
            // adds the index to the "used" indexes
            takenWordsindexList.push(randomIndex);
        }

        return wordsDict;
    }

    static deltaDaysFromToday(date: string) {
        const givenDate = new Date(date);
        const today = new Date();

        // Strip time portions for a calendar-day comparison
        const givenDateMidnight = new Date(givenDate.getFullYear(), givenDate.getMonth(), givenDate.getDate());
        const todayMidnight = new Date(today.getFullYear(), today.getMonth(), today.getDate());

        // Difference in full days
        let deltaInDays = Math.floor((todayMidnight.getTime() - givenDateMidnight.getTime()) / (1000 * 60 * 60 * 24));

        // Only adjust for the current day if today is the same day or the following day
        if (
            deltaInDays === 0 || // Same day
            (deltaInDays === 1 && ( // Following day
                today.getHours() > givenDate.getHours() || 
                (today.getHours() === givenDate.getHours() && today.getMinutes() >= givenDate.getMinutes())
            ))
        ) {
            deltaInDays += 1;
        }

        return deltaInDays;
    }

    static splitNumberBetweenLists(amount: number, key: number, new_words: Words, statistics: { [word: string]: WordStatisticsData }): { newWordsAmount: number; statisticsAmount: number } {
        // gets the length of newWordsDict and statisticsDict
        const newWordsLength = Object.keys(new_words[key]).length;
        const statisticsLength = Object.keys(statistics).length;

        // the sum of the words both dicts can "give"
        const totalCapacity = newWordsLength + statisticsLength;
      
        // If the total capacity is less than the number, use all capacity
        if (totalCapacity <= amount) {
          return { newWordsAmount: newWordsLength, statisticsAmount: statisticsLength };
        }
      
        // Ideal split: 50/50
        const idealSplit = Math.floor(amount / 2);
      
        // how much newWordsDict and statisticsDict can give - either half or less (as much as it can)
        let newWordsAmount = Math.min(idealSplit, newWordsLength);
        let statisticsAmount = Math.min(idealSplit, statisticsLength);
      
        // Adjust for leftover if one list can't fully handle its portion
        const remaining = amount - (newWordsAmount + statisticsAmount);
        
        // checks if there are remaining words to add (if newWords or statistics was under the idealSplit)
        if (remaining > 0) {
            // case if the newWords has more words to "give" from it
            if (newWordsLength > newWordsAmount) {
                // adds to newWordsAmount how much remains to add/the amount that remains of the newWordsDict 
                const extraForNewWords = Math.min(remaining, newWordsLength - newWordsAmount);
                newWordsAmount += extraForNewWords;
            }
        
            // updates how much left to fill after the first segment of the if statement
            const stillRemaining = amount - (newWordsAmount + statisticsAmount);
        
            // case if the statistics has more words to "give" from it
            if (stillRemaining > 0 && statisticsLength > statisticsAmount) {
                // adds to statisticsAmount how much remains to add/the amount that remains of the statisticsDict 
                const extraForStatistics = Math.min(stillRemaining, statisticsLength - statisticsAmount);
                statisticsAmount += extraForStatistics;
            }
        }
        
        return { newWordsAmount, statisticsAmount };
    }
}