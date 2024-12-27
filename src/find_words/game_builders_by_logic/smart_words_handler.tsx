import { WordStatisticsData } from '../../data_objects/words/basic_data_objects/word_statistics_data';
import { Words } from '../../data_objects/words/basic_data_objects/words';
import { GameWords } from '../../data_objects/words/game_data_objects/game_words';
import { UserStatistics } from '../../data_objects/words/statistics/user_statistics';

import NewWordsSelector from './new_words_handler';
import BaseWordsSelector from './base_words_selector';
import { WordDetails } from '../../data_objects/words/basic_data_objects/word_details';
import { GameWordDictDetails } from '../../data_objects/words/game_data_objects/game_word_dict_details';

export default class SmartWordsHandler extends BaseWordsSelector {
    selectPracticedInternal(practicedWords: { [word: string]: WordStatisticsData }): { [word: string]: GameWordDictDetails } {
        // dict of the words that are considered "smart practice words"
        const wordsMatchingToFilter: { [word: string]: GameWordDictDetails } = {};

        // filters only the words that are considered "smart pracrice"
        for (const word in practicedWords) {
            // https://docs.google.com/document/d/1bqHCz86ZslXG_MxHGOBIxr1OJxB6c5YJC2EdA8N_D9M/edit?tab=t.0
            // in page 3, under "filters by models" - an explanation about the following "if" statement and what does it do
            if ((practicedWords[word].ConsecutiveSuccesses == 0 && 1 <= this.deltaDaysFromToday(practicedWords[word].LastSeen))
                 || 2 ** (practicedWords[word].ConsecutiveSuccesses - 1) <= this.deltaDaysFromToday(practicedWords[word].LastSeen)) {
                    const WordDetails: GameWordDictDetails = {
                        FullWord: practicedWords[word].Word.FullWord,
                        Meanings: practicedWords[word].Word.Meanings,
                        Group: practicedWords[word].Word.Group,
                        Type: "תרגול (חכם)"
                    }
                    wordsMatchingToFilter[word] = WordDetails
            }
        }
        
        return wordsMatchingToFilter;
    }

    selectNewInternal(newWords: { [word: string]: WordDetails }): { [word: string]: GameWordDictDetails } {
        return new NewWordsSelector().selectNewInternal(newWords);
    }

    getSplit(totalAmount: number, newWords: { [word: string]: WordDetails; }, practicedWords: { [word: string]: WordStatisticsData; }): { newWordsAmount: number; practicedAmount: number; } {
        // gets the length of newWordsDict and statisticsDict
        const newWordsLength = Object.keys(newWords).length;
        const statisticsLength = Object.keys(practicedWords).length;

        // the sum of the words both dicts can "give"
        const totalCapacity = newWordsLength + statisticsLength;
      
        // If the total capacity is less than the number, use all capacity
        if (totalCapacity <= totalAmount) {
          return { newWordsAmount: newWordsLength, practicedAmount: statisticsLength };
        }
      
        // Ideal split: 50/50
        const idealSplit = Math.floor(totalAmount / 2);
      
        // how much newWordsDict and statisticsDict can give - either half or less (as much as it can)
        let newWordsAmount = Math.min(idealSplit, newWordsLength);
        let practicedAmount = Math.min(idealSplit, statisticsLength);
      
        // Adjust for leftover if one list can't fully handle its portion
        const remaining = totalAmount - (newWordsAmount + practicedAmount);
        
        // checks if there are remaining words to add (if newWords or statistics was under the idealSplit)
        if (remaining > 0) {
            // case if the newWords has more words to "give" from it
            if (newWordsLength > newWordsAmount) {
                // adds to newWordsAmount how much remains to add/the amount that remains of the newWordsDict 
                const extraForNewWords = Math.min(remaining, newWordsLength - newWordsAmount);
                newWordsAmount += extraForNewWords;
            }
        
            // updates how much left to fill after the first segment of the if statement
            const stillRemaining = totalAmount - (newWordsAmount + practicedAmount);
        
            // case if the statistics has more words to "give" from it
            if (stillRemaining > 0 && statisticsLength > practicedAmount) {
                // adds to statisticsAmount how much remains to add/the amount that remains of the statisticsDict 
                const extraForStatistics = Math.min(stillRemaining, statisticsLength - practicedAmount);
                practicedAmount += extraForStatistics;
            }
        }
        
        return { newWordsAmount, practicedAmount };
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

    deltaDaysFromToday(date: string) {
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
}