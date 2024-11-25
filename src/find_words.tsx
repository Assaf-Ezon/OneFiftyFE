//interfaces for word list
interface Meaning {
    Meaning: string;
    Source: string;
}

interface WordDetails {
    FullWord: string;
    Meanings: Meaning[];
    Group: number;
}

interface Words {
    [key: string]: {
        [word: string]: WordDetails;
    };
}


class addNewWords {
    static add(key: number, amount_of_words: number, wordsDict: Words): void {
        console.log("Adding new words...");
    }
}

class addWrongWords {
    static add(key: number, amount_of_words: number, wordsDict: Words): void {
        console.log("Adding incorrect words...");
    }
}

class addPracticeWords {
    static add(key: number, amount_of_words: number, wordsDict: Words): void {
        console.log("Adding practice words...");
    }
}

class addSmartWords {
    static add(key: number, amount_of_words: number, wordsDict: Words): void {
        console.log("Adding smart words...");
    }
}


// Define a type for the booleanList mapping
type BooleanListType = {
    newWords: (key: number, amount_of_words: number, wordsDict: Words) => void;
    incorrectWords: (key: number, amount_of_words: number, wordsDict: Words) => void;
    practiceWords: (key: number, amount_of_words: number, wordsDict: Words) => void;
    smartStudy: (key: number, amount_of_words: number, wordsDict: Words) => void;
};

// Boolean-to-method mapping
const booleanList: BooleanListType = {
    newWords: addNewWords.add,
    incorrectWords: addWrongWords.add,
    practiceWords: addPracticeWords.add,
    smartStudy: addSmartWords.add,
};

// Settings interface
interface Settings {
    newWords: boolean;
    incorrectWords: boolean;
    practiceWords: boolean;
    smartStudy: boolean;
    language: string | null;
    levels: { [key: number]: number };
}

class createWordList {
    private _settings: Settings;
    private _booleans: Partial<BooleanListType>;
    private _words: Words;

    constructor(settings: Settings) {
        this._settings = settings;
        this._booleans = {};

        for (const [key, value] of Object.entries(this._settings)) {
            if (typeof value === "boolean" && value && key in booleanList) {
                this._booleans[key as keyof BooleanListType] = booleanList[key as keyof BooleanListType];
            }
        }

        this._words = {};
    }

    setSettings(settings: Settings): void {
        this._settings = settings;
    }

    createList() {
        for (const [level_key, level_value] of Object.entries(this._settings.levels)) {
            if (typeof level_value == 'number' && level_value > 0) {
                const amountList = this._divideNumber(level_value, this._booleans);
                for (const [amount_key, amount_value] of Object.entries(amountList)) {
                    this._booleans[amount_key as keyof BooleanListType]?.(parseInt(level_key), amount_value, this._words);
                }
            }
        }
    }

    private _divideNumber(number: number, booleanDict: Partial<BooleanListType>): { [key: string]: number } {
        const dictLength = Object.keys(this._booleans).length;
        const baseValue = Math.floor(number / dictLength);
        const remainder = number % dictLength;
    
        const result: { [key: string]: number } = {};
    
        let index = 0;
        for (const key in booleanDict) {
            result[key] = baseValue + (index < remainder ? 1 : 0);
            index++;
        }
    
        return result;
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
        1: 10,
        2: 10,
        3: 10,
    },
};

const c = new createWordList(settings);
