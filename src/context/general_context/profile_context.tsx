import { createContext, FC, ReactNode, useContext, useState } from 'react';
import { ImageSourcePropType } from 'react-native';
import { IMAGES } from '../../image_handler';

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

interface Profile {
    name: string,
    email: string,
    rank: number,
    score: number,
    dateJoined: Date,
    expirationDate: Date,
    profileImage: ImageSourcePropType,
    trial: boolean,
};

interface ProfileContextProps {
    profile: Profile;
    setProfile: (profile: Profile) => void;
    updateProfileImage: (newImage: ImageSourcePropType) => void;
    updateRank: (rank: number) => void;
    isWithin3Days: (dateJoined: string, expirationDate: string) => boolean;
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
        profileImage: IMAGES.profile_images[0],
        trial: false,
    });

    const updateProfileImage = (newImage: ImageSourcePropType) => {
        setProfile((prevProfile) => ({
            ...prevProfile,
            profileImage: newImage,
        }));
    };

    const updateRank = (rank: number) => {
        setProfile((prevProfile) => ({
            ...prevProfile,
            rank: rank,
        }));
    };

    const isWithin3Days = (dateJoined: string, expirationDate: string): boolean => {
        const joined: Date = new Date(dateJoined);
        const expiration: Date = new Date(expirationDate);
    
        if (isNaN(joined.getTime()) || isNaN(expiration.getTime())) {
            throw new Error("Invalid date format");
        }
    
        const joinedTimestamp: number = joined.getTime();
        const expirationTimestamp: number = expiration.getTime();
    
        const differenceInMs: number = expirationTimestamp - joinedTimestamp;
    
        const maxDifferenceInMs: number = (3 * DAY) + (MINUTE);
    
        return differenceInMs <= maxDifferenceInMs;
    }

    return (
        <ProfileContext.Provider value={{ profile, setProfile, updateProfileImage, updateRank, isWithin3Days }}>
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