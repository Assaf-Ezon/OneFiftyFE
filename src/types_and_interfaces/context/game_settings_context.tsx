export type Settings = {
    shouldIncludeNewWords: boolean;
    shouldIncludeIncorrectWords: boolean;
    shouldIncludePracticeWords: boolean;
    shouldIncludeSmartStudy: boolean;
    language: string | null;
    levels: { [key: number]: number };
}

export interface LearningSettingsContextProps {
    isLearningSettingOpen: boolean;
    toggleLearningSettings: () => void;
    settings: Settings;
    updateCheckboxes: (smart: boolean, n: boolean, incorect: boolean, practice: boolean) => void
    updateLevel: (level: number, value: number) => void;
    updateLanguage: (lang: string | null) => void;
    generateRandomNumbers: () => void;
    getFlagsCount : () => number;
}