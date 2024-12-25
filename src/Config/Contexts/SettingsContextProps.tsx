import { DictionarySettings } from "../../Data objects/Contexts/DictionaryPageSettings";

export interface SettingsContextProps {
    settings: DictionarySettings;
    setSettings: (settings: DictionarySettings) => void;
};