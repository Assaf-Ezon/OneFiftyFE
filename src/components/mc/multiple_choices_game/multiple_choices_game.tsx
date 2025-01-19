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

import { GameWords } from '../../../data_objects/words/game_data_objects/game_words';
import { EnrichersParamName } from '../../../data_objects/enums/enrichers_param_name';
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
    const [isNextBtn, setIsNextBtn] = useState<boolean>(false);
    const [isCheckBtn, setIsCheckBtn] = useState<boolean>(false);

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
        Meanings: [{Meaning: '', Source: ''}],
        Group: 0,
        Type: "",
        ExtraParameters: {[EnrichersParamName.RandomMeanings]: []},
    });

    const [desiredMeaning, setDesiredMeaning] = useState<string>(""); // the meaning that the user chose right now

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

        const gameCreater = new WordsDictCreator(settings, NewWords, UserStatistics, GAMES.MC.id);
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
            console.log(JSON.stringify(words));
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
    };

    const setIfAnswerCorrect = (isCorrect: boolean) => {
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
        
        setIsNextBtn(false);
    };

    // changes the user's pick and reveals the first button
    const setUserMeaning = (meaning: string) => {
        setDesiredMeaning(meaning);
        setIsCheckBtn(true);
    };

    const getMeaningsAsString = (meaningsObject: Meaning[]) => {
        return meaningsObject.map((meaning) => meaning.Meaning).join("\n");
    }

    const fadeAnim = useState<Animated.Value>(new Animated.Value(0))[0];

    useEffect(() => {
        fadeIn(fadeAnim).start();
    }, [currentWord.FullWord, fadeAnim]);

    return (
        <>
            <Animated.View style={[MultipleChoicesGameStyle.question, {opacity: fadeAnim}]}>
                <View style={MultipleChoicesGameStyle.wordSection}>
                    <Text style={MultipleChoicesGameStyle.word}>{currentWord.FullWord}</Text>
                </View>
                <View style={MultipleChoicesGameStyle.texts}>  
                    <Text style={MultipleChoicesGameStyle.wordCounter}>סוג: {currentWord.Type}</Text>
                    <Text style={MultipleChoicesGameStyle.wordCounter}>רמה: {currentWord.Group}</Text>
                    <Text style={MultipleChoicesGameStyle.wordCounter}>כמות: {wordCount}/{totalWords}</Text>
                </View>
                <View style={MultipleChoicesGameStyle.pirushim}>
                    {
                        currentWord.ExtraParameters[EnrichersParamName.RandomMeanings].map((meaning: string) => {
                                return (
                                    <TouchableOpacity style={MultipleChoicesGameStyle.option} onPress={!isNextBtn ? () => {setUserMeaning(meaning)} : () => {}} key={meaning}>
                                        <Text style={[MultipleChoicesGameStyle.optionText, {fontWeight: isNextBtn && meaning === getMeaningsAsString(currentWord.Meanings) ? '600' : '300', 
                                            textDecorationLine: isNextBtn && meaning === desiredMeaning ? 'underline' : 'none'}]}>
                                            {meaning}
                                        </Text>
                                        <Image source={meaning ===  desiredMeaning && isCheckBtn ? IMAGES.chosen_option : 
                                            meaning === getMeaningsAsString(currentWord.Meanings) && isNextBtn ? IMAGES.correct : 
                                            isNextBtn && meaning !== getMeaningsAsString(currentWord.Meanings) ? IMAGES.wrong : IMAGES.option} 
                                        style={MultipleChoicesGameStyle.option_image} />
                                    </TouchableOpacity>
                                )
                        })
                    }
                </View>
            </Animated.View>
            {isCheckBtn ? (
                <TouchableOpacity style={MultipleChoicesGameStyle.nextBtn} onPress={() => {setIsNextBtn(true); setIsCheckBtn(false);}}>
                    <Text style={MultipleChoicesGameStyle.btnText}>בדיקה</Text>
                </TouchableOpacity>
            ): null}
            {isNextBtn ? (
                <TouchableOpacity style={MultipleChoicesGameStyle.nextBtn} onPress={() => {setIfAnswerCorrect(getMeaningsAsString(currentWord.Meanings) === desiredMeaning); setNewValuesForNextWord();}}>
                    <Text style={MultipleChoicesGameStyle.btnText}>המשך</Text>
                </TouchableOpacity>
            ) : null}

            {isEndGame ? <EndGame correctAnswers={correctAnswers} wrongAnswers={wrongAnswers} /> : null}
        </>
    );
};

export default MultipleChoicesGame;