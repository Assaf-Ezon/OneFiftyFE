import { ImageSourcePropType } from "react-native";

export type GameCardConfig = {
    id: number;
    image: ImageSourcePropType;
    title: string;
    description: string;
    gameName: string;
}