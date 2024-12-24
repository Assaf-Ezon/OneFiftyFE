import { createContext, FC, ReactNode, useContext, useState } from 'react';
import { DictionarySettings, SettingsContextProps } from '../../types_and_interfaces/context/dictionary_context';

export const SettingsContext = createContext<SettingsContextProps | undefined>(undefined);

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