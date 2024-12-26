import { DictionarySettings } from "../../data_objects/contexts/dictionary_page_settings";

export interface DictionaryConfigContextConfig {
    settings: DictionarySettings;
    setSettings: (settings: DictionarySettings) => void;
};