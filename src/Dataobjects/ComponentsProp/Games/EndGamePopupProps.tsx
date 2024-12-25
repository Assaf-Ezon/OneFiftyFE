import { WordDetails } from "../Words/BasicDataObjects/WordDetails";

export type EndGamePopupProps = {
    correctAnswers: WordDetails[];
    wrongAnswers: WordDetails[];
};