import { createContext, FC, ReactNode, useState } from 'react';

interface Profile {
    name: string,
    email: string,
    dateJoined: Date,
    expirationDate: Date,
};

interface ProfileContextProps {
    profile: Profile | null;
    setProfile: (profile: Profile | null) => void;
};

const ProfileContext = createContext<ProfileContextProps | undefined>(undefined);

export const ProfileProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [profile, setProfile] = useState<Profile | null>(null);

    return (
        <ProfileContext.Provider value={{ profile, setProfile }}>
            {children}
        </ProfileContext.Provider>
    );
};