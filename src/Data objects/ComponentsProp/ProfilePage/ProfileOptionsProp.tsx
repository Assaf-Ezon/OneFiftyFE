import { ImageSourcePropType } from "react-native";

export type ProfileOptionsProp = {
    image: ImageSourcePropType;
    title: string;
    screenName: string;
    isActive: boolean;
}