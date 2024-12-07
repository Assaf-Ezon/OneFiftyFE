import { createContext, FC, ReactNode, useContext, useState } from 'react';

interface StackMangerContextProps {
    stackIndex: number;
    setStackIndexByName: (name: string) => void;
}

const StackManagerContext = createContext<StackMangerContextProps | undefined>(undefined);

export const StackManagerProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [stackIndex, setStackIndex] = useState<number>(1);

    const names: { [key: string]: number } = {
        'auth': 1,
        'main': 2,
        'inactive': 3
    }

    const setStackIndexByName = (name: string) => {
        setStackIndex(names[name]);
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