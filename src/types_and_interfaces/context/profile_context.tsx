import { ImageSourcePropType } from "react-native";

export type Profile = {
    name: string,
    email: string,
    rank: number,
    score: number,
    dateJoined: Date,
    expirationDate: Date,
    profileImage: ImageSourcePropType,
    trial: boolean,
};

export interface ProfileContextProps {
    profile: Profile;
    setProfile: (profile: Profile) => void;
    updateProfileImage: (newImage: ImageSourcePropType) => void;
    updateRank: (rank: number) => void;
    IsInTrail: (dateJoined: string, expirationDate: string) => boolean;
};