import { Meaning } from "../data_objects/words/basic_data_objects/meaning";

export const getMeaningsAsString = (meaningsObject: Meaning[]) => {
    return meaningsObject.map((meaning) => meaning.Meaning).join("\n");
}