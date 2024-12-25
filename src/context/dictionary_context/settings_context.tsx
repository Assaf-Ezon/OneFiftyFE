import { createContext, FC, ReactNode, useContext, useState } from 'react';

import { SettingsContextConfig } from '../../config/contexts/settings_context_config';
import { DictionarySettings } from '../../data_objects/contexts/dictionary_page_settings';

export const SettingsContext = createContext<SettingsContextConfig | undefined>(undefined);

export const SettingsProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [settings, setSettings] = useState<DictionarySettings>({language: '', level: -1});

    return (
        <SettingsContext.Provider value={{ settings, setSettings }}>
            {children}
        </SettingsContext.Provider>
    );
};

export const useSettings = () => {
    const context = useContext(SettingsContext);
    if (!context) {
      throw new Error('Trying to reach dictionary settings context outside of provider');
    }
    return context;
};