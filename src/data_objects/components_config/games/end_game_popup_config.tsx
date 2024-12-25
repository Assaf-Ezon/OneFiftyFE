import { WordDetails } from "../../Words/basic_data_objects/word_details";

export type EndGamePopupConfig = {
    correctAnswers: WordDetails[];
    wrongAnswers: WordDetails[];
};