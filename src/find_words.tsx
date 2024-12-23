//interfaces for word list
interface Meaning {
    Meaning: string;
    Source: string;
}

interface WordListDetails {
    FullWord: string;
    Meanings: Meaning[];
    Group: number;
    Type: string;
}

interface Words {
    [key: string]: {
        [word: string]: WordListDetails;
    };
}

// new words dictionaries interface
interface WordDetails {
    FullWord: string;
    Meanings: Meaning[];
    Group: number;
}

interface NewWords {
    [groupId: number]: { 
        [word: string]: WordDetails 
    }
}

// interfaces for statistics
interface WordStatisticsData {
    Word: WordDetails;                 
    ConsecutiveSuccesses: number; 
    LastSeen: string;           
    Successes: number;          
    Failures: number;            
}

interface WordsStatistics {
    WordCount: number;
    Words: { [groupId: number]: { [word: string]: WordStatisticsData } };
}

interface UserStatistics {
    WordsStatistics: WordsStatistics; 
}


// TODO: abstract class - better naming, extract to files
class addNewWords {
    static add(contextDict: NewWords, key: number, amount_of_words: number, wordsDict: Words): Words {
        // creates the level in the wordsDict if doesn't exist
        if (!wordsDict[key]) {
            wordsDict[key] = {};
        }

        // converting to array - so that I can shuffle
        const wordsArray = Object.entries(contextDict[key]);
        
        // TODO: bad logic... very compute wasteful... shuffle random integer in the range {0 .. (wordsArray.Length-1)} and select unselected words until your "budget" is full.
        // TODO: In my opinion the "shuffle and select" code section should be a function in a shared parent for these classes rather than repeated.

        // shuffling the array of the potential "new" words
        for (let i = wordsArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1)); 
            [wordsArray[i], wordsArray[j]] = [wordsArray[j], wordsArray[i]]; 
        }

        // takes only the amount of words I need from the potential words
        const selectedWords = wordsArray.slice(0, amount_of_words);

        // adding them to the wordsDict
        selectedWords.forEach(([word, word_info]) => {
            wordsDict[key][word] = {
                ...word_info, 
                Type: 'חדש'   
            };
        });

        return wordsDict;
    }
}

class addWrongWords {
    static add(contextDict: UserStatistics, key: number, amount_of_words: number, wordsDict: Words): Words {
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

        // shuffling the array of the potential "wrong" words
        for (let i = wordsArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1)); 
            [wordsArray[i], wordsArray[j]] = [wordsArray[j], wordsArray[i]]; 
        }

        // takes only the amount of words I need from the potential words
        const selectedWords = wordsArray.slice(0, amount_of_words);

        // adding them to the wordsDict
        selectedWords.forEach(([word, word_info]) => {
            wordsDict[key][word] = {
                FullWord: word_info.Word.FullWord,
                Meanings: word_info.Word.Meanings,
                Group: word_info.Word.Group,
                Type: 'טעות'   
            };
        });

        return wordsDict;
    }
}

class addPracticeWords {
    static add(contextDict: UserStatistics, key: number, amount_of_words: number, wordsDict: Words): Words {
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

        // shuffling the array of the potential "practice" words
        for (let i = wordsArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1)); 
            [wordsArray[i], wordsArray[j]] = [wordsArray[j], wordsArray[i]]; 
        }

        // takes only the amount of words I need from the potential words
        const selectedWords = wordsArray.slice(0, amount_of_words);

        // adding them to the wordsDict
        selectedWords.forEach(([word, word_info]) => {
            wordsDict[key][word] = {
                FullWord: word_info.Word.FullWord,
                Meanings: word_info.Word.Meanings,
                Group: word_info.Word.Group,
                Type: 'תרגול'   
            };
        });

        return wordsDict;
    }
}
class addSmartWords {
    static add(new_words: NewWords, statistics: UserStatistics, key: number, amount_of_words: number, wordsDict: Words): Words {
        // creates the level in the wordsDict if doesn't exist
        if (!wordsDict[key]) {
            wordsDict[key] = {};
        }

        // dict of the words that are considered "smart practice words"
        const words: { [word: string]: WordStatisticsData } = {};

        const listOfWords = statistics.WordsStatistics.Words[key]; // the part of the statistics dict that you need to search for "smart practice words"
        // filters only the words that are considered "smart pracrice"
        for (const word in listOfWords) {
            // TODO: add a link to a document explaining the selection logic
            if (listOfWords[word].ConsecutiveSuccesses == 0 || 2 ** (listOfWords[word].ConsecutiveSuccesses - 1) <= addSmartWords.deltaDaysFromToday(listOfWords[word].LastSeen)) {
                words[word] = listOfWords[word]
            }
        }

        // splits the amount of words asked for to "new" words and "smart practice" words
        const amounts = addSmartWords.splitNumberBetweenLists(amount_of_words, key, new_words, words);

        // adding the new words part
        addNewWords.add(new_words, key, amounts.newWordsAmount, wordsDict);

        // converting to array - so that I can shuffle
        const wordsArray = Object.entries(words);

        // shuffling the array of the potential "smart practice" words
        for (let i = wordsArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1)); 
            [wordsArray[i], wordsArray[j]] = [wordsArray[j], wordsArray[i]]; 
        }

        // takes only the amount of words I need from the potential words
        const selectedWords = wordsArray.slice(0, Math.min(wordsArray.length, amounts.statisticsAmount));
        
        // adding them to the wordsDict
        selectedWords.forEach(([word, word_info]) => {
            wordsDict[key][word] = {
                FullWord: word_info.Word.FullWord,
                Meanings: word_info.Word.Meanings,
                Group: word_info.Word.Group,
                Type: 'תרגול (חכם)'   
            };
        });

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

    static splitNumberBetweenLists(amount: number, key: number, new_words: NewWords, statistics: { [word: string]: WordStatisticsData }): { newWordsAmount: number; statisticsAmount: number } {
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

interface Settings {
    shouldIncludeNewWords: boolean; 
    shouldIncludeIncorrectWords: boolean; 
    shouldIncludePracticeWords: boolean; 
    shouldIncludeSmartStudy: boolean;
    language: string | null;
    levels: { [key: number]: number };
}

export default class createWordList {
    private _settings: Settings;
    private _flags_count: number; 
    private _words: Words;

    private _new_words: NewWords;
    private _statistics: UserStatistics; 

    constructor(settings: Settings, new_words: NewWords, statistics: UserStatistics, flags_count: number) { 
        this._settings = settings;
        this._flags_count = flags_count;

        this._words = {};

        this._new_words = new_words;
        this._statistics = statistics;
    }

    setSettings(settings: Settings): void {
        this._settings = settings;
    }

    createList(): Words {
        try {
            for (const [level_key, level_word_count] of Object.entries(this._settings.levels)) {
                if (typeof level_word_count == 'number' && level_word_count > 0 && level_word_count <= 100) { 
                    const amountList = this._divideNumber(level_word_count); 

                    if (this._settings.shouldIncludeNewWords && 
                        amountList.length && 
                        this.checkLevelExistsInNewList(parseInt(level_key))) { 
                        addNewWords.add(this._new_words, 0, Math.min(Object.entries(this._new_words[0]).length, amountList[amountList.length - 1]), this._words);
                        // addNewWords.add(this._new_words, parseInt(level_key), Math.min(Object.entries(this._new_words[parseInt(level_key)]).length, amountList[amountList.length - 1]), this._words);
                        amountList.pop();
                    }
                    if (this._settings.shouldIncludeIncorrectWords && 
                        amountList.length && 
                        this.checkLevelExistsInStatisticsList(parseInt(level_key))) { 
                        addWrongWords.add(this._statistics, 0, Math.min(Object.entries(this._statistics.WordsStatistics.Words[0]).length, amountList[amountList.length - 1]), this._words);
                        // addWrongWords.add(this._statistics, parseInt(level_key), Math.min(Object.entries(this._statistics.WordsStatistics.Words[parseInt(level_key)]).length, amountList[amountList.length - 1]), this._words);
                        amountList.pop();
                    }
                    if (this._settings.shouldIncludePracticeWords && 
                        amountList.length && 
                        this.checkLevelExistsInStatisticsList(parseInt(level_key))) { 
                        addPracticeWords.add(this._statistics, 0, Math.min(Object.entries(this._statistics.WordsStatistics.Words[0]).length, amountList[amountList.length - 1]), this._words);
                        // addPracticeWords.add(this._statistics, parseInt(level_key), Math.min(Object.entries(this._statistics.WordsStatistics.Words[parseInt(level_key)]).length, amountList[amountList.length - 1]), this._words);
                        amountList.pop();
                    }
                    if (this._settings.shouldIncludeSmartStudy && 
                        amountList.length && 
                        this.checkLevelExistsInNewList(parseInt(level_key)) && 
                        this.checkLevelExistsInStatisticsList(parseInt(level_key))) { 
                        addSmartWords.add(this._new_words, this._statistics, 0, amountList[amountList.length - 1], this._words);
                        // addSmartWords.add(parseInt(level_key), Math.min(Object.entries(this._statistics.WordsStatistics.Words[parseInt(level_key)]).length, amountList[amountList.length - 1]), this._words);
                        amountList.pop();
                    }
                }
            }

            return this._words;

        } catch (error) {
            console.error(`error: ${error}`);
        }

        return {};
    }

    private _divideNumber(word_count: number): number[] { 
        const baseValue = Math.floor(word_count / this._flags_count); 
        const remainder = word_count % this._flags_count; 

        const result = Array(this._flags_count).fill(baseValue);
        
        for (let i = 0; i < remainder; i++) {
            result[this._flags_count - i - 1] += 1;
        }

        return result;
    }

    checkLevelExistsInNewList(level: number): boolean {
        return true;
        return level in this._new_words;
    }

    checkLevelExistsInStatisticsList(level: number): boolean {
        return true;
        return level in this._statistics.WordsStatistics.Words;
    }


    printWords() {
        console.log(this._words);
    }
}