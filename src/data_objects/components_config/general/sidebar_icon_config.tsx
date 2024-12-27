import { ImageSourcePropType } from "react-native";

export type SideBarIconConfig = {
    iconPath: ImageSourcePropType;
    iconText: string;
    isRed: boolean;
    onPressActionIndex: number;
    screenName: string;   
};