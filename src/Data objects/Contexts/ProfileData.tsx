import { ImageSourcePropType } from "react-native";

export type ProfileData = {
    name: string,
    email: string,
    rank: number,
    score: number,
    dateJoined: Date,
    expirationDate: Date,
    profileImage: ImageSourcePropType,
    trial: boolean,
};