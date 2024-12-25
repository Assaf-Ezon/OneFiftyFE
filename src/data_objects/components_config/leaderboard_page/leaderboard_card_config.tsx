import { ImageSourcePropType } from "react-native";

export type LeaderBoardCardConfig = {
    name: string,
    score: number,
    rank: number,
    image: ImageSourcePropType;
};