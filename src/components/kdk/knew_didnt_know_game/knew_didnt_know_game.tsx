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
    const [correctAnswers, setCorrectAnswers] = useState<WordDetails[]>([]);
    const [wrongAnswers, setWrongAnswers] = useState<WordDetails[]>([]);

    const [words, setWords] = useState<[string, { [word: string]: GameWordDictDetails }][]>([]);
    const [totalWords, setTotalWords] = useState<number>(0);

    const [listPointer, setListPointer] = useState<number>(0); // Pointer to the current level
    const [level, setLevel] = useState<number | null>(null); // Current level number
    const [amountInLevel, setAmountInLevel] = useState<number>(0); // Words in the current level
    const [wordCount, setWordCount] = useState<number>(0); // Overall word counter
    const [wordPerLevelCount, setWordPerLevelCount] = useState<number>(0); // Counter for the current level

    const [word, setWord] = useState<string>("");
    const [pirush, setPirush] = useState<string>("");
    const [type, setType] = useState<string>("");

    const [answer, setAnswer] = useState<number>(ButtonState.ShowAnswer); // Button states

    const fadeAnim = useState<Animated.Value>(new Animated.Value(0))[0];
    const btnFadeAnim = useState<Animated.Value>(new Animated.Value(0))[0];
    
    // Update the words list based on settings.language
    useEffect(() => {
        if (!isSettingsFilled()) {
            toggleLearningSettings();
            navigation.navigate(Screens.LEARNING as never);
        }

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
        let wordsList: [string, { [word: string]: GameWordDictDetails }][] = Object.entries(gameCreater.createList());

        Object.keys(wordsList).length === 0 ? toggleGameErrorMenu() : null;

        setWords(wordsList);
    }, []);

    // Initialize other state based on words list
    useEffect(() => {
        if (words.length > 0) {
            setNewValuesForNextWord(true, false);

            // Calculate total words
            let total = 0;
            words.forEach(group => {
                const wordGroup = group[1];
                total += Object.keys(wordGroup).length;  
            });
            setTotalWords(total);
        }
    }, [words]);

    // Word change logic
    const changeWord = () => {
        if ((wordPerLevelCount + 1) === amountInLevel) {
            if ((listPointer + 1) === words.length) {
                toggleEndGameMenu();
            } else {
                setNewValuesForNextWord(false, true);
            }
        } else {
            setNewValuesForNextWord(false, false);
            setAnswer(ButtonState.ShowAnswer);
        }
    };

    const setNewValuesForNextWord = (isFirstInGame: boolean, isNextLevel: boolean) => {
        let wordsListPointer = listPointer;

        if (isFirstInGame || isNextLevel) {
            wordsListPointer = isFirstInGame ? 0 : listPointer + 1;
            const newLevel = parseInt(words[wordsListPointer][0]);
            const newAmountInLevel = Object.keys(words[wordsListPointer][1]).length;
    
            setListPointer(wordsListPointer);
            setLevel(newLevel);
            setAmountInLevel(newAmountInLevel);
        }

        setWordCount(isFirstInGame || isNextLevel ? 0 : wordCount + 1);
        setWordPerLevelCount(isFirstInGame || isNextLevel ? 0 : wordPerLevelCount + 1);


        const newWordKey = Object.keys(words[wordsListPointer][1])[isFirstInGame || isNextLevel ? 0 : wordPerLevelCount + 1];
        const newWordDetails = words[wordsListPointer][1][newWordKey];

        setWord(newWordKey);
        setPirush(newWordDetails.Meanings.map((meaning) => meaning.Meaning).join("\n"));
        setType(newWordDetails.Type);
    };

    const setIsAnswerCorrect = (isCorrect: boolean) => {
        const currectWordKey = Object.keys(words[listPointer][1])[wordPerLevelCount];
        const currectWordValue = words[listPointer][1][currectWordKey];

        const currectWordToAdd: WordDetails = {
            FullWord: currectWordValue.FullWord,
            Meanings: currectWordValue.Meanings,
            Group: currectWordValue.Group,
        }

        if (isCorrect) {
            setCorrectAnswers((prevAnswers) => {
                if (Array.isArray(prevAnswers)) {
                    return [...prevAnswers, currectWordToAdd]; 
                } else {
                    return [currectWordToAdd]; 
                }
            });
        } else {
            setWrongAnswers((prevAnswers) => {
                if (Array.isArray(prevAnswers)) {
                    return [...prevAnswers, currectWordToAdd]; 
                } else {
                    return [currectWordToAdd]; 
                }
            });
        }

        setAnswer(ButtonState.Continue);
    };

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
                    <Text style={KnewDidntKnowGameStyle.word}>{word}</Text>
                </View>
                <View style={KnewDidntKnowGameStyle.texts}>  
                    <Text style={KnewDidntKnowGameStyle.wordCounter}>סוג: {type}</Text>
                    <Text style={KnewDidntKnowGameStyle.wordCounter}>רמה: {level}</Text>
                    <Text style={KnewDidntKnowGameStyle.wordCounter}>כמות: {wordCount + 1}/{totalWords}</Text>
                </View>
                <View style={KnewDidntKnowGameStyle.interpretation}>
                    <LinearGradient
                        colors={['#F27155', '#EA7B30']}
                        start={{ x: 1, y: 0.5 }}
                        end={{ x: 0, y: 0.5 }}
                        style={KnewDidntKnowGameStyle.color}
                    >
                        <View style={KnewDidntKnowGameStyle.meaningContainer}>
                            {answer != 1 ? <Text style={KnewDidntKnowGameStyle.meaning}>{pirush}</Text> : null}
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
                        <TouchableOpacity style={KnewDidntKnowGameStyle.nextBtn} onPress={changeWord}>
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