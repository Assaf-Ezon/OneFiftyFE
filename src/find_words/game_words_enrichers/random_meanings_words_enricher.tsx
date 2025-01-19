import { EnrichersParamName } from "../../data_objects/enums/enrichers_param_name";
import { Meaning } from "../../data_objects/words/basic_data_objects/meaning";
import { WordDetails } from "../../data_objects/words/basic_data_objects/word_details";
import { WordStatisticsData } from "../../data_objects/words/basic_data_objects/word_statistics_data";
import { Words } from "../../data_objects/words/basic_data_objects/words";
import { GameWords } from "../../data_objects/words/game_data_objects/game_words";
import { UserStatistics } from "../../data_objects/words/statistics/user_statistics";

import BaseWordsEnricher from "./base_words_enricher";

export default class RandomMeaningsWordsEnricher extends BaseWordsEnricher {    
    enrich(wordsDictToEnrich: GameWords, newWords: Words, statistics: UserStatistics) {
        for (const level of Object.values(wordsDictToEnrich)) {
            for (const word_key of Object.keys(level)) {
                let currentWord = level[word_key];
                const currentWordMeaning = this._getMeaningsAsString(currentWord.Meanings);

                let firstRandomMeaning: string = this._findRandomMeaning(newWords, statistics);

                while (firstRandomMeaning == currentWordMeaning) {
                    firstRandomMeaning = this._findRandomMeaning(newWords, statistics);
                }

                let secondRandomMeaning: string = this._findRandomMeaning(newWords, statistics);

                while (secondRandomMeaning == currentWordMeaning || firstRandomMeaning == secondRandomMeaning) {
                    secondRandomMeaning = this._findRandomMeaning(newWords, statistics);
                }

                let thirdRandomMeaning: string = this._findRandomMeaning(newWords, statistics);

                while (thirdRandomMeaning == currentWordMeaning || firstRandomMeaning == thirdRandomMeaning || secondRandomMeaning == thirdRandomMeaning) {
                    thirdRandomMeaning = this._findRandomMeaning(newWords, statistics);
                }

                const randomMeanings = [firstRandomMeaning, secondRandomMeaning, thirdRandomMeaning];

                const randomIndex: number = Math.floor(Math.random() * (randomMeanings.length + 1));
        
                const allMeanings: string[] = [...randomMeanings];
                allMeanings.splice(randomIndex, 0, this._getMeaningsAsString(currentWord.Meanings));

                currentWord.ExtraParameters[EnrichersParamName.RandomMeanings] = allMeanings;
            }
        }
    }

    private _findRandomMeaning(newWords: Words, statistics: UserStatistics): string {
        let randomWordInLevel: WordDetails;

        const newWordsRatio = this._precentageNewWordsToTotal(newWords, statistics);

        const randomNumberInRatio = Math.floor(Math.random() * 100) + 1;
        if (randomNumberInRatio > newWordsRatio) {
            const levels = Object.keys(statistics.WordsStatistics.Words); // all levels
            let randomLevel = statistics.WordsStatistics.Words[Math.floor(Math.random() * levels.length)]; // random level from existing levels
            randomWordInLevel = Object.values(randomLevel)[Math.floor(Math.random() * Object.keys(randomLevel).length)].Word; // random word in the random level
        } 
        else {
            const levels = Object.keys(newWords); // all levels
            let randomLevel = newWords[Math.floor(Math.random() * levels.length)]; // random level from existing levels
            randomWordInLevel = Object.values(randomLevel)[Math.floor(Math.random() * Object.keys(randomLevel).length)]; // random word in the random level
        }

        return this._getMeaningsAsString(randomWordInLevel.Meanings);
    }

    private _getMeaningsAsString (meaningsObject: Meaning[]): string {
        return meaningsObject.map(item => item.Meaning).join("\n");
    }

    private _precentageNewWordsToTotal (newWords: Words, statistics: UserStatistics): number {
        let newWordsTotal = this._getAmountOfWords(newWords);
        let practiceWordsTotal = this._getAmountOfWords(statistics.WordsStatistics.Words);;

        return Math.floor((newWordsTotal / (newWordsTotal + practiceWordsTotal)) * 100);
    }

    private _getAmountOfWords (words: Words | { [groupId: number]: { [word: string]: WordStatisticsData; } }): number {
        let total = 0;

        for (const level of Object.values(words)) {
            for (const word of Object.keys(level)) {
                total += 1;
            }
        }

        return total
    }
}