import { Meaning } from "../basic_data_objects/meaning";
import { GameWordDictDetails } from "./game_word_dict_details";

// the data inside a word in the dict that is used in games 
export type MultipleChoicesGameWordDictDetails = GameWordDictDetails & {
    IncorrectMeanings: Meaning[][];
}