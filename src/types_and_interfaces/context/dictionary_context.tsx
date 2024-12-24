export type DictionarySettings = {
    language: string;
    level: number; 
};

export interface SettingsContextProps {
    settings: DictionarySettings;
    setSettings: (settings: DictionarySettings) => void;
};