import { WordDetails } from "../../data_objects/words/basic_data_objects/word_details";
import { WordStatisticsData } from "../../data_objects/words/basic_data_objects/word_statistics_data";
import { GameWordDictDetails } from "../../data_objects/words/game_data_objects/game_word_dict_details";
import BaseWordsSelector from "./base_words_selector";

export default class NewWordsSelector extends BaseWordsSelector {
    selectPracticedInternal(practicedWords: { [word: string]: WordStatisticsData }): { [word: string]: GameWordDictDetails } {
        const wordsMatchingToFilter: { [word: string]: GameWordDictDetails } = {};
        return wordsMatchingToFilter;
    }
    
    selectNewInternal(newWords: { [word: string]: WordDetails }): { [word: string]: GameWordDictDetails } {
        // dict of the words that are considered "wrong words"
        const wordsMatchingToFilter: { [word: string]: GameWordDictDetails } = {};
        for (const word in newWords){
            const WordDetails: GameWordDictDetails = {
                FullWord: newWords[word].FullWord,
                Meanings: newWords[word].Meanings,
                Group: newWords[word].Group,
                Type: "חדש"
            }
            wordsMatchingToFilter[word] = WordDetails;
        }

        return wordsMatchingToFilter;
    }

    getSplit(totalAmount: number, newWords: { [word: string]: WordDetails; }, practicedWords: { [word: string]: WordStatisticsData; }): { newWordsAmount: number; practicedAmount: number; } {
        const practicedAmount = 0;
        const newWordsAmount = totalAmount;
        return { newWordsAmount , practicedAmount };
    }
}