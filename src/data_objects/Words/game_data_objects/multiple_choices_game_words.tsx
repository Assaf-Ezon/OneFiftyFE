import { MultipleChoicesGameWordDictDetails } from "./multiple_choices_game_word_details";

// type of dicts that are used in games
export type MultipleChoicesGameWords = {
    [groupId: number]: {
        [word: string]: MultipleChoicesGameWordDictDetails;
    };
}