import { createContext, FC, ReactNode, useContext, useState } from 'react';
import { EndGameContextConfig } from '../../config/contexts/end_game_context_config';

const EndGameContext = createContext<EndGameContextConfig | undefined>(undefined);

export const EndGameProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [isEndGame, setIsEndGame] = useState<boolean>(false);

    const toggleEndGameMenu = () => {
        setIsEndGame(prev => !prev);
    };

    return (
        <EndGameContext.Provider value={{ isEndGame, toggleEndGameMenu }}>
            {children}
        </EndGameContext.Provider>
    );
};

export const useEndGameContext = () => {
    const context = useContext(EndGameContext);
    if (context === undefined) {
        throw new Error('Trying to reach end game menu context outside of provider');
    }
    return context;
};