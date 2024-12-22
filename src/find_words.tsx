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



class addNewWords {
    static add(contextDict: NewWords, key: number, amount_of_words: number, wordsDict: Words): Words {
        // console.log(`mode: new, key: ${key}, amount: ${amount_of_words}`);
        
        if (!wordsDict[key]) {
            wordsDict[key] = {};
        }

        const wordsArray = Object.entries(contextDict[key]);

        for (let i = wordsArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1)); 
            [wordsArray[i], wordsArray[j]] = [wordsArray[j], wordsArray[i]]; 
        }

        const selectedWords = wordsArray.slice(0, amount_of_words);

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
        // console.log(`mode: wrong, key: ${key}, amount: ${amount_of_words}`);

        if (!wordsDict[key]) {
            wordsDict[key] = {};
        }

        const words: { [word: string]: WordStatisticsData } = {};

        const listOfWords = contextDict.WordsStatistics.Words[key];
        for (const word in listOfWords) {
            if (listOfWords[word].Successes == 0 && listOfWords[word].Failures !== 0) {
                words[word] = listOfWords[word]
            }
        }

        const wordsArray = Object.entries(words);

        for (let i = wordsArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1)); 
            [wordsArray[i], wordsArray[j]] = [wordsArray[j], wordsArray[i]]; 
        }

        const selectedWords = wordsArray.slice(0, amount_of_words);

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
        // console.log(`mode: practice, key: ${key}, amount: ${amount_of_words}`);

        if (!wordsDict[key]) {
            wordsDict[key] = {};
        }

        const words: { [word: string]: WordStatisticsData } = {};

        const listOfWords = contextDict.WordsStatistics.Words[key];
        for (const word in listOfWords) {
            if (listOfWords[word].Successes !== 0) {
                words[word] = listOfWords[word]
            }
        }

        const wordsArray = Object.entries(words);

        for (let i = wordsArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1)); 
            [wordsArray[i], wordsArray[j]] = [wordsArray[j], wordsArray[i]]; 
        }

        const selectedWords = wordsArray.slice(0, amount_of_words);

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
        // console.log("Adding smart words...");

        if (!wordsDict[key]) {
            wordsDict[key] = {};
        }

        addNewWords.add(new_words, key, Math.min(Object.entries(new_words[key]).length, amount_of_words / 2), wordsDict);
        const left_to_fill = amount_of_words - Object.entries(wordsDict[key]).length;

        const words: { [word: string]: WordStatisticsData } = {};

        const listOfWords = statistics.WordsStatistics.Words[key];
        for (const word in listOfWords) {
            if (listOfWords[word].Successes == 0 || 2 ** (listOfWords[word].ConsecutiveSuccesses - 1) <= addSmartWords.deltaDaysFromToday(listOfWords[word].LastSeen)) {
                words[word] = listOfWords[word]
            }
        }

        const wordsArray = Object.entries(words);

        for (let i = wordsArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1)); 
            [wordsArray[i], wordsArray[j]] = [wordsArray[j], wordsArray[i]]; 
        }

        const selectedWords = wordsArray.slice(0, Math.min(wordsArray.length, left_to_fill));
        
        selectedWords.forEach(([word, word_info]) => {
            wordsDict[key][word] = {
                FullWord: word_info.Word.FullWord,
                Meanings: word_info.Word.Meanings,
                Group: word_info.Word.Group,
                Type: 'תרגול (חכם)'   
            };
        });

        console.log(words);
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
}


// Settings interface
interface Settings {
    newWords: boolean;
    incorrectWords: boolean;
    practiceWords: boolean;
    smartStudy: boolean;
    language: string | null;
    levels: { [key: number]: number };
}

export default class createWordList {
    private _settings: Settings;
    private _booleans_count: number;
    private _words: Words;

    private _new_words: NewWords;
    private _statistics: UserStatistics; 

    constructor(settings: Settings, new_words: NewWords, statistics: UserStatistics) { 
        this._settings = settings;
        this._booleans_count = 0;

        const booleanList: string[] = ["newWords", "incorrectWords", "practiceWords", "smartStudy"];

        for (const [key, value] of Object.entries(this._settings)) {
            if (typeof value === "boolean" && value && booleanList.includes(key)) {
                this._booleans_count += 1;
            }
        }

        this._words = {};

        this._new_words = new_words;
        this._statistics = statistics;
    }

    setSettings(settings: Settings): void {
        this._settings = settings;
    }

    createList(): Words {
        try {
            for (const [level_key, level_value] of Object.entries(this._settings.levels)) {
                if (typeof level_value == 'number' && level_value > 0) {
                    const amountList = this._divideNumber(level_value);

                    if (this._settings.newWords && amountList.length) { // add " && this.checkLevelExistsInNewList(parseInt(level_key))" to statement
                        addNewWords.add(this._new_words, 0, Math.min(Object.entries(this._new_words[0]).length, amountList[amountList.length - 1]), this._words);
                        // addNewWords.add(this._new_words, parseInt(level_key), Math.min(Object.entries(this._new_words[parseInt(level_key)]).length, amountList[amountList.length - 1]), this._words);
                        amountList.pop();
                    }
                    if (this._settings.incorrectWords && amountList.length) { // add "&& this.checkLevelExistsInStatisticsList(parseInt(level_key))" to statement"
                        addWrongWords.add(this._statistics, 0, Math.min(Object.entries(this._statistics.WordsStatistics.Words[0]).length, amountList[amountList.length - 1]), this._words);
                        // addWrongWords.add(this._statistics, parseInt(level_key), Math.min(Object.entries(this._statistics.WordsStatistics.Words[parseInt(level_key)]).length, amountList[amountList.length - 1]), this._words);
                        amountList.pop();
                    }
                    if (this._settings.practiceWords && amountList.length) { // add " && this.checkLevelExistsInStatisticsList(parseInt(level_key))" to statement
                        addPracticeWords.add(this._statistics, 0, Math.min(Object.entries(this._statistics.WordsStatistics.Words[0]).length, amountList[amountList.length - 1]), this._words);
                        // addPracticeWords.add(this._statistics, parseInt(level_key), Math.min(Object.entries(this._statistics.WordsStatistics.Words[parseInt(level_key)]).length, amountList[amountList.length - 1]), this._words);
                        amountList.pop();
                    }
                    if (this._settings.smartStudy && amountList.length) { // add " && this.checkLevelExistsInNewList(parseInt(level_key)) && this.checkLevelExistsInStatisticsList(parseInt(level_key))" to statement
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

    private _divideNumber(amount: number): number[] {
        const baseValue = Math.floor(amount / this._booleans_count); 
        const remainder = amount % this._booleans_count; 

        const result = Array(this._booleans_count).fill(baseValue);

        for (let i = this._booleans_count - remainder; i < this._booleans_count; i++) {
            result[i] += 1;
        }

        return result;
    }

    checkLevelExistsInNewList(level: number): boolean {
        return level in this._new_words;
    }

    checkLevelExistsInStatisticsList(level: number): boolean {
        return level in this._statistics.WordsStatistics.Words;
    }


    printWords() {
        console.log(this._words);
    }
}

// Test the implementation
const settings: Settings = {
    newWords: true,
    incorrectWords: true,
    practiceWords: true,
    smartStudy: false,
    language: "Hebrew",
    levels: {
        1: 4,
        2: 4,
    },
};

const new_words: NewWords = {
    1: {
        "הֲגַם שֶׁ...": {
            "FullWord":"הֲגַם שֶׁ...",
            "Meanings": [
                {
                    "Meaning":"אף על פי",
                    "Source":""
                }
            ],
            "Group": 0,
        },
        "איסטניס": {
            "FullWord":"הֲגַם שֶׁ...",
            "Meanings": [
                {
                    "Meaning":"אף על פי",
                    "Source":""
                }
            ],
            "Group": 0,
        },
        "פרקדן": {
            "FullWord":"הֲגַם שֶׁ...",
            "Meanings": [
                {
                    "Meaning":"אף על פי",
                    "Source":""
                }
            ],
            "Group": 0,
        },
    },
    2: {
        "אֵבוּס": {
            "FullWord":"אֵבוּס",
            "Meanings": [
                {
                    "Meaning":"כלי צר ומוארך הפתוח בחלקו העליון ובו משאירים מזון לבהמות",
                    "Source":""
                }
            ],
            "Group": 0,
        },
        "אֲבוּקָה": {
            "FullWord":"אֲבוּקָה",
            "Meanings": [
                {
                    "Meaning":"לפיד",
                    "Source":""
                }
            ],
            "Group": 0,
        },
    },
}

const stats: UserStatistics = {
    "WordsStatistics": {
        "WordCount": 2,
        "Words": {
            1: {
                "אָבַד עָלָיו הַכֶּלַח": {
                    "Word": {
                        "FullWord": "אָבַד עָלָיו הַכֶּלַח",
                        "Meanings": [
                            {
                                "Meaning": "התיישן, עבר זמנו", 
                                "Source": ""
                            },
                        ],
                        "Group": 1,
                    },
                    "ConsecutiveSuccesses": 2,
                    "LastSeen": "2024-11-22T10:09:59.7948609Z",
                    "Successes": 2,
                    "Failures": 0
                },
            },
            2: {  
                "אַבְדָּאִי": {
                    "Word": {
                        "FullWord":  "אַבְדָּאִי",
                        "Meanings": [
                            {
                                "Meaning":"גבר חזק ותקיף, בריון",
                                "Source":"ויקימילון"
                            },
                        ],
                        "Group": 2,
                    },
                    "ConsecutiveSuccesses": 0,
                    "LastSeen": "2024-11-22T10:09:59.794862Z",
                    "Successes": 0,
                    "Failures": 2
                },
            },
        },
    },
}

// const c = new createWordList(settings, new_words, stats);
// c.createList();
// c.printWords();