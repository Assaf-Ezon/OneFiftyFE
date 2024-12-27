import { createContext, FC, ReactNode, useContext, useState } from 'react';
import { SidebarContextConfig } from '../../config/contexts/sidebar_context_config';

const SidebarContext = createContext<SidebarContextConfig | undefined>(undefined);

export const SidebarProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggleMenu = () => {
        setIsOpen(prev => !prev);
    };

    return (
        <SidebarContext.Provider value={{ isOpen, toggleMenu }}>
            {children}
        </SidebarContext.Provider>
    );
};

export const useSidebarContext = () => {
    const context = useContext(SidebarContext);
    if (context === undefined) {
        throw new Error('Trying to reach sidebar context outside of provider');
    }
    return context;
};