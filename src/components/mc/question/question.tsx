import { Text, View, TouchableOpacity, Image, Animated } from 'react-native';
import React from 'react';
import { useEffect, useState } from 'react';

import EndGame from '../../games/end_game/end_game';

import { IMAGES } from '../../../image_handler';

import QuestionStyle from './question_style';

import { fadeIn } from '../../../animations/fade_animations';

import { useNavigation } from '@react-navigation/native';

import { useEndGameContext } from '../../../context/game_context/end_game_context';
import { useGameErrorContext } from '../../../context/game_context/game_error_context';
import { useLearningSettingsContext } from '../../../context/settings_context/learning_context';
import { useWords } from '../../../context/general_context/words_context';

import { UserStatistics } from '../../../data_objects/words/statistics/user_statistics';
import { GameWordDictDetails } from '../../../data_objects/words/game_data_objects/game_word_dict_details';
import { Words } from '../../../data_objects/words/basic_data_objects/words';
import { WordDetails } from '../../../data_objects/words/basic_data_objects/word_details';
import { Languages } from '../../../data_objects/enums/language';
import { Screens } from '../../../data_objects/enums/screens';
import WordsDictCreator from '../../../find_words/words_dict_creator';

import create4MeaningsList from './get_random_meaning';

const Question = () => {    
    // Navigation
    const navigation = useNavigation();

    // Contexts
    const { isEndGame, toggleEndGameMenu } = useEndGameContext();
    const { toggleGameErrorMenu } = useGameErrorContext()
    const { settings, isSettingsFilled, toggleLearningSettings } = useLearningSettingsContext();
    const { hebrewUserStatistics,  
        englishUserStatistics,  
        hebrewNewWords,  
        englishNewWords,
        hebrewWords, 
        englishWords } = useWords();

    // State
    const [next, setNext] = useState<boolean>(false);
    const [bdika, setBdika] = useState<boolean>(false);

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
    const [correctMeaning, setCorrectMeaning] = useState<string>("");
    const [type, setType] = useState<string>("");

    const [desiredMeaning, setDesiredMeaning] = useState<string>("");

    const [meanings, setMeanings] = useState<string[]>([]);

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
            setCorrectMeaning(firstWordMeaning.Meanings.map((meaning) => meaning.Meaning).join("\n"));
            setType(firstWordMeaning.Type);

            // Calculate total words
            let total = 0;
            words.forEach(group => {
                const wordGroup = group[1];
                total += Object.keys(wordGroup).length;  
            });
            setTotalWords(total);

            setMeanings(create4MeaningsList(settings.language === Languages.Hebrew ? hebrewWords : englishWords, firstWordMeaning.Meanings.map((meaning) => meaning.Meaning).join("\n")));
        }
    }, [words]);

    const changeWord = () => {
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
                setCorrectMeaning(nextWord.Meanings.map((meaning) => meaning.Meaning).join("\n"));
                setType(nextWord.Type);

                setMeanings(create4MeaningsList(settings.language === Languages.Hebrew ? hebrewWords : englishWords, nextWord.Meanings.map((meaning) => meaning.Meaning).join("\n")));
            }
        } else {
            const nextWordIndex = wordPerLevelCount + 1;
            const nextWordKey = Object.keys(words[listPointer][1])[nextWordIndex];
            const nextWord = words[listPointer][1][nextWordKey];

            setWordCount(wordCount + 1);
            setWordPerLevelCount(nextWordIndex);

            setWord(nextWordKey);
            setCorrectMeaning(nextWord.Meanings.map((meaning) => meaning.Meaning).join("\n"));
            setType(nextWord.Type);

            setMeanings(create4MeaningsList(settings.language === Languages.Hebrew ? hebrewWords : englishWords, nextWord.Meanings.map((meaning) => meaning.Meaning).join("\n")));
        }
    };

    const setIfAnswerCorrect = (isCorrect: boolean) => {
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
        
        setNext(false);
    };

    // changes the user's pick and reveals the first button
    const setUserMeaning = (meaning: string) => {
        setDesiredMeaning(meaning);
        setBdika(true);
    };

    const fadeAnim = useState<Animated.Value>(new Animated.Value(0))[0];

    useEffect(() => {
        fadeIn(fadeAnim).start();
    }, [correctMeaning, fadeAnim]);

    return (
        <>
            <Animated.View style={[QuestionStyle.question, {opacity: fadeAnim}]}>
                <View style={QuestionStyle.wordSection}>
                    <Text style={QuestionStyle.word}>{word}</Text>
                </View>
                <View style={QuestionStyle.texts}>  
                    <Text style={QuestionStyle.wordCounter}>סוג: {type}</Text>
                    <Text style={QuestionStyle.wordCounter}>רמה: {level}</Text>
                    <Text style={QuestionStyle.wordCounter}>כמות: {wordCount + 1}/{totalWords}</Text>
                </View>
                <View style={QuestionStyle.pirushim}>
                    {
                        meanings.map((meaning) => {
                                return (
                                    <TouchableOpacity style={QuestionStyle.option} onPress={!next ? () => {setUserMeaning(meaning)} : () => {}} key={meaning}>
                                        <Text style={[QuestionStyle.optionText, {fontWeight: next && meaning === correctMeaning ? '600' : '300', 
                                            textDecorationLine: next && meaning === desiredMeaning ? 'underline' : 'none'}]}>
                                            {meaning}
                                        </Text>
                                        <Image source={meaning ===  desiredMeaning && bdika ? IMAGES.chosen_option : 
                                            meaning === correctMeaning && next ? IMAGES.correct : 
                                            next && meaning !== correctMeaning ? IMAGES.wrong : IMAGES.option} 
                                        style={QuestionStyle.option_image} />
                                    </TouchableOpacity>
                                )
                        })
                    }
                </View>
            </Animated.View>
            {bdika ? (
                <TouchableOpacity style={QuestionStyle.nextBtn} onPress={() => {setNext(true); setBdika(false);}}>
                    <Text style={QuestionStyle.btnText}>בדיקה</Text>
                </TouchableOpacity>
            ): null}
            {next ? (
                <TouchableOpacity style={QuestionStyle.nextBtn} onPress={() => {setIfAnswerCorrect(correctMeaning === desiredMeaning); changeWord();}}>
                    <Text style={QuestionStyle.btnText}>המשך</Text>
                </TouchableOpacity>
            ) : null}

            {isEndGame ? <EndGame correctAnswers={correctAnswers} wrongAnswers={wrongAnswers} /> : null}
        </>
    );
};

export default Question;