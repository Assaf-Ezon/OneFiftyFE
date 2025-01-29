import { Meaning } from "./data_objects/words/basic_data_objects/meaning";

class WordsFormatter {
    static getMeaningsAsString (meaningsObject: Meaning[]) {
        return meaningsObject.map((meaning) => meaning.Meaning).join("\n");
    }
}

export default WordsFormatter;