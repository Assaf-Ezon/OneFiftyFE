import { WordDetails } from "../basic_data_objects/word_details";

// the words in 'dictionary' dicts
export type WordsDictionary = {
    [key: string]: {
        [word: string]: WordDetails;
    };
}
