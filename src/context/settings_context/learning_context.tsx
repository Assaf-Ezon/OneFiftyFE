import { createContext, FC, ReactNode, useContext, useState } from 'react';

interface Settings {
    smartStudy: boolean;
    language: string | null;
    levels: { [key: number]: number };
}

interface LearningSettingsContextProps {
    isLearningSettingOpen: boolean;
    toggleLearningSettings: () => void;
    settings: Settings;
    setSettings: (settings: Settings) => void;
    updateLevel: (level: number, value: number) => void;
}

const LearningSettingsContext = createContext<LearningSettingsContextProps | undefined>(undefined);

export const LearningSettingsProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [isLearningSettingOpen, setIsLearningSettingOpen] = useState<boolean>(false);

    const toggleLearningSettings = () => {
        setIsLearningSettingOpen(prev => !prev);
    };

    const [settings, setSettings] = useState<Settings>({smartStudy: true, language: null,
        levels: {
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
            6: 0,
            7: 0,
            8: 0,
            9: 0,
            10: 0,
        },
    });

    const updateLevel = (level: number, value: number) => {
        setSettings((prevState: Settings) => ({
            ...prevState, 
            levels: {
                ...prevState.levels,
                [level]: value, 
            },
        }));
    };

    return (
        <LearningSettingsContext.Provider value={{ isLearningSettingOpen, toggleLearningSettings, settings, setSettings, updateLevel }}>
            {children}
        </LearningSettingsContext.Provider>
    );
};

export const useLearningSettingsContext = () => {
    const context = useContext(LearningSettingsContext);
    if (context === undefined) {
        throw new Error('Trying to reach learning settings outside of provider');
    }
    return context;
};