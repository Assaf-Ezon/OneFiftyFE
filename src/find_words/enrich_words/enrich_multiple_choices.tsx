import { Meaning } from "../../data_objects/words/basic_data_objects/meaning";
import { WordDetails } from "../../data_objects/words/basic_data_objects/word_details";
import { WordStatisticsData } from "../../data_objects/words/basic_data_objects/word_statistics_data";
import { Words } from "../../data_objects/words/basic_data_objects/words";
import { GameWords } from "../../data_objects/words/game_data_objects/game_words";
import { MultipleChoicesGameWordDictDetails } from "../../data_objects/words/game_data_objects/multiple_choices_game_word_details";
import { MultipleChoicesGameWords } from "../../data_objects/words/game_data_objects/multiple_choices_game_words";

export class EnrichMultipleChoices {
        private _newWords: Words;
        private _practicedWords: { [groupId: number]: { [word: string]: WordStatisticsData; } };

        constructor(newWords: Words, practicedWords: { [groupId: number]: { [word: string]: WordStatisticsData; } }) {
            this._newWords = newWords;
            this._practicedWords = practicedWords;
        }
        
        enrich (wordsDict: GameWords): MultipleChoicesGameWords {
            for (const level of Object.values(wordsDict)) {
                for (const word_key of Object.keys(level)) {
                    let currectWord = (level[word_key] as MultipleChoicesGameWordDictDetails);
                    const currentWordMeaning = this._getMeaningsAsString(currectWord.Meanings);

                    let firstRandomMeaning: Meaning[] = this._findRandomMeaning();
                    let firstRandomMeaningValue: string = this._getMeaningsAsString(firstRandomMeaning);

                    while (firstRandomMeaningValue == currentWordMeaning) {
                        firstRandomMeaning = this._findRandomMeaning();
                        firstRandomMeaningValue = this._getMeaningsAsString(firstRandomMeaning);
                    }

                    let secondRandomMeaning: Meaning[] = this._findRandomMeaning();
                    let secondRandomMeaningValue: string = this._getMeaningsAsString(secondRandomMeaning);

                    while (secondRandomMeaningValue == currentWordMeaning || firstRandomMeaning == secondRandomMeaning) {
                        secondRandomMeaning = this._findRandomMeaning();
                        secondRandomMeaningValue = this._getMeaningsAsString(secondRandomMeaning);
                    }

                    let thirdRandomMeaning: Meaning[] = this._findRandomMeaning();
                    let thirdRandomMeaningValue: string = this._getMeaningsAsString(thirdRandomMeaning);

                    while (thirdRandomMeaningValue == currentWordMeaning || firstRandomMeaning == thirdRandomMeaning || secondRandomMeaning == thirdRandomMeaning) {
                        thirdRandomMeaning = this._findRandomMeaning();
                        thirdRandomMeaningValue = this._getMeaningsAsString(thirdRandomMeaning);
                    }

                    currectWord.IncorrectMeanings = [firstRandomMeaning, secondRandomMeaning, thirdRandomMeaning];
                }
            }

            return wordsDict as MultipleChoicesGameWords;
        }

        private _findRandomMeaning() {
            let randomWordInLevel: WordDetails;

            const newWordsRatio = this._precentageNewWordsToTotal();

            const randomNumberInRatio = Math.floor(Math.random() * 100) + 1;
            if (randomNumberInRatio > newWordsRatio) {
                const levels = Object.keys(this._practicedWords); // all levels
                let randomLevel = this._practicedWords[Math.floor(Math.random() * levels.length)]; // random level from existing levels
                randomWordInLevel = Object.values(randomLevel)[Math.floor(Math.random() * Object.keys(randomLevel).length)].Word; // random word in the random level
            } 
            else {
                const levels = Object.keys(this._newWords); // all levels
                let randomLevel = this._newWords[Math.floor(Math.random() * levels.length)]; // random level from existing levels
                randomWordInLevel = Object.values(randomLevel)[Math.floor(Math.random() * Object.keys(randomLevel).length)]; // random word in the random level
            }
            
            return randomWordInLevel.Meanings // the meaning of the random word
        }

        private _getMeaningsAsString (meaningsObject: Meaning[]): string {
            return meaningsObject.map(item => item.Meaning).join("\n");
        }

        private _precentageNewWordsToTotal (): number {
            let newWordsTotal = this._getAmountOfWords(this._newWords);
            let practiceWordsTotal = this._getAmountOfWords(this._practicedWords);;

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