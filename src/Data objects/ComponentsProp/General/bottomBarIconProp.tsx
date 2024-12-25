import { ImageSourcePropType } from "react-native";

export type BottomBarIconProp = {
    iconPath: ImageSourcePropType;
    iconText: string;
    activeScreen: boolean;
    screenName: string;
};