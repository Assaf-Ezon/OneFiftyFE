import { GameWordListDetails } from "./GameWordListDetails";

// type of dicts that are used in games
export type GameWords = {
    [key: string]: {
        [word: string]: GameWordListDetails;
    };
}