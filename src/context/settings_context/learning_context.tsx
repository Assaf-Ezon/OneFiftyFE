import { createContext, FC, ReactNode, useContext, useState } from 'react';

interface LearningSettingsContextProps {
    isLearningSettingOpen: boolean;
    toggleLearningSettings: () => void;
}

const LearningSettingsContext = createContext<LearningSettingsContextProps | undefined>(undefined);

export const LearningSettingsProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [isLearningSettingOpen, setIsLearningSettingOpen] = useState(false);

    const toggleLearningSettings = () => {
        setIsLearningSettingOpen(prev => !prev);
    };

    return (
        <LearningSettingsContext.Provider value={{ isLearningSettingOpen, toggleLearningSettings }}>
            {children}
        </LearningSettingsContext.Provider>
    );
};

export const useLearningSettingsContext = () => {
    const context = useContext(LearningSettingsContext);
    if (context === undefined) {
        throw new Error('not initialized learning settings toggle');
    }
    return context;
};