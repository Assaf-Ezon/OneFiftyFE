import { ImageSourcePropType } from "react-native";
import { ProfileData } from "../../data_objects/contexts/profile_data";

export interface ProfileContextConfig {
    profile: ProfileData;
    setProfile: (profile: ProfileData) => void;
    updateProfileImage: (newImage: ImageSourcePropType) => void;
    updateRank: (rank: number) => void;
    IsInTrail: (dateJoined: string, expirationDate: string) => boolean;
};