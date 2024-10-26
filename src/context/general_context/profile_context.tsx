import { createContext, FC, ReactNode, useContext, useState } from 'react';
import { ImageSourcePropType } from 'react-native';
import { IMAGES } from '../../image_handler';

interface Profile {
    name: string,
    email: string,
    rank: number,
    score: number,
    dateJoined: Date,
    expirationDate: Date,
    profileImage: ImageSourcePropType,
};

interface ProfileContextProps {
    profile: Profile;
    setProfile: (profile: Profile) => void;
};

export const ProfileContext = createContext<ProfileContextProps | undefined>(undefined);

export const ProfileProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [profile, setProfile] = useState<Profile>({name: 'אסף איזון', email: 'assafezon@gmail.com', rank: 1, score: 100, dateJoined: new Date('2024-08-20'), expirationDate: new Date('2025-08-20'), profileImage: IMAGES[10]});

    return (
        <ProfileContext.Provider value={{ profile, setProfile }}>
            {children}
        </ProfileContext.Provider>
    );
};

export const useProfile = () => {
    const context = useContext(ProfileContext);
    if (!context) {
      throw new Error('user information is empty!');
    }
    return context;
};