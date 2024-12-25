import { Meaning } from "../BasicDataObjects/Meaning";

// the data inside a word in the dict that is used in games 
export type GameWordListDetails = {
    FullWord: string;
    Meanings: Meaning[];
    Group: number;
    Type: string;
}