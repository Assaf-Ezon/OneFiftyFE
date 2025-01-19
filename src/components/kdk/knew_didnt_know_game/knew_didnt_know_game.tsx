import { Text, View, TouchableOpacity, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import EndGame from '../../games/end_game/end_game';
import React from 'react';

import KnewDidntKnowGameStyle from './knew_didnt_know_game_style';
import { fadeIn } from '../../../animations/fade_animations';

import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';

import { useLearningSettingsContext } from '../../../context/settings_context/learning_context';

import WordsDictCreator from '../../../find_words/words_dict_creator';
import { Words } from '../../../data_objects/words/basic_data_objects/words';
import { useWords } from '../../../context/general_context/words_context';
import { useEndGameContext } from '../../../context/game_context/end_game_context';
import { useGameErrorContext } from '../../../context/game_context/game_error_context';

import { WordDetails } from '../../../data_objects/words/basic_data_objects/word_details';
import { GameWordDictDetails } from '../../../data_objects/words/game_data_objects/game_word_dict_details';
import { ButtonState } from '../../../data_objects/enums/button_state';

import { UserStatistics } from '../../../data_objects/words/statistics/user_statistics';
import { Languages } from '../../../data_objects/enums/language';
import { Screens } from '../../../data_objects/enums/screens';
import { GAMES } from '../../../data_objects/enums/game_objects';
import { GameWords } from '../../../data_objects/words/game_data_objects/game_words';
import { Meaning } from '../../../data_objects/words/basic_data_objects/meaning';

const KnewDidntKnowGame = () => {
    // Navigation
    const navigation = useNavigation();

    // Contexts
    const { isEndGame, toggleEndGameMenu } = useEndGameContext();
    const { toggleGameErrorMenu } = useGameErrorContext()
    const { settings, isSettingsFilled, toggleLearningSettings } = useLearningSettingsContext();
    const { hebrewUserStatistics,  
        englishUserStatistics,  
        hebrewNewWords,  
        englishNewWords } = useWords();

    // State
    const [answer, setAnswer] = useState<number>(ButtonState.ShowAnswer); // Button states

    const [correctAnswers, setCorrectAnswers] = useState<WordDetails[]>([]); // list of the words the user got correctly
    const [wrongAnswers, setWrongAnswers] = useState<WordDetails[]>([]); // list of the words the user got incorrectly

    const [totalWords, setTotalWords] = useState<number>(0); // total amount of words in the current game

    const [level, setLevel] = useState<number>(-1); // index of the current level TODO: change the -1 to 0 because 1 is the first available level, change it in the "setNewValuesForNextWord" as well
    const [amountInLevel, setAmountInLevel] = useState<number>(0); // Words in the current level
    const [wordCount, setWordCount] = useState<number>(0); // Overall word counter
    const [wordsInLevelIndex, setWordsInLevelIndex] = useState<number>(0); // index for the current level

    // current word
    const [currentWord, setCurrentWord] = useState<GameWordDictDetails>({
        FullWord: "",
        Meanings: [],
        Group: 0,
        Type: "",
        ExtraParameters: {},
    });
    
    // sets at start the "words" state that holds the gameDict 
    const setFirstWords = () => {
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

        const gameCreater = new WordsDictCreator(settings, NewWords, UserStatistics, GAMES.KDK.id);
        const wordsList: GameWords = gameCreater.createList();

        Object.keys(wordsList).length === 0 ? toggleGameErrorMenu() : null;
        
        return wordsList;
    }

    const [words, setWords] = useState<GameWords>(setFirstWords()); // GameWordsDict

    // validates if settings are filled
    useEffect(() => {
        if (!isSettingsFilled()) {
            toggleLearningSettings();
            navigation.navigate(Screens.LEARNING as never);
        }
    }, []);

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
        const isFirstInGame: boolean = level == -1;

        let isNextLevel: boolean = (wordsInLevelIndex + 1) == amountInLevel;
        let currentLevel: number = level;

        if (isFirstInGame || isNextLevel) {
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

        const nextWordsInLevelIndex = wordsInLevelIndex + 1;

        setWordCount(wordCount + 1);
        setWordsInLevelIndex(isFirstInGame || isNextLevel ? 0 : nextWordsInLevelIndex);

        setCurrentWord(Object.entries(words[currentLevel])[isFirstInGame || isNextLevel ? 0 : nextWordsInLevelIndex][1]);

        setAnswer(ButtonState.ShowAnswer);
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

        setAnswer(ButtonState.Continue);
    };

    const getMeaningsAsString = (meaningsObject: Meaning[]) => {
        return meaningsObject.map((meaning) => meaning.Meaning).join("\n");
    }

    const fadeAnim = useState<Animated.Value>(new Animated.Value(0))[0];
    const btnFadeAnim = useState<Animated.Value>(new Animated.Value(0))[0];

    // Animations
    useEffect(() => {
        fadeIn(fadeAnim).start();
    }, [wordCount, fadeAnim]);

    useEffect(() => {
        if (answer) {
            fadeIn(btnFadeAnim, 1, 200, false).start();
        } else {
            btnFadeAnim.setValue(0);
        }
    }, [answer, btnFadeAnim]);

    return (
        <>
            <Animated.View style={[KnewDidntKnowGameStyle.question, { opacity: isEndGame ? 0.6 : fadeAnim }]}
                pointerEvents={isEndGame ? 'none' : 'auto'}>
                            <View style={KnewDidntKnowGameStyle.wordSection}>
                    <Text style={KnewDidntKnowGameStyle.word}>{currentWord.FullWord}</Text>
                </View>
                <View style={KnewDidntKnowGameStyle.texts}>  
                    <Text style={KnewDidntKnowGameStyle.wordCounter}>סוג: {currentWord.Type}</Text>
                    <Text style={KnewDidntKnowGameStyle.wordCounter}>רמה: {currentWord.Group}</Text>
                    <Text style={KnewDidntKnowGameStyle.wordCounter}>כמות: {wordCount}/{totalWords}</Text>
                </View>
                <View style={KnewDidntKnowGameStyle.interpretation}>
                    <LinearGradient
                        colors={['#F27155', '#EA7B30']}
                        start={{ x: 1, y: 0.5 }}
                        end={{ x: 0, y: 0.5 }}
                        style={KnewDidntKnowGameStyle.color}
                    >
                        <View style={KnewDidntKnowGameStyle.meaningContainer}>
                            {answer != ButtonState.ShowAnswer ? <Text style={KnewDidntKnowGameStyle.meaning}>{getMeaningsAsString(currentWord.Meanings)}</Text> : null}
                        </View>
                    </LinearGradient>
                </View>
                {answer == ButtonState.ShowAnswer ? (
                    <Animated.View style={{ opacity: btnFadeAnim }}>
                        <TouchableOpacity style={KnewDidntKnowGameStyle.nextBtn} onPress={() =>{setAnswer(ButtonState.ChooseAnswer)}}>
                            <Text style={KnewDidntKnowGameStyle.btnText}>הצג תשובה</Text>
                        </TouchableOpacity>
                    </Animated.View>
                ) : answer == ButtonState.ChooseAnswer ? (
                    <View style={KnewDidntKnowGameStyle.btns}>
                        <TouchableOpacity style={KnewDidntKnowGameStyle.btn} onPress={() => setIsAnswerCorrect(false)}>
                            <Text style={KnewDidntKnowGameStyle.btnText}>לא ידעתי</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={KnewDidntKnowGameStyle.btn} onPress={() => setIsAnswerCorrect(true)}>
                            <Text style={KnewDidntKnowGameStyle.btnText}>ידעתי</Text>
                        </TouchableOpacity>
                    </View>
                ) : answer == ButtonState.Continue ? (
                    <Animated.View style={{ opacity: btnFadeAnim }}>
                        <TouchableOpacity style={KnewDidntKnowGameStyle.nextBtn} onPress={() => {setNewValuesForNextWord()}}>
                            <Text style={KnewDidntKnowGameStyle.btnText}>המשך</Text>
                        </TouchableOpacity>
                    </Animated.View>
                ) : null}
            </Animated.View>
            {isEndGame ? <EndGame correctAnswers={correctAnswers} wrongAnswers={wrongAnswers} /> : null}
        </>
    );
};

export default KnewDidntKnowGame;