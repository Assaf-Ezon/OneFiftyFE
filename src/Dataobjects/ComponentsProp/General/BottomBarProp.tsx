import { ImageSourcePropType } from "react-native";

export type BottomBarProp = {
    activeScreen: string;
    homePath: ImageSourcePropType;
    dictionaryPath: ImageSourcePropType;
    learningPath: ImageSourcePropType;
    leaderboardPath: ImageSourcePropType;
    profilePath: ImageSourcePropType;
};