import { WordDetails } from "../BasicDataObjects/WordDetails";

// the words in 'dictionary' dicts
export type WordsDictionary = {
    [key: string]: {
        [word: string]: WordDetails;
    };
}
