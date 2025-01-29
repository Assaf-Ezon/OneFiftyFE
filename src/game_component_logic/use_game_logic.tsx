import { Animated } from "react-native";
import { useState, useEffect } from "react";

import { fadeIn } from "../animations/fade_animations";

import { useSettingsValidation } from "./use_settings_validation";
import { getWords } from "./get_words";

import { useEndGameContext } from "../context/game_context/end_game_context";

import { GameMode } from "../data_objects/general/game_mode";
import { WordDetails } from "../data_objects/words/basic_data_objects/word_details";
import { GameWordDictDetails } from "../data_objects/words/game_data_objects/game_word_dict_details";
import { GameWords } from "../data_objects/words/game_data_objects/game_words";

export const useGameLogic = (gameMode: GameMode, fadeAnim: Animated.Value, ExtraParams: any) => {
    // context
    const { toggleEndGameMenu } = useEndGameContext();
    
    // State
    const [correctAnswers, setCorrectAnswers] = useState<WordDetails[]>([]); // list of the words the user got correctly
    const [wrongAnswers, setWrongAnswers] = useState<WordDetails[]>([]); // list of the words the user got incorrectly

    const [totalWords, setTotalWords] = useState<number>(0); // total amount of words in the current game

    const [level, setLevel] = useState<number>(-1); // index of the current level TODO: change the -1 to 0 because 1 is the first available level, change it in the "setNewValuesForNextWord" as well
    const [amountInLevel, setAmountInLevel] = useState<number>(0); // Words in the current level
    const [wordCount, setWordCount] = useState<number>(0); // Overall word counter
    const [wordsInLevelIndex, setWordsInLevelIndex] = useState<number>(-1); // index for the current level

    // current word
    const [currentWord, setCurrentWord] = useState<GameWordDictDetails>({
        FullWord: "",
        Meanings: [],
        Group: 0,
        Type: "",
        ExtraParameters: ExtraParams,
    });

    const [words, setWords] = useState<GameWords>(getWords(gameMode)); // GameWordsDict

    // validates if settings form is filled 
    useSettingsValidation();

    // Initialize first values in states for game 
    useEffect(() => {
        if (Object.keys(words)) {
            let total = 0;

            for (const groupId in words) {
                const group = words[groupId];
                total += Object.keys(group).length;
            }
            setTotalWords(total);
            
            setNewValuesForNextWord();
        }
    }, [words]);

    const setNewValuesForNextWord = () => {
        let isNextLevel: boolean = (wordsInLevelIndex + 1) == amountInLevel;
        let currentLevel: number = level;

        if (isNextLevel) {
            currentLevel++;
            while (!(currentLevel in words)) {
                if (currentLevel > 10) {
                    toggleEndGameMenu();
                    return;
                }

                currentLevel++;
            }
        } 

        setLevel(currentLevel);
        setAmountInLevel(Object.entries(words[currentLevel]).length);

        const nextWordsInLevelIndex = isNextLevel ? 0 : wordsInLevelIndex + 1;

        setWordCount(wordCount + 1);
        setWordsInLevelIndex(nextWordsInLevelIndex);

        setCurrentWord(Object.entries(words[currentLevel])[nextWordsInLevelIndex][1]);
    };

    const setIsAnswerCorrect = (isCorrect: boolean) => {
        const currentWordDetails: GameWordDictDetails = Object.entries(words[level])[wordsInLevelIndex][1];

        const currentWordToAdd: WordDetails = {
            FullWord: currentWordDetails.FullWord,
            Meanings: currentWordDetails.Meanings,
            Group: currentWordDetails.Group,
        }

        const addAnswerToRelevantList: (value: React.SetStateAction<WordDetails[]>) => void = isCorrect ? setCorrectAnswers : setWrongAnswers;

        addAnswerToRelevantList((prevAnswers) => {
            if (Array.isArray(prevAnswers)) {
                return [...prevAnswers, currentWordToAdd]; 
            } else {
                return [currentWordToAdd]; 
            }
        });
    };

    // Animations
    useEffect(() => {
        fadeIn(fadeAnim).start();
    }, [wordCount, fadeAnim]);

    return {
        correctAnswers,
        wrongAnswers,
        totalWords,
        currentWord,
        wordCount,
        setNewValuesForNextWord,
        setIsAnswerCorrect
    }
}