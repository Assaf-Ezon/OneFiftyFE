import { Meaning } from "../basic_data_objects/meaning";

// the data inside a word in the dict that is used in games 
export type GameWordDictDetails = {
    FullWord: string;
    Meanings: Meaning[];
    Group: number;
    Type: string;
    ExtraParameters: {[key: string]: any};
}