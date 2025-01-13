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
import { GameWordState } from '../../../data_objects/general/game_word_state';

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

    const [listIndex, setListIndex] = useState<number>(0); // Pointer to the current level
    const [amountInLevel, setAmountInLevel] = useState<number>(0); // Words in the current level
    const [wordCount, setWordCount] = useState<number>(0); // Overall word counter
    const [wordPerLevelCount, setWordPerLevelCount] = useState<number>(0); // Counter for the current level


    const [currentWord, setCurrentWord] = useState<GameWordState>({
        word: "",
        meaning: "",
        type: "",
        level: 0,
    });

    const [answer, setAnswer] = useState<number>(ButtonState.ShowAnswer); // Button states
    
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
            if ((listIndex + 1) === words.length) {
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
        let wordsListIndex = listIndex;

        if (isFirstInGame || isNextLevel) {
            wordsListIndex = isFirstInGame ? 0 : listIndex + 1;
            const newAmountInLevel = Object.keys(words[wordsListIndex][1]).length;
    
            setListIndex(wordsListIndex);
            setAmountInLevel(newAmountInLevel);
        }

        setWordCount(isFirstInGame || isNextLevel ? 0 : wordCount + 1);
        setWordPerLevelCount(isFirstInGame || isNextLevel ? 0 : wordPerLevelCount + 1);


        const newWordKey = Object.keys(words[wordsListIndex][1])[isFirstInGame || isNextLevel ? 0 : wordPerLevelCount + 1];
        const newWordDetails = words[wordsListIndex][1][newWordKey];

        setCurrentWord({
            word: newWordKey,
            meaning: newWordDetails.Meanings.map((meaning) => meaning.Meaning).join("\n"),
            type: newWordDetails.Type,
            level: newWordDetails.Group,
        });
    };

    const setIsAnswerCorrect = (isCorrect: boolean) => {
        const currentWordKey = Object.keys(words[listIndex][1])[wordPerLevelCount];
        const currentWordDetails = words[listIndex][1][currentWordKey];

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
                    <Text style={KnewDidntKnowGameStyle.word}>{currentWord.word}</Text>
                </View>
                <View style={KnewDidntKnowGameStyle.texts}>  
                    <Text style={KnewDidntKnowGameStyle.wordCounter}>סוג: {currentWord.type}</Text>
                    <Text style={KnewDidntKnowGameStyle.wordCounter}>רמה: {currentWord.level}</Text>
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
                            {answer != ButtonState.ShowAnswer ? <Text style={KnewDidntKnowGameStyle.meaning}>{currentWord.meaning}</Text> : null}
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