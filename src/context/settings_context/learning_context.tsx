import { createContext, FC, ReactNode, useContext, useState } from 'react';

import { GameSettingsContextConfig } from '../../config/contexts/game_settings_context_config';
import { GameSettings } from '../../data_objects/contexts/game_settings';

const LearningSettingsContext = createContext<GameSettingsContextConfig | undefined>(undefined);

export const LearningSettingsProvider: FC<{ children: ReactNode }> = ({ children }) => {
    // popup open flag
    const [isLearningSettingOpen, setIsLearningSettingOpen] = useState<boolean>(false);

    // set flag
    const toggleLearningSettings = () => {
        setIsLearningSettingOpen(prev => !prev);
    };

    // use state of the settings
    const [settings, setSettings] = useState<GameSettings>({
        shouldIncludeNewWords: false, 
        shouldIncludeIncorrectWords: false, 
        shouldIncludePracticedwords: false, 
        shouldIncludeSmartStudy: false, 
        language: null,
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
    const updateCheckboxes = (shouldIncludeSmartCheckbox: boolean, shouldIncludeNewCheckbox: boolean, shouldIncludeIncorrectCheckbox: boolean, shouldIncludePracticeCheckbox: boolean) => {
        setSettings((prevState: GameSettings) => ({
            ...prevState, 
            shouldIncludeSmartStudy: shouldIncludeSmartCheckbox,
            shouldIncludeNewWords: shouldIncludeNewCheckbox,
            shouldIncludeIncorrectWords: shouldIncludeIncorrectCheckbox,
            shouldIncludePracticedwords: shouldIncludePracticeCheckbox,
        }));
    };

    //update levels
    const updateLevel = (level: number, value: number) => {
        setSettings((prevState: GameSettings) => ({
            ...prevState, 
            levels: {
                ...prevState.levels,
                [level]: value, 
            },
        }));
    };

    //update language
    const updateLanguage = (lang: string | null) => {
        setSettings((prevState: GameSettings) => ({
            ...prevState, 
            language: lang,
        }));
    };

    const generateRandomNumbers = () => {
        _resetLevels();

        const randomDictionary = Array.from({ length: 10 }, (_, i) => i + 1).reduce<Record<number, boolean>>((dict, key) => {
            dict[key] = Math.random() < 0.5;
            return dict;
        }, {});

        const trueCount = Object.values(randomDictionary).filter(value => value).length;

        Object.entries(randomDictionary).filter(([key, value]) => value).forEach(([key]) => {
            const randomValue = Math.floor(Math.random() * (100/trueCount)) + 1;
            updateLevel(Number(key), randomValue);
        });
    }

    const _resetLevels = () => {
        setSettings((prevState: GameSettings) => ({
            ...prevState,
            levels: Object.keys(prevState.levels).reduce((acc, key) => {
                acc[Number(key)] = 0;
                return acc;
            }, {} as { [groupId: number]: number }),
        }));
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