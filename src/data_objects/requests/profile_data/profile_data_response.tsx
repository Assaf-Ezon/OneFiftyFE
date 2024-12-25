import { Words } from "../../words/basic_data_objects/words";
import { UserStatistics } from "../../words/statistics/user_statistics";
import { UserData } from "./user_data";

export type ProfileDataResponse = {
    EnglishUserStatistics: UserStatistics,
    EnglishWordsDictionary: {
        WordCount: number;
        Words: Words;
    };
    HebrewUserStatistics: UserStatistics,
    HebrewWordsDictionary: {
        WordCount: number;
        Words: Words;
    };
    UserData: UserData;
    Version: string;
}