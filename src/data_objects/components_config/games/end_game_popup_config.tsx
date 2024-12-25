import { WordDetails } from "../../words/basic_data_objects/word_details";

export type EndGamePopupConfig = {
    correctAnswers: WordDetails[];
    wrongAnswers: WordDetails[];
};