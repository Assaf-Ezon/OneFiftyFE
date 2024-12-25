import { WordStatisticsData } from "../basic_data_objects/word_statistics_data";

// wrapper for the words dict in statitistics dicts
export type WordsStatistics = {
    WordCount: number;
    Words: { [key: number]: { [word: string]: WordStatisticsData } };
}
