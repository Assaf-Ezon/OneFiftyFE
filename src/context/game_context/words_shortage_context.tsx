import { createContext, FC, ReactNode, useContext, useState } from 'react';
import { WordsShortageContextConfig } from '../../config/contexts/words_shortage_context_config';

const WordsShortageContext = createContext<WordsShortageContextConfig | undefined>(undefined);

export const WordsShortageProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [isMenuShown, setIsMenuShown] = useState<boolean>(false);
    const [isWordsShortage, setIsWordsShortage] = useState<boolean>(false);
    const [wordsShortage, setWordsShortage] = useState<{ [groupId: string]: string[] }>({});

    return (
        <WordsShortageContext.Provider value={{ isMenuShown, setIsMenuShown, isWordsShortage, setIsWordsShortage, wordsShortage, setWordsShortage }}>
            {children}
        </WordsShortageContext.Provider>
    );
};

export const useWordsShortageContext = () => {
    const context = useContext(WordsShortageContext);
    if (context === undefined) {
        throw new Error('Trying to reach words shortage context outside of provider');
    }
    return context;
};