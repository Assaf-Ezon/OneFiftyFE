import { DictionarySettings } from "../../data_objects/contexts/dictionary_page_settings";

export interface SettingsContextConfig {
    settings: DictionarySettings;
    setSettings: (settings: DictionarySettings) => void;
};