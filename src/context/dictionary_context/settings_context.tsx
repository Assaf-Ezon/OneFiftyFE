import { createContext, FC, ReactNode, useContext, useState } from 'react';

interface Settings {
    language: string;
    level: number; 
};

interface SettingsContextProps {
    settings: Settings;
    setSettings: (settings: Settings) => void;
};

export const SettingsContext = createContext<SettingsContextProps | undefined>(undefined);

export const SettingsProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [settings, setSettings] = useState<Settings>({language: '', level: -1});

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