import { createContext, FC, ReactNode, useContext, useState } from 'react';
import { ImageSourcePropType } from 'react-native';

interface ProfileImageContextProps {
    isProfileImageMenuOpen: boolean;
    toggleProfileImageMenu: () => void;
    imageIndex: number | null;
    setImageIndex: (image: number) => void;
}

const ProfileImageContext = createContext<ProfileImageContextProps | undefined>(undefined);

export const ProfileImageProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [isProfileImageMenuOpen, setIsProfileImageMenuOpen] = useState<boolean>(false);

    const toggleProfileImageMenu = () => {
        setIsProfileImageMenuOpen(prev => !prev);
    };

    const [imageIndex, setImageIndex] = useState<number | null>(null);

    return (
        <ProfileImageContext.Provider value={{ isProfileImageMenuOpen, toggleProfileImageMenu, imageIndex, setImageIndex }}>
            {children}
        </ProfileImageContext.Provider>
    );
};

export const useProfileImageMenuContext = () => {
    const context = useContext(ProfileImageContext);
    if (context === undefined) {
        throw new Error('Trying to reach profile image popup context outside of provider');
    }
    return context;
};