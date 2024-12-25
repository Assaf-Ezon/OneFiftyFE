import { createContext, FC, ReactNode, useContext, useState } from 'react';

import { FullWordsDictionary } from '../../data_objects/words/dictionary/full_words_dictionary';
import { UserStatistics } from '../../data_objects/words/statistics/user_statistics';
import { WordDetails } from '../../data_objects/words/basic_data_objects/word_details';
import { NewWords } from '../../data_objects/words/new_words_dict/new_words';
import { WordsContextConfig } from '../../config/contexts/words_context_config';


export const WordsContext = createContext<WordsContextConfig | undefined>(undefined);

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