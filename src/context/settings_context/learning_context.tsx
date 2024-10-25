import { createContext, FC, ReactNode, useContext, useState } from 'react';

interface Settings {
    smartStudy: boolean;
    language: string | null;
    levels: [number, boolean][];
}

interface LearningSettingsContextProps {
    isLearningSettingOpen: boolean;
    toggleLearningSettings: () => void;
    settings: Settings;
    setSettings: (settings: Settings) => void;
}

const LearningSettingsContext = createContext<LearningSettingsContextProps | undefined>(undefined);

export const LearningSettingsProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [isLearningSettingOpen, setIsLearningSettingOpen] = useState<boolean>(false);

    const toggleLearningSettings = () => {
        setIsLearningSettingOpen(prev => !prev);
    };

    const [settings, setSettings] = useState<Settings>({smartStudy: true, language: null, 
        levels: [
            [1, false],
            [2, false],
            [3, false],
            [4, false],
            [5, false],
            [6, false],
            [7, false],
            [8, false],
            [9, false],
            [10, false],
        ]});

    return (
        <LearningSettingsContext.Provider value={{ isLearningSettingOpen, toggleLearningSettings, settings, setSettings }}>
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