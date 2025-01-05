import { Text, View, TouchableOpacity, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import EndGame from '../../games/end_game/end_game';
import React from 'react';

import QuestionStyle from './question_style';
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

const Question = () => {
    // Navigation
    const navigation = useNavigation();

    // Contexts
    const { isEndGame, toggleEndGameMenu } = useEndGameContext();
    const { toggleGameErrorMenu } = useGameErrorContext()
    const { toggleLearningSettings } = useLearningSettingsContext();
    const { settings, isSettingsFilled } = useLearningSettingsContext();
    const {hebrewUserStatistics,  
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

        const createGame = new WordsDictCreator(settings, NewWords, UserStatistics);
        let wordsList: [string, { [word: string]: GameWordDictDetails }][] = Object.entries(createGame.createList());

        Object.keys(wordsList).length === 0 ? toggleGameErrorMenu() : null;

        setWords(wordsList);
    }, []);

    // Initialize other state based on words list
    useEffect(() => {
        if (words.length > 0) {
            const initialPointer = 0;
            const initialLevel = parseInt(words[initialPointer][0]);
            const initialAmount = Object.keys(words[initialPointer][1]).length;
            
            const firstWordKey = Object.keys(words[initialPointer][1])[0];
            const firstWordMeaning = words[initialPointer][1][firstWordKey];

            setListPointer(0);
            setLevel(initialLevel);
            setAmountInLevel(initialAmount);

            setWord(firstWordKey);
            setPirush(firstWordMeaning.Meanings.map((meaning) => meaning.Meaning).join("\n"));
            setType(firstWordMeaning.Type);

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
    const changeWord = async () => {
        if ((wordPerLevelCount + 1) === amountInLevel) {
            if ((listPointer + 1) === words.length) {
                toggleEndGameMenu();
            } else {
                const nextPointer = listPointer + 1;
                const nextLevel = parseInt(words[nextPointer][0]);
                const nextAmount = Object.keys(words[nextPointer][1]).length;

                const nextWordKey = Object.keys(words[nextPointer][1])[0];
                const nextWord = words[nextPointer][1][nextWordKey];

                setListPointer(nextPointer);
                setLevel(nextLevel);
                setAmountInLevel(nextAmount);

                setWordCount(wordCount + 1);
                setWordPerLevelCount(0);

                setWord(nextWordKey);
                setPirush(nextWord.Meanings.map((meaning) => meaning.Meaning).join("\n"));
                setType(nextWord.Type);
            }
        } else {
            const nextWordIndex = wordPerLevelCount + 1;
            const nextWordKey = Object.keys(words[listPointer][1])[nextWordIndex];
            const nextWord = words[listPointer][1][nextWordKey];

            setWordCount(wordCount + 1);
            setWordPerLevelCount(nextWordIndex);

            setWord(nextWordKey);
            setPirush(nextWord.Meanings.map((meaning) => meaning.Meaning).join("\n"));
            setType(nextWord.Type);

            setAnswer(ButtonState.ShowAnswer);
        }
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
            <Animated.View style={[QuestionStyle.question, { opacity: isEndGame ? 0.6 : fadeAnim }]}
                pointerEvents={isEndGame ? 'none' : 'auto'}>
                            <View style={QuestionStyle.wordSection}>
                    <Text style={QuestionStyle.word}>{word}</Text>
                </View>
                <View style={QuestionStyle.texts}>  
                    <Text style={QuestionStyle.wordCounter}>סוג: {type}</Text>
                    <Text style={QuestionStyle.wordCounter}>רמה: {level}</Text>
                    <Text style={QuestionStyle.wordCounter}>כמות: {wordCount + 1}/{totalWords}</Text>
                </View>
                <View style={QuestionStyle.interpretation}>
                    <LinearGradient
                        colors={['#F27155', '#EA7B30']}
                        start={{ x: 1, y: 0.5 }}
                        end={{ x: 0, y: 0.5 }}
                        style={QuestionStyle.color}
                    >
                        <View style={QuestionStyle.meaningContainer}>
                            {answer != 1 ? <Text style={QuestionStyle.meaning}>{pirush}</Text> : null}
                        </View>
                    </LinearGradient>
                </View>
                {answer == ButtonState.ShowAnswer ? (
                    <Animated.View style={{ opacity: btnFadeAnim }}>
                        <TouchableOpacity style={QuestionStyle.nextBtn} onPress={() =>{setAnswer(ButtonState.ChooseAnswer)}}>
                            <Text style={QuestionStyle.btnText}>הצג תשובה</Text>
                        </TouchableOpacity>
                    </Animated.View>
                ) : answer == ButtonState.ChooseAnswer ? (
                    <View style={QuestionStyle.btns}>
                        <TouchableOpacity style={QuestionStyle.btn} onPress={() => setIsAnswerCorrect(false)}>
                            <Text style={QuestionStyle.btnText}>לא ידעתי</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={QuestionStyle.btn} onPress={() => setIsAnswerCorrect(true)}>
                            <Text style={QuestionStyle.btnText}>ידעתי</Text>
                        </TouchableOpacity>
                    </View>
                ) : answer == ButtonState.Continue ? (
                    <Animated.View style={{ opacity: btnFadeAnim }}>
                        <TouchableOpacity style={QuestionStyle.nextBtn} onPress={changeWord}>
                            <Text style={QuestionStyle.btnText}>המשך</Text>
                        </TouchableOpacity>
                    </Animated.View>
                ) : null}
            </Animated.View>
            {isEndGame ? <EndGame correctAnswers={correctAnswers} wrongAnswers={wrongAnswers} /> : null}
        </>
    );
};

export default Question;