import { WordsDictionary } from "../../Words/dIctionary/words_dictionary";
import { UserStatistics } from "../../Words/statistics/user_statistics";
import { UserData } from "./user_data";

export type ProfileDataResponse = {
    EnglishUserStatistics: UserStatistics,
    EnglishWordsDictionary: {
        WordCount: number;
        Words: WordsDictionary;
    };
    HebrewUserStatistics: UserStatistics,
    HebrewWordsDictionary: {
        WordCount: number;
        Words: WordsDictionary;
    };
    UserData: UserData;
    Version: string;
}