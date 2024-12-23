import { Text, View, TouchableOpacity, Animated, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import QuestionStyle from './question_style';
import { fadeIn } from '../../../animations/fade_animations';

import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';

import { useLearningSettingsContext } from '../../../context/settings_context/learning_context';
import { useStackManagerContext } from '../../../context/general_context/stack_manager_context';
import { useWords } from '../../../context/general_context/words_context';

import createWordList from '../../../find_words';

import AuthenticationHandler from '../../../screens/AuthenticationHandler';
import updateUserStatistics from '../../../requests/update_stats_request';

enum ButtonState {
    ShowAnswer = 1,
    ChooseAnswer = 2,
    Continue = 3,
}

interface Meaning {
    Meaning: string;
    Source: string;
}

interface Word {
    FullWord: string;
    Meanings: Meaning[];
    Group: number;
    Type: string;
}


interface WordDetails {
    FullWord: string;
    Meanings: Meaning[];
    Group: number;
}

const Question = () => {
    // Navigation
    const navigation = useNavigation();

    // auth instance
    const authInstance = AuthenticationHandler.getInstance();

    // Contexts
    const { settings } = useLearningSettingsContext();
    const { handleLogout } = useStackManagerContext();
    const {hebrewWords, 
        englishWords, 
        hebrewUserStatistics, 
        setHebrewUserStatistics, 
        englishUserStatistics, 
        setEnglishUserStatistics, 
        hebrewNewWords, 
        updateNewHebrewWords, 
        englishNewWords, 
        updateNewEnglishWords} = useWords();

    // State
    const [correctAnswers, setCorrectAnswers] = useState<WordDetails[]>([]);
    const [wrongAnswers, setWrongAnswers] = useState<WordDetails[]>([]);

    const [words, setWords] = useState<[string, { [word: string]: Word }][]>([]);
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
        let wordsList: [string, { [word: string]: Word }][] = [];

        switch (settings.language) {
            case "Hebrew":
                const heCreateGame = new createWordList(settings, hebrewNewWords, hebrewUserStatistics);
                wordsList = Object.entries(heCreateGame.createList());
                break;
            case "English":
                const enCreateGame = new createWordList(settings, englishNewWords, englishUserStatistics);
                wordsList = Object.entries(enCreateGame.createList());
                break;
        }
        
        Object.keys(wordsList).length === 0 ? navigation.goBack() : null;

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
                const name = await authInstance.getName();
                const token = await authInstance.getAccessToken();

                if (name && token) {
                    const lang = settings.language;
                    if (lang) {
                        try {
                            const userStatistics = await updateUserStatistics(name, token, correctAnswers, wrongAnswers, lang);
                            switch (settings.language) {
                                case "Hebrew":
                                    setHebrewUserStatistics(userStatistics.UserStatistics);
                                    break;
                                case "English":
                                    setEnglishUserStatistics(userStatistics.UserStatistics);
                                    break;
                            }
                        } catch (err) {
                            Alert.alert('קרתה תקלה לא צפויה, אנא נסה מחדש מאוחר יותר');
                        }
                    } else {
                        Alert.alert('קרתה תקלה לא צפויה, אנא נסה מחדש מאוחר יותר');
                    }

                    navigation.goBack();
                } else {
                    Alert.alert('קרתה שגיאה בהזדהות, אנא התחבר מחדש');
                    handleLogout();
                }
                
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

    // handles calculating new words for hebrew - when full dict and statistics are updated in the context
    useEffect(() => {
        if (Object.keys(hebrewWords).length > 0 && Object.keys(hebrewUserStatistics).length > 0) {
            updateNewHebrewWords();
        }
    }, [hebrewWords, hebrewUserStatistics]);

    // handles calculating new words for english - when full dict and statistics are updated in the context
    useEffect(() => {
        if (Object.keys(englishWords).length > 0 && Object.keys(englishUserStatistics).length > 0) {
            updateNewEnglishWords();
        }
    }, [englishWords, englishUserStatistics]);

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

    // JSX
    return (
        <Animated.View style={[QuestionStyle.question, { opacity: fadeAnim }]}>
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
                    <TouchableOpacity style={QuestionStyle.btn} onPress={() => setIfAnswerCorrect(false)}>
                        <Text style={QuestionStyle.btnText}>לא ידעתי</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={QuestionStyle.btn} onPress={() => setIfAnswerCorrect(true)}>
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
    );
};

export default Question;