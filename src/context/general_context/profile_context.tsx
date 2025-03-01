import { createContext, FC, ReactNode, useContext, useState } from 'react';
import { ImageSourcePropType } from 'react-native';
import { IMAGES } from '../../image_handler';

import { ProfileContextConfig } from '../../config/contexts/profile_context_config';
import { ContextProfileData } from '../../data_objects/contexts/profile_data';

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

export const ProfileContext = createContext<ProfileContextConfig | undefined>(undefined);

export const ProfileProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [profile, setProfile] = useState<ContextProfileData>({
        name: '', 
        email: '', 
        rank: 0, 
        score: 0, 
        dateJoined: new Date('1900-01-01'), 
        expirationDate: new Date('1900-01-01'), 
        profileImage: IMAGES.profile_images[0],
        isTrial: false,
        lastTermsOfServiceApproval: new Date('1900-01-01'),
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

    const updateScore = (score: number) => {
        setProfile((prevProfile) => ({
            ...prevProfile,
            score: prevProfile.score + score,
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

    const [isTermsAndServicesValidation, setIsTermsAndServicesValidation] = useState<boolean>(false);

    return (
        <ProfileContext.Provider value={{ profile, setProfile, updateProfileImage, updateRank, updateScore, IsInTrail, isTermsAndServicesValidation, setIsTermsAndServicesValidation }}>
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