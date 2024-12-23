import AddNewWords from "./add_new_words";
import AddWrongWords from "./add_wrong_words";
import AddPracticeWords from "./add_practice_words";
import AddSmartWords from "./add_smart_words";

const AddWordsClassesHandler = {
    NewWords: AddNewWords,
    WrongWords: AddWrongWords,
    PracticeWords: AddPracticeWords,
    SmartWords: AddSmartWords,
} as const; 

export default AddWordsClassesHandler;