import { ImageSourcePropType } from "react-native";
import { ProfileData } from "../../Dataobjects/Contexts/ProfileData";

export interface ProfileContextProps {
    profile: ProfileData;
    setProfile: (profile: ProfileData) => void;
    updateProfileImage: (newImage: ImageSourcePropType) => void;
    updateRank: (rank: number) => void;
    IsInTrail: (dateJoined: string, expirationDate: string) => boolean;
};