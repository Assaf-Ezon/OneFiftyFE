import { ImageSourcePropType } from "react-native";

export type BottomBarConfig = {
    activeScreen: string;
    homePath: ImageSourcePropType;
    dictionaryPath: ImageSourcePropType;
    learningPath: ImageSourcePropType;
    leaderboardPath: ImageSourcePropType;
    profilePath: ImageSourcePropType;
};