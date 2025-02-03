import { WordDetails } from "../../data_objects/words/basic_data_objects/word_details";
import { WordStatisticsData } from "../../data_objects/words/basic_data_objects/word_statistics_data";
import { GameWordDictDetails } from "../../data_objects/words/game_data_objects/game_word_dict_details";
import BaseWordsSelector from "./base_words_selector";

export default class PracticeWordsSelector extends BaseWordsSelector {
    selectPracticedInternal(practicedWords: { [word: string]: WordStatisticsData }): { [word: string]: GameWordDictDetails } {
        // dict of the words that are considered "practice words"
        const wordsMatchingToFilter: { [word: string]: GameWordDictDetails } = {};
        var count = 0;

        // filters only the words that are considered "practice"
        for (const word in practicedWords) {
            if (practicedWords[word].Successes !== 0) {
                const WordDetails: GameWordDictDetails = {
                    FullWord: practicedWords[word].Word.FullWord,
                    Meanings: practicedWords[word].Word.Meanings,
                    Group: practicedWords[word].Word.Group,
                    Type: "תרגול",
                    ExtraParameters: {},
                }
                wordsMatchingToFilter[word] = WordDetails;

                count++;
            }
        }
        
        this.countWordsMatchingToFilter = count;
        return wordsMatchingToFilter;
    }

    selectNewInternal(newWords: { [word: string]: WordDetails }): { [word: string]: GameWordDictDetails } {
        // dict of the words that are considered "wrong words"
        const wordsMatchingToFilter: { [word: string]: GameWordDictDetails } = {};
        return wordsMatchingToFilter;
    }

    getSplit(totalAmount: number, newWords: { [word: string]: WordDetails; }, practicedWords: { [word: string]: WordStatisticsData; }): { newWordsAmount: number; practicedAmount: number; } {
        const newWordsAmount = 0;
        const practicedAmount = totalAmount;
        return { newWordsAmount , practicedAmount };
    }
}