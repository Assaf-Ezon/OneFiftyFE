import { createContext, FC, ReactNode, useContext, useState } from 'react';

interface Profile {
    name: string,
    email: string,
    rank: number,
    score: number,
    dateJoined: Date,
    expirationDate: Date,
};

interface ProfileContextProps {
    profile: Profile | null;
    setProfile: (profile: Profile | null) => void;
};

export const ProfileContext = createContext<ProfileContextProps | undefined>(undefined);

export const ProfileProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [profile, setProfile] = useState<Profile | null>({name: 'אסף איזון', email: 'assafezon@gmail.com', rank: 1, score: 100, dateJoined: new Date('2024-08-20'), expirationDate: new Date('2025-08-20')});

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