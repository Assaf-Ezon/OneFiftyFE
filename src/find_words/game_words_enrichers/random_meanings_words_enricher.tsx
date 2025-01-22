import { EnrichersParamName } from "../../data_objects/enums/enrichers_param_name";
import { Meaning } from "../../data_objects/words/basic_data_objects/meaning";
import { WordDetails } from "../../data_objects/words/basic_data_objects/word_details";
import { WordStatisticsData } from "../../data_objects/words/basic_data_objects/word_statistics_data";
import { Words } from "../../data_objects/words/basic_data_objects/words";
import { GameWordDictDetails } from "../../data_objects/words/game_data_objects/game_word_dict_details";
import { GameWords } from "../../data_objects/words/game_data_objects/game_words";
import BaseWordsEnricher from "./base_words_enricher";

export default class RandomMeaningsWordsEnricher extends BaseWordsEnricher {    
    enrich(wordsDictToEnrich: GameWords, newWords: Words, statistics: { [groupId: number]: { [word: string]: WordStatisticsData; } }) {
        for (const level of Object.values(wordsDictToEnrich)) {
            for (const word_key of Object.keys(level)) {
                const currentWord: GameWordDictDetails = level[word_key];
                const currentWordMeaning: string = this._getMeaningsAsString(currentWord.Meanings);

                const allMeanings: string[] = this._getThreeUniqueRandomMeanings(currentWordMeaning, newWords, statistics);

                const randomIndex: number = Math.floor(Math.random() * (allMeanings.length + 1));
                allMeanings.splice(randomIndex, 0, currentWordMeaning);

                currentWord.ExtraParameters[EnrichersParamName.RandomMeanings] = allMeanings;
            }
        }
    }

    private _getThreeUniqueRandomMeanings(correctMeaning: string, newWords: Words, statistics: { [groupId: number]: { [word: string]: WordStatisticsData; } }): string[] {
        const uniqueRandomMeanings: Set<string> = new Set();

        while (uniqueRandomMeanings.size < 3) {
            let randomMeaning: string = this._findRandomMeaning(newWords, statistics);
            
            while (randomMeaning == correctMeaning) {
                randomMeaning = this._findRandomMeaning(newWords, statistics);
            }

            uniqueRandomMeanings.add(randomMeaning);
        }

        return Array.from(uniqueRandomMeanings);
    }

    private _findRandomMeaning(newWords: Words, statistics: { [groupId: number]: { [word: string]: WordStatisticsData; } }): string {
        // gets the threshold of "new" words / all words
        const newWordsThreshold = this._precentageNewWordsToTotal(newWords, statistics);

        // generates a random number between 1-100
        const randomNumberInThreshold = Math.floor(Math.random() * 100) + 1;

        // picks "newWords" or "statistics" depend on the random number and the threshold
        const selectedWordsDict = randomNumberInThreshold > newWordsThreshold ? statistics : newWords;

        const levels = Object.keys(selectedWordsDict); // all levels
        const randomLevel = (selectedWordsDict)[Math.floor(Math.random() * levels.length)]; // random level from existing levels

        const randomWordInLevel: WordDetails = randomNumberInThreshold > newWordsThreshold ? // random word in the random level
        Object.values(randomLevel)[Math.floor(Math.random() * Object.keys(randomLevel).length)].Word
        : Object.values(randomLevel)[Math.floor(Math.random() * Object.keys(randomLevel).length)];

        return this._getMeaningsAsString(randomWordInLevel.Meanings);
    }

    private _getMeaningsAsString (meaningsObject: Meaning[]): string {
        return meaningsObject.map(item => item.Meaning).join("\n");
    }

    private _precentageNewWordsToTotal (newWords: Words, statistics: { [groupId: number]: { [word: string]: WordStatisticsData; } }): number {
        let newWordsTotal = this._getAmountOfWords(newWords);
        let practicedWordsTotal = this._getAmountOfWords(statistics);;

        return Math.floor((newWordsTotal / (newWordsTotal + practicedWordsTotal)) * 100);
    }

    private _getAmountOfWords (words: Words | { [groupId: number]: { [word: string]: WordStatisticsData; } }): number {
        let total = 0;

        for (const level of Object.values(words)) {
            total += Object.keys(level).length;
        }

        return total
    }
}