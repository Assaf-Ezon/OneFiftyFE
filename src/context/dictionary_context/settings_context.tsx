import { createContext, FC, ReactNode, useContext, useState } from 'react';

interface Settings {
    language: string | null;
    level: number | null; 
};

interface SettingsContextProps {
    settings: Settings | null;
    setSettings: (settings: Settings | null) => void;
};

export const SettingsContext = createContext<SettingsContextProps | undefined>(undefined);

export const SettingsProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [settings, setSettings] = useState<Settings | null>(null);

    return (
        <SettingsContext.Provider value={{ settings, setSettings }}>
            {children}
        </SettingsContext.Provider>
    );
};

export const useSettings = () => {
    const context = useContext(SettingsContext);
    if (!context) {
      throw new Error("Settings aren't set");
    }
    return context;
};