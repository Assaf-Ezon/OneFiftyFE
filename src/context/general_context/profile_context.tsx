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
    updateProfileImage: (newImage: ImageSourcePropType) => void;
};

export const ProfileContext = createContext<ProfileContextProps | undefined>(undefined);

export const ProfileProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [profile, setProfile] = useState<Profile>({
        name: '', 
        email: '', 
        rank: 0, 
        score: 0, 
        dateJoined: new Date('1900-01-01'), 
        expirationDate: new Date('1900-01-01'), 
        profileImage: IMAGES.profile_images[0]}
    );

    const updateProfileImage = (newImage: ImageSourcePropType) => {
        setProfile((prevProfile) => ({
            ...prevProfile,
            profileImage: newImage,
        }));
    };

    return (
        <ProfileContext.Provider value={{ profile, setProfile, updateProfileImage }}>
            {children}
        </ProfileContext.Provider>
    );
};

export const useProfile = () => {
    const context = useContext(ProfileContext);
    if (!context) {
      throw new Error('Trying to reach profile context outside of profile provider');
    }
    return context;
};