import { WordDetails } from "../../words/basic_data_objects/word_details";

export type EndGamesStatisticsConfig = {
    correctAnswers: WordDetails[];
    wrongAnswers: WordDetails[];
};