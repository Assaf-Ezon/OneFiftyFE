import { GameWordDictDetails } from "./game_word_dict_details";

// type of dicts that are used in games
export type GameWords = {
    [groupId: string]: {
        [word: string]: GameWordDictDetails;
    };
}