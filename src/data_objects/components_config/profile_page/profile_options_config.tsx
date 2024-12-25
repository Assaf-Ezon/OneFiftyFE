import { ImageSourcePropType } from "react-native";

export type ProfileOptionsConfig = {
    image: ImageSourcePropType;
    title: string;
    screenName: string;
    isActive: boolean;
}