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

import { Meaning } from '../../../data_objects/words/basic_data_objects/meaning';
import { GameWordState } from '../../../data_objects/general/game_word_state';

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

    const [correctAnswers, setCorrectAnswers] = useState<WordDetails[]>([]);
    const [wrongAnswers, setWrongAnswers] = useState<WordDetails[]>([]);

    const [words, setWords] = useState<[string, { [word: string]: GameWordDictDetails }][]>([]);
    const [totalWords, setTotalWords] = useState<number>(0);

    const [listIndex, setListIndex] = useState<number>(0); // index of the current level
    const [amountInLevel, setAmountInLevel] = useState<number>(0); // Words in the current level
    const [wordCount, setWordCount] = useState<number>(0); // Overall word counter
    const [wordPerLevelCount, setWordPerLevelCount] = useState<number>(0); // Counter for the current level

    const [currentWord, setCurrentWord] = useState<GameWordState>({
        word: "",
        meaning: "",
        type: "",
        level: 0,
        meanings: [],
    });

    const [desiredMeaning, setDesiredMeaning] = useState<string>("");

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
        let wordsList: [string, { [word: string]: GameWordDictDetails }][] = Object.entries(gameCreater.createList());

        Object.keys(wordsList).length === 0 ? toggleGameErrorMenu() : null;

        setWords(wordsList);
    }, []);

    // Initialize other state based on words list
    useEffect(() => {
        if (words.length > 0) {
            setNewValuesForNextWord(true);

            let total = 0;
            words.forEach(group => {
                const wordGroup = group[1];
                total += Object.keys(wordGroup).length;  
            });
            setTotalWords(total);
        }
    }, [words]);


    const setNewValuesForNextWord = (isFirstInGame: boolean) => {
        let isNextLevel: boolean = false;
        let wordsListIndex: number = listIndex;

        if (isFirstInGame) {
            wordsListIndex = 0;
        } else {
            isNextLevel = (wordPerLevelCount + 1) == amountInLevel;
        }
        
        if (isNextLevel) {
            if ((listIndex + 1) === words.length) {
                toggleEndGameMenu();
                return;
            }

            wordsListIndex = listIndex + 1;
        }

        setListIndex(wordsListIndex);
        setAmountInLevel(Object.keys(words[wordsListIndex][1]).length);

        setWordCount(isFirstInGame || isNextLevel ? 0 : wordCount + 1);
        setWordPerLevelCount(isFirstInGame || isNextLevel ? 0 : wordPerLevelCount + 1);


        const newWordKey = Object.keys(words[wordsListIndex][1])[isFirstInGame || isNextLevel ? 0 : wordPerLevelCount + 1];
        const newWordDetails = words[wordsListIndex][1][newWordKey];

        setCurrentWord({
            word: newWordKey,
            meaning: newWordDetails.Meanings.map((meaning) => meaning.Meaning).join("\n"),
            type: newWordDetails.Type,
            level: newWordDetails.Group,
            meanings: newWordDetails.RandomMeanings,
        });
    };

    const setIfAnswerCorrect = (isCorrect: boolean) => {
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
        
        setIsNextBtn(false);
    };

    // changes the user's pick and reveals the first button
    const setUserMeaning = (meaning: string) => {
        setDesiredMeaning(meaning);
        setIsCheckBtn(true);
    };

    const fadeAnim = useState<Animated.Value>(new Animated.Value(0))[0];

    useEffect(() => {
        fadeIn(fadeAnim).start();
    }, [currentWord.meaning, fadeAnim]);

    return (
        <>
            <Animated.View style={[MultipleChoicesGameStyle.question, {opacity: fadeAnim}]}>
                <View style={MultipleChoicesGameStyle.wordSection}>
                    <Text style={MultipleChoicesGameStyle.word}>{currentWord.word}</Text>
                </View>
                <View style={MultipleChoicesGameStyle.texts}>  
                    <Text style={MultipleChoicesGameStyle.wordCounter}>סוג: {currentWord.type}</Text>
                    <Text style={MultipleChoicesGameStyle.wordCounter}>רמה: {currentWord.level}</Text>
                    <Text style={MultipleChoicesGameStyle.wordCounter}>כמות: {wordCount + 1}/{totalWords}</Text>
                </View>
                <View style={MultipleChoicesGameStyle.pirushim}>
                    {
                        currentWord.meanings?.map((meaning) => {
                                return (
                                    <TouchableOpacity style={MultipleChoicesGameStyle.option} onPress={!isNextBtn ? () => {setUserMeaning(meaning)} : () => {}} key={meaning}>
                                        <Text style={[MultipleChoicesGameStyle.optionText, {fontWeight: isNextBtn && meaning === currentWord.meaning ? '600' : '300', 
                                            textDecorationLine: isNextBtn && meaning === desiredMeaning ? 'underline' : 'none'}]}>
                                            {meaning}
                                        </Text>
                                        <Image source={meaning ===  desiredMeaning && isCheckBtn ? IMAGES.chosen_option : 
                                            meaning === currentWord.meaning && isNextBtn ? IMAGES.correct : 
                                            isNextBtn && meaning !== currentWord.meaning ? IMAGES.wrong : IMAGES.option} 
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
                <TouchableOpacity style={MultipleChoicesGameStyle.nextBtn} onPress={() => {setIfAnswerCorrect(currentWord.meaning === desiredMeaning); setNewValuesForNextWord(false);}}>
                    <Text style={MultipleChoicesGameStyle.btnText}>המשך</Text>
                </TouchableOpacity>
            ) : null}

            {isEndGame ? <EndGame correctAnswers={correctAnswers} wrongAnswers={wrongAnswers} /> : null}
        </>
    );
};

export default MultipleChoicesGame;