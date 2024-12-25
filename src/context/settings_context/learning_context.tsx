import { createContext, FC, ReactNode, useContext, useState } from 'react';

import { GameSettingsContextProps } from '../../Config/Contexts/GameSettingsContextProps';
import { Settings } from '../../Dataobjects/Contexts/GameSettings';

const LearningSettingsContext = createContext<GameSettingsContextProps | undefined>(undefined);

export const LearningSettingsProvider: FC<{ children: ReactNode }> = ({ children }) => {
    // popup open flag
    const [isLearningSettingOpen, setIsLearningSettingOpen] = useState<boolean>(false);

    // set flag
    const toggleLearningSettings = () => {
        setIsLearningSettingOpen(prev => !prev);
    };

    // use state of the settings
    const [settings, setSettings] = useState<Settings>({shouldIncludeNewWords: false, shouldIncludeIncorrectWords: false, shouldIncludePracticeWords: false, shouldIncludeSmartStudy: false, language: null,
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
            shouldIncludeSmartStudy: smart,
            shouldIncludeNewWords: n,
            shouldIncludeIncorrectWords: incorect,
            shouldIncludePracticeWords: practice,
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
        setSettings((prevState: Settings) => ({
            ...prevState,
            levels: Object.keys(prevState.levels).reduce((acc, key) => {
                acc[Number(key)] = 0;
                return acc;
            }, {} as { [key: number]: number }),
        }));
    };

    const getFlagsCount = () => {
        let count = 0;

        count += Number(settings.shouldIncludeNewWords);
        count += Number(settings.shouldIncludeIncorrectWords);
        count += Number(settings.shouldIncludePracticeWords);
        count += Number(settings.shouldIncludeSmartStudy);

        return count;
    }

    return (
        <LearningSettingsContext.Provider value={{ isLearningSettingOpen, toggleLearningSettings, settings, updateCheckboxes, updateLevel, updateLanguage, generateRandomNumbers, getFlagsCount }}>
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