import { createContext, FC, ReactNode, useContext, useState } from 'react';

interface StackMangerContextProps {
    stackIndex: number;
    setStackIndex: React.Dispatch<React.SetStateAction<number>>;
}

const StackMangerContext = createContext<StackMangerContextProps | undefined>(undefined);

export const SidebarProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [stackIndex, setStackIndex] = useState<number>(1);

    return (
        <StackMangerContext.Provider value={{ stackIndex, setStackIndex }}>
            {children}
        </StackMangerContext.Provider>
    );
};

export const useStackManagerContext = () => {
    const context = useContext(StackMangerContext);
    if (context === undefined) {
        throw new Error('Trying to reach stack manager context outside of stack navigation!');
    }
    return context;
};