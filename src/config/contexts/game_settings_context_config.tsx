import { GameSettings } from "../../data_objects/contexts/game_settings";

export interface GameSettingsContextConfig {
    isLearningSettingOpen: boolean;
    toggleLearningSettings: () => void;
    settings: GameSettings;
    updateCheckboxes: (smart: boolean, n: boolean, incorect: boolean, practice: boolean) => void
    updateLevel: (level: number, value: number) => void;
    updateLanguage: (lang: string | null) => void;
    generateRandomNumbers: () => void;
    isSettingsFilled: () => boolean;
}