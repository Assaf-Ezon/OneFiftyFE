import { createContext, FC, ReactNode, useContext, useState } from 'react';

//interfaces for dictionaries
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

interface WordsDictionary {
    WordCount: number;
    Words: Words;
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

// new words dictionaries interface
interface NewWords {
    [groupId: number]: { 
        [word: string]: WordDetails 
    }
}

interface WordsContextProps {
    hebrewWords: WordsDictionary,
    setHebrewWords: (words: WordsDictionary) => void;

    englishWords: WordsDictionary,
    setEnglishWords: (words: WordsDictionary) => void;

    hebrewUserStatistics: UserStatistics,
    setHebrewUserStatistics: (words: UserStatistics) => void;

    englishUserStatistics: UserStatistics,
    setEnglishUserStatistics: (words: UserStatistics) => void;

    hebrewNewWords: NewWords;
    updateNewHebrewWords: () => void;

    englishNewWords: NewWords;
    updateNewEnglishWords: () => void;
};

export const WordsContext = createContext<WordsContextProps | undefined>(undefined);

export const WordsProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [hebrewWords, setHebrewWords] = useState<WordsDictionary>({} as WordsDictionary);
    const [englishWords, setEnglishWords] = useState<WordsDictionary>({} as WordsDictionary);

    const [hebrewUserStatistics, setHebrewUserStatistics] = useState<UserStatistics>({} as UserStatistics);
    const [englishUserStatistics, setEnglishUserStatistics] = useState<UserStatistics>({} as UserStatistics);

    const _getNewWords = (fullDict: WordsDictionary, statistics: UserStatistics) => {
        const newWords: { [groupId: number]: { [word: string]: WordDetails } } = {}; 
    
        for (const [groupKey, groupValue] of Object.entries(fullDict.Words)) {
            const newGroupWords: { [word: string]: WordDetails } = {};
            
            const groupId = Number(groupKey);
    
            if (groupId in statistics.WordsStatistics.Words) {
                for (const [wordsKey, wordsValue] of Object.entries(groupValue)) {
                    if (!(wordsKey in statistics.WordsStatistics.Words[groupId])) {
                        newGroupWords[wordsKey] = wordsValue;
                    }
                }
                newWords[groupId] = newGroupWords;
            } else {
                newWords[groupId] = groupValue;
            }
        }
        console.log(newWords);
        return newWords;
    };

    const [hebrewNewWords, setHebrewNewWords] = useState<NewWords>({} as NewWords);

    const updateNewHebrewWords = () => {
        setHebrewNewWords(_getNewWords(hebrewWords, hebrewUserStatistics));
    };

    const [englishNewWords, setEnglishNewWords] = useState<NewWords>({} as NewWords);

    const updateNewEnglishWords = () => {
        setEnglishNewWords(_getNewWords(englishWords, englishUserStatistics));
    };

    return (
        <WordsContext.Provider value={{ 
            hebrewWords, 
            setHebrewWords, 

            englishWords, 
            setEnglishWords, 

            hebrewUserStatistics, 
            setHebrewUserStatistics, 

            englishUserStatistics, 
            setEnglishUserStatistics,

            hebrewNewWords,
            updateNewHebrewWords,

            englishNewWords,
            updateNewEnglishWords,
        }}>
            {children}
        </WordsContext.Provider>
    );
};

export const useWords = () => {
    const context = useContext(WordsContext);
    if (!context) {
      throw new Error('Trying to reach words context outside of words provider');
    }
    return context;
};