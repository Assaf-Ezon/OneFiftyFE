import { createContext, FC, ReactNode, useContext, useState } from 'react';

interface StackMangerContextProps {
    stackIndex: number;
    setStackIndex: React.Dispatch<React.SetStateAction<number>>;
}

const StackManagerContext = createContext<StackMangerContextProps | undefined>(undefined);

export const StackManagerProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [stackIndex, setStackIndex] = useState<number>(1);

    return (
        <StackManagerContext.Provider value={{ stackIndex, setStackIndex }}>
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