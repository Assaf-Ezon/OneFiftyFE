import { createContext, FC, ReactNode, useContext, useState } from 'react';
import { LeaveGameContextConfig } from '../../config/contexts/leave_game_context_config';

const LeaveGameContext = createContext<LeaveGameContextConfig | undefined>(undefined);

export const LeaveGameProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [isLeaveGame, setIsLeaveGame] = useState<boolean>(false);

    const toggleLeaveGameMenu = () => {
        setIsLeaveGame(prev => !prev);
    };

    return (
        <LeaveGameContext.Provider value={{ isLeaveGame, toggleLeaveGameMenu }}>
            {children}
        </LeaveGameContext.Provider>
    );
};

export const useLeaveGameContext = () => {
    const context = useContext(LeaveGameContext);
    if (context === undefined) {
        throw new Error('Trying to reach leave game menu context outside of provider');
    }
    return context;
};