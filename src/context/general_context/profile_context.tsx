import { createContext, FC, ReactNode, useContext, useState } from 'react';
import { ImageSourcePropType } from 'react-native';
import { IMAGES } from '../../image_handler';

import { ProfileContextProps } from '../../Config/Contexts/ProfileContextProps';
import { ProfileData } from '../../Data objects/Contexts/ProfileData';

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

export const ProfileContext = createContext<ProfileContextProps | undefined>(undefined);

export const ProfileProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [profile, setProfile] = useState<ProfileData>({
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

    const IsInTrail = (dateJoined: string, expirationDate: string): boolean => {
        const joined: Date = new Date(dateJoined);
        const expiration: Date = new Date(expirationDate);
    
        if (isNaN(joined.getTime()) || isNaN(expiration.getTime())) {
            throw new Error("Invalid date format");
        }
    
        const joinedTimestamp: number = joined.getTime();
        const expirationTimestamp: number = expiration.getTime();
    
        const differenceInMs: number = expirationTimestamp - joinedTimestamp;
    
        const maxDifferenceInMs: number = (3 * DAY) + (12 * HOUR);
    
        return differenceInMs <= maxDifferenceInMs;
    }

    return (
        <ProfileContext.Provider value={{ profile, setProfile, updateProfileImage, updateRank, IsInTrail }}>
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