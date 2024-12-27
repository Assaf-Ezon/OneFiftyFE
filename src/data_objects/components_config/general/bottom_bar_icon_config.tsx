import { ImageSourcePropType } from "react-native";

export type BottomBarIconConfig = {
    iconPath: ImageSourcePropType;
    iconText: string;
    activeScreen: boolean;
    screenName: string;
};