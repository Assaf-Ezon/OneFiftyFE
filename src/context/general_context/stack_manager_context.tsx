import { createContext, FC, ReactNode, useContext, useState } from 'react';
import { Screens } from '../../screen_names';
import AuthenticationHandler from '../../screens/AuthenticationHandler';

export enum StackNames {
    Auth = 1,
    Main = 2,
    Inactive = 3,
}

interface StackMangerContextProps {
    stackIndex: number;
    setStackIndexByName: (name: StackNames) => void;
    authStackInitialRouteName: string;
    handleLogout: () => void;
    handleInactive: () => void;
}

const StackManagerContext = createContext<StackMangerContextProps | undefined>(undefined);

export const StackManagerProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const authInstance = AuthenticationHandler.getInstance();
    
    const [stackIndex, setStackIndex] = useState<number>(1);
    const [authStackInitialRouteName, setAuthStackInitialRouteName] = useState<string>(Screens.SPLASH);

    const setStackIndexByName = (name: StackNames) => {
        setStackIndex(name);
    }

    const handleLogout = async () => {
        await authInstance.logout();
        setAuthStackInitialRouteName(Screens.START);
        setStackIndexByName(StackNames.Auth);
    }

    const handleInactive = async () => {
        setStackIndexByName(StackNames.Inactive);
    }

    return (
        <StackManagerContext.Provider value={{ stackIndex, setStackIndexByName, authStackInitialRouteName, handleLogout, handleInactive }}>
            {children}
        </StackManagerContext.Provider>
    );
};

export const useStackManagerContext = () => {
    const context = useContext(StackManagerContext);
    if (context === undefined) {
        throw new Error('Trying to reach stack manager context outside of stack navigation!');
    }
    return context;
};