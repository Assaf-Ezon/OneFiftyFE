import { ImageSourcePropType } from "react-native";

export type SideBarIconProp = {
    iconPath: ImageSourcePropType;
    iconText: string;
    isRed: boolean;
    onPressActionIndex: number;
    screenName: string;   
};