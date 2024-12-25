import { DictionarySettings } from "../../Dataobjects/Contexts/DictionaryPageSettings";

export interface SettingsContextProps {
    settings: DictionarySettings;
    setSettings: (settings: DictionarySettings) => void;
};