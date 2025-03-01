import { ImageSourcePropType } from "react-native";

export type ContextProfileData = {
    name: string,
    email: string,
    rank: number,
    score: number,
    dateJoined: Date,
    expirationDate: Date,
    profileImage: ImageSourcePropType,
    isTrial: boolean,
    lastTermsOfServiceApproval: Date,
};