import { createContext, FC, ReactNode, useContext, useState } from 'react';
import { GameErrorContextConfig } from '../../config/contexts/game_error_context_config';

const GameErrorContext = createContext<GameErrorContextConfig | undefined>(undefined);

export const GameErrorProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [isGameError, setIsGameError] = useState<boolean>(false);

    const toggleGameErrorMenu = () => {
        setIsGameError(prev => !prev);
    };

    return (
        <GameErrorContext.Provider value={{ isGameError, toggleGameErrorMenu }}>
            {children}
        </GameErrorContext.Provider>
    );
};

export const useGameErrorContext = () => {
    const context = useContext(GameErrorContext);
    if (context === undefined) {
        throw new Error('Trying to reach game error menu context outside of provider');
    }
    return context;
};