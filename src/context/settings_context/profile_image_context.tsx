import { createContext, FC, ReactNode, useContext, useState } from 'react';

interface ProfileImageContextProps {
    isProfileImageMenuOpen: boolean;
    toggleProfileImageMenu: () => void;
}

const ProfileImageContext = createContext<ProfileImageContextProps | undefined>(undefined);

export const ProfileImageProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [isProfileImageMenuOpen, setIsProfileImageMenuOpen] = useState<boolean>(false);

    const toggleProfileImageMenu = () => {
        setIsProfileImageMenuOpen(prev => !prev);
    };

    return (
        <ProfileImageContext.Provider value={{ isProfileImageMenuOpen, toggleProfileImageMenu }}>
            {children}
        </ProfileImageContext.Provider>
    );
};

export const useProfileImageMenuContext = () => {
    const context = useContext(ProfileImageContext);
    if (context === undefined) {
        throw new Error('not initialized profile image menu toggle');
    }
    return context;
};