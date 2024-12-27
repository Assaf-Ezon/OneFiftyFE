import { ImageSourcePropType } from "react-native";

export type ProfileMenuConfig = {
    image: ImageSourcePropType;
    title: string;
    screenName: string;
    isActive: boolean;
}