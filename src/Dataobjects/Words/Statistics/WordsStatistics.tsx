import { WordStatisticsData } from "../BasicDataObjects/WordStatisticsData";

// wrapper for the words dict in statitistics dicts
export type WordsStatistics = {
    WordCount: number;
    Words: { [groupId: number]: { [word: string]: WordStatisticsData } };
}
