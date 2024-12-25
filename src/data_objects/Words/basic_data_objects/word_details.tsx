import { Meaning } from "./meaning";

// details of words in dictionaries inside the words context
export type WordDetails = {
    FullWord: string;
    Meanings: Meaning[];
    Group: number;
}