import { ImageSourcePropType } from "react-native";

export type LeaderBoardCardProp = {
    name: string,
    score: number,
    rank: number,
    image: ImageSourcePropType;
};