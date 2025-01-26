import { useGameErrorContext } from "../context/game_context/game_error_context";
import { useWords } from "../context/general_context/words_context";
import { useLearningSettingsContext } from "../context/settings_context/learning_context";

import { UserStatistics } from '../data_objects/words/statistics/user_statistics';
import { Languages } from "../data_objects/enums/language";
import { GameMode } from "../data_objects/general/game_mode";
import { Words } from "../data_objects/words/basic_data_objects/words";
import { GameWords } from "../data_objects/words/game_data_objects/game_words";

import WordsDictCreator from "../find_words/words_dict_creator";

// sets at start the "words" state that holds the gameDict 
export const getWords = (gameMode: GameMode) => {
    const { toggleGameErrorMenu } = useGameErrorContext()
    const { settings } = useLearningSettingsContext();
    const { hebrewUserStatistics,  
        englishUserStatistics,  
        hebrewNewWords,  
        englishNewWords } = useWords();

    let NewWords: Words = {};
    let UserStatistics: UserStatistics = {  WordsStatistics: {WordCount: 0, Words: {}}};

    switch (settings.language) {
        case Languages.Hebrew:
            NewWords = hebrewNewWords;
            UserStatistics = hebrewUserStatistics;
            break;
        case Languages.English:
            NewWords = englishNewWords;
            UserStatistics = englishUserStatistics;
            break;
    }

    const gameCreater = new WordsDictCreator(settings, NewWords, UserStatistics, gameMode);
    const wordsList: GameWords = gameCreater.createList();

    Object.keys(wordsList).length === 0 ? toggleGameErrorMenu() : null;
    
    return wordsList;
}