import { createContext, FC, ReactNode, useContext, useState } from 'react';

interface Settings {
    newWords: boolean;
    incorrectWords: boolean;
    practiceWords: boolean;
    smartStudy: boolean;
    language: string | null;
    levels: { [key: number]: number };
}

interface LearningSettingsContextProps {
    isLearningSettingOpen: boolean;
    toggleLearningSettings: () => void;
    settings: Settings;
    updateCheckboxes: (smart: boolean, n: boolean, incorect: boolean, practice: boolean) => void
    updateLevel: (level: number, value: number) => void;
    updateLanguage: (lang: string | null) => void;
    generateRandomNumbers: () => void;
}

const LearningSettingsContext = createContext<LearningSettingsContextProps | undefined>(undefined);

export const LearningSettingsProvider: FC<{ children: ReactNode }> = ({ children }) => {
    // popup open flag
    const [isLearningSettingOpen, setIsLearningSettingOpen] = useState<boolean>(false);

    // set flag
    const toggleLearningSettings = () => {
        setIsLearningSettingOpen(prev => !prev);
    };

    // use state of the settings
    const [settings, setSettings] = useState<Settings>({newWords: false, incorrectWords: false, practiceWords: false, smartStudy: false, language: null,
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

    //update checkboxes
    const updateCheckboxes = (smart: boolean, n: boolean, incorect: boolean, practice: boolean) => {
        setSettings((prevState: Settings) => ({
            ...prevState, 
            smartStudy: smart,
            newWords: n,
            incorrectWords: incorect,
            practiceWords: practice,
        }));
    };

    //update levels
    const updateLevel = (level: number, value: number) => {
        setSettings((prevState: Settings) => ({
            ...prevState, 
            levels: {
                ...prevState.levels,
                [level]: value, 
            },
        }));
    };

    //update language
    const updateLanguage = (lang: string | null) => {
        setSettings((prevState: Settings) => ({
            ...prevState, 
            language: lang,
        }));
    };

    // generate random words per level
    const generateRandomNumbers = () => {
        let total = 0;

        while (total < 100) {
            const index = Math.floor(Math.random() * 10);

            const maxAddable = Math.min(50 - settings.levels[index], 100 - total);

            const randomValue = Math.floor(Math.random() * maxAddable) + 1;
            updateLevel(index, randomValue);

            total += randomValue;
        }
    };

    return (
        <LearningSettingsContext.Provider value={{ isLearningSettingOpen, toggleLearningSettings, settings, updateCheckboxes, updateLevel, updateLanguage, generateRandomNumbers }}>
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