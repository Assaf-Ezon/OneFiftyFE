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

interface WordsContextProps {
    hebrewWords: WordsDictionary | {},
    englishWords: WordsDictionary | {},
    hebrewUserStatistics: UserStatistics | {},
    englishUserStatistics: UserStatistics | {},
};

export const WordsContext = createContext<WordsContextProps | undefined>(undefined);

export const WordsProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [hebrewWords, setHebrewWords] = useState<WordsDictionary | {}>({});
    const [englishWords, setEnglishWords] = useState<WordsDictionary | {}>({});
    const [hebrewUserStatistics, setHebrewUserStatistics] = useState<UserStatistics | {}>({});;
    const [englishUserStatistics, setEnglishUserStatistics] = useState<UserStatistics | {}>({});;

    return (
        <WordsContext.Provider value={{ hebrewWords, englishWords, hebrewUserStatistics, englishUserStatistics }}>
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