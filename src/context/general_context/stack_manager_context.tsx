import { createContext, FC, ReactNode, useContext, useState } from 'react';

export enum StackNames {
    Auth = 1,
    Main = 2,
    Inactive = 3,
}

interface StackMangerContextProps {
    stackIndex: number;
    setStackIndexByName: (name: StackNames) => void;
}

const StackManagerContext = createContext<StackMangerContextProps | undefined>(undefined);

export const StackManagerProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [stackIndex, setStackIndex] = useState<number>(1);

    const setStackIndexByName = (name: StackNames) => {
        setStackIndex(name);
    }

    return (
        <StackManagerContext.Provider value={{ stackIndex, setStackIndexByName }}>
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