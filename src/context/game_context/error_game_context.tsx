import { createContext, FC, ReactNode, useContext, useState } from 'react';
import { ErrorGameContextConfig } from '../../config/error_game_context_config';

const ErrorGameContext = createContext<ErrorGameContextConfig | undefined>(undefined);

export const ErrorGameProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [isErrorGame, setIsErrorGame] = useState<boolean>(false);

    const toggleErrorGameMenu = () => {
        setIsErrorGame(prev => !prev);
    };

    return (
        <ErrorGameContext.Provider value={{ isErrorGame, toggleErrorGameMenu }}>
            {children}
        </ErrorGameContext.Provider>
    );
};

export const useErrorGameContext = () => {
    const context = useContext(ErrorGameContext);
    if (context === undefined) {
        throw new Error('Trying to reach end game menu context outside of provider');
    }
    return context;
};