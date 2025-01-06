import { ImageSourcePropType } from "react-native";

export type ProfileMenuConfig = {
    image: ImageSourcePropType;
    title: string;
    onPressActionIndex: number;
    screenName: string;
    isActive: boolean;
}