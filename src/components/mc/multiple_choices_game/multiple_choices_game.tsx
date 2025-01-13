import { Text, View, TouchableOpacity, Image, Animated } from 'react-native';
import React from 'react';
import { useEffect, useState } from 'react';

import EndGame from '../../games/end_game/end_game';

import { IMAGES } from '../../../image_handler';

import MultipleChoicesGameStyle from './multiple_choices_game_style';

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
import { GAMES } from '../../../data_objects/enums/game_objects';
import { Screens } from '../../../data_objects/enums/screens';
import WordsDictCreator from '../../../find_words/words_dict_creator';

import { MultipleChoicesGameWordDictDetails } from '../../../data_objects/words/game_data_objects/multiple_choices_game_word_details';
import { MultipleChoicesGameWords } from '../../../data_objects/words/game_data_objects/multiple_choices_game_words';
import { Meaning } from '../../../data_objects/words/basic_data_objects/meaning';

const MultipleChoicesGame = () => {    
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

    const [meanings, setMeanings] = useState<string[] | undefined>([]);

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

        const gameCreater = new WordsDictCreator(settings, NewWords, UserStatistics, GAMES.MC.id);
        let wordsList: [string, { [word: string]: GameWordDictDetails }][] = Object.entries(gameCreater.createList() as MultipleChoicesGameWords);

        Object.keys(wordsList).length === 0 ? toggleGameErrorMenu() : null;

        setWords(wordsList);
    }, []);

    // Initialize other state based on words list
    useEffect(() => {
        if (words.length > 0) {
            setNewValuesForNextWord(true, false);

            let total = 0;
            words.forEach(group => {
                const wordGroup = group[1];
                total += Object.keys(wordGroup).length;  
            });
            setTotalWords(total);
        }
    }, [words]);


    const changeWord = () => {
        if ((wordPerLevelCount + 1) === amountInLevel) {
            if ((listPointer + 1) === words.length) {
                toggleEndGameMenu();
            } else {
                setNewValuesForNextWord(false, true);
            }
        } else {
            setNewValuesForNextWord(false, false);
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
        setCorrectMeaning(convertMeaningsObjectToString(newWordDetails.Meanings));
        setType(newWordDetails.Type);

        setMeanings(newWordDetails.RandomMeanings);
        // setMeanings(uniteCorrectAndIncorrectMeanings(newWordDetails));
    };

    // const uniteCorrectAndIncorrectMeanings = (wordDetails: GameWordDictDetails): string[] => {
    //     const incorrectList: string[] = wordDetails.IncorrectMeanings.map((meanings) => convertMeaningsObjectToString(meanings));
    //     const randomIndex: number = Math.floor(Math.random() * (incorrectList.length + 1));
        
    //     const allMeanings: string[] = [...incorrectList];
    //     allMeanings.splice(randomIndex, 0, convertMeaningsObjectToString(wordDetails.Meanings));

    //     return allMeanings;
    // };

    const convertMeaningsObjectToString = (meanings: Meaning[]) => {
        return meanings.map((meaning) => meaning.Meaning).join("\n");
    }

    const setIfAnswerCorrect = (isCorrect: boolean) => {
        const currentWordKey = Object.keys(words[listPointer][1])[wordPerLevelCount];
        const currentWordDetails = words[listPointer][1][currentWordKey];

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
            <Animated.View style={[MultipleChoicesGameStyle.question, {opacity: fadeAnim}]}>
                <View style={MultipleChoicesGameStyle.wordSection}>
                    <Text style={MultipleChoicesGameStyle.word}>{word}</Text>
                </View>
                <View style={MultipleChoicesGameStyle.texts}>  
                    <Text style={MultipleChoicesGameStyle.wordCounter}>סוג: {type}</Text>
                    <Text style={MultipleChoicesGameStyle.wordCounter}>רמה: {level}</Text>
                    <Text style={MultipleChoicesGameStyle.wordCounter}>כמות: {wordCount + 1}/{totalWords}</Text>
                </View>
                <View style={MultipleChoicesGameStyle.pirushim}>
                    {
                        meanings?.map((meaning) => {
                                return (
                                    <TouchableOpacity style={MultipleChoicesGameStyle.option} onPress={!next ? () => {setUserMeaning(meaning)} : () => {}} key={meaning}>
                                        <Text style={[MultipleChoicesGameStyle.optionText, {fontWeight: next && meaning === correctMeaning ? '600' : '300', 
                                            textDecorationLine: next && meaning === desiredMeaning ? 'underline' : 'none'}]}>
                                            {meaning}
                                        </Text>
                                        <Image source={meaning ===  desiredMeaning && bdika ? IMAGES.chosen_option : 
                                            meaning === correctMeaning && next ? IMAGES.correct : 
                                            next && meaning !== correctMeaning ? IMAGES.wrong : IMAGES.option} 
                                        style={MultipleChoicesGameStyle.option_image} />
                                    </TouchableOpacity>
                                )
                        })
                    }
                </View>
            </Animated.View>
            {bdika ? (
                <TouchableOpacity style={MultipleChoicesGameStyle.nextBtn} onPress={() => {setNext(true); setBdika(false);}}>
                    <Text style={MultipleChoicesGameStyle.btnText}>בדיקה</Text>
                </TouchableOpacity>
            ): null}
            {next ? (
                <TouchableOpacity style={MultipleChoicesGameStyle.nextBtn} onPress={() => {setIfAnswerCorrect(correctMeaning === desiredMeaning); changeWord();}}>
                    <Text style={MultipleChoicesGameStyle.btnText}>המשך</Text>
                </TouchableOpacity>
            ) : null}

            {isEndGame ? <EndGame correctAnswers={correctAnswers} wrongAnswers={wrongAnswers} /> : null}
        </>
    );
};

export default MultipleChoicesGame;