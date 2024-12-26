import { createContext, FC, ReactNode, useContext, useState } from 'react';

import { UserStatistics } from '../../data_objects/words/statistics/user_statistics';
import { WordDetails } from '../../data_objects/words/basic_data_objects/word_details';
import { Words } from '../../data_objects/words/basic_data_objects/words';
import { WordsContextConfig } from '../../config/contexts/words_context_config';
import { WordsDictionary } from '../../data_objects/words/dIctionary/words_dictionary';

export const WordsContext = createContext<WordsContextConfig | undefined>(undefined);

export const WordsProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [hebrewWords, setHebrewWords] = useState<WordsDictionary>({} as WordsDictionary);
    const [englishWords, setEnglishWords] = useState<WordsDictionary>({} as WordsDictionary);

    const [hebrewUserStatistics, setHebrewUserStatistics] = useState<UserStatistics>({} as UserStatistics);
    const [englishUserStatistics, setEnglishUserStatistics] = useState<UserStatistics>({} as UserStatistics);

    // remaining new words calculation
    const _getNewWords = (fullDict: WordsDictionary, statistics: UserStatistics): { [groupId: number]: { [word: string]: WordDetails } } => {
        const newWords: { [groupId: number]: { [word: string]: WordDetails } } = {}; 
        
        for (const [groupKey, groupValue] of Object.entries(fullDict.Words)) {
            const newGroupWords: { [word: string]: WordDetails } = {};
            
            const key = Number(groupKey);
    
            if (key in statistics.WordsStatistics.Words) {
                for (const [wordsKey, wordsValue] of Object.entries(groupValue)) {
                    if (!(wordsKey in statistics.WordsStatistics.Words[key])) {
                        newGroupWords[wordsKey] = wordsValue;
                    }
                }
                newWords[key] = newGroupWords;
            } else {
                newWords[key] = groupValue;
            }
        }
        return newWords;
    };

    const [hebrewNewWords, setHebrewNewWords] = useState<Words>({} as Words);

    const updateNewHebrewWords = () => {
        setHebrewNewWords(_getNewWords(hebrewWords, hebrewUserStatistics));
    };

    const [englishNewWords, setEnglishNewWords] = useState<Words>({} as Words);

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