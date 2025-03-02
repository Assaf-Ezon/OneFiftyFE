import { ImageSourcePropType } from "react-native";
import { ContextProfileData } from "../../data_objects/contexts/profile_data";

export interface ProfileContextConfig {
    profile: ContextProfileData;
    setProfile: (profile: ContextProfileData) => void;
    updateProfileImage: (newImage: ImageSourcePropType) => void;
    updateRank: (rank: number) => void;
    updateScore: (score: number) => void;
    IsInTrail: (dateJoined: string, expirationDate: string) => boolean;
    isTermsAndServicesValidation: boolean;
    setIsTermsAndServicesValidation: (validate: boolean) => void;
};