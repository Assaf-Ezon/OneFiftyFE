import { WordDetails } from "./word_details";

// the words in 'dictionary' dicts and in new words dicts (made in words context)
export type Words = {
    [groupId: string]: {
        [word: string]: WordDetails;
    };
}