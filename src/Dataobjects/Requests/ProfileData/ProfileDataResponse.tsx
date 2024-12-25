import { WordsDictionary } from "../../Words/DIctionary/WordsDictionary";
import { UserStatistics } from "../../Words/Statistics/UserStatistics";
import { UserData } from "./UserData";

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