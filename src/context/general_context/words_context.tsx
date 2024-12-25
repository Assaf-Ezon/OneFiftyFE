import { createContext, FC, ReactNode, useContext, useState } from 'react';

import { FullWordsDictionary } from '../../Dataobjects/Words/DIctionary/FullWordsDictionary';
import { UserStatistics } from '../../Dataobjects/Words/Statistics/UserStatistics';
import { WordDetails } from '../../Dataobjects/Words/BasicDataObjects/WordDetails';
import { NewWords } from '../../Dataobjects/Words/NewWordsDict/NewWords';
import { WordsContextProps } from '../../Config/Contexts/WordsContextProps';


export const WordsContext = createContext<WordsContextProps | undefined>(undefined);

export const WordsProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [hebrewWords, setHebrewWords] = useState<FullWordsDictionary>({} as FullWordsDictionary);
    const [englishWords, setEnglishWords] = useState<FullWordsDictionary>({} as FullWordsDictionary);

    const [hebrewUserStatistics, setHebrewUserStatistics] = useState<UserStatistics>({} as UserStatistics);
    const [englishUserStatistics, setEnglishUserStatistics] = useState<UserStatistics>({} as UserStatistics);

    // remaining new words calculation
    const _getNewWords = (fullDict: FullWordsDictionary, statistics: UserStatistics): { [groupId: number]: { [word: string]: WordDetails } } => {
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