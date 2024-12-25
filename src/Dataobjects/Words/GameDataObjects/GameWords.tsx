import { GameWordDictDetails } from "./GameWordDictDetails";

// type of dicts that are used in games
export type GameWords = {
    [key: string]: {
        [word: string]: GameWordDictDetails;
    };
}