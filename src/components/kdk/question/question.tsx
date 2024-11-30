import { Text, View, TouchableOpacity, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import QuestionStyle from './question_style';
import { fadeIn } from '../../../animations/fade_animations';

import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';

import { useLearningSettingsContext } from '../../../context/settings_context/learning_context';
import { useWords } from '../../../context/general_context/words_context';
import createWordList from '../../../find_words';

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

const Question = () => {
    // Navigation
    const navigation = useNavigation();

    // Contexts
    const { settings } = useLearningSettingsContext();
    const { hebrewUserStatistics, englishUserStatistics, hebrewNewWords, englishNewWords } = useWords();

    // State
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

    const [answer, setAnswer] = useState<number>(1); // Button states

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
    const changeWord = () => {
        if ((wordPerLevelCount + 1) === amountInLevel) {
            if ((listPointer + 1) === words.length) {
                navigation.goBack();
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

            setAnswer(1);
        }
    };

    const setIfAnswerCorrect = (isCorrect: boolean) => {
        /* Handle answer logic */
        setAnswer(3);
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
            {answer == 1 ? (
                <Animated.View style={{ opacity: btnFadeAnim }}>
                    <TouchableOpacity style={QuestionStyle.nextBtn} onPress={() =>{setAnswer(2)}}>
                        <Text style={QuestionStyle.btnText}>הצג תשובה</Text>
                    </TouchableOpacity>
                </Animated.View>
            ) : answer == 2 ? (
                <View style={QuestionStyle.btns}>
                    <TouchableOpacity style={QuestionStyle.btn} onPress={() => setIfAnswerCorrect(false)}>
                        <Text style={QuestionStyle.btnText}>לא ידעתי</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={QuestionStyle.btn} onPress={() => setIfAnswerCorrect(true)}>
                        <Text style={QuestionStyle.btnText}>ידעתי</Text>
                    </TouchableOpacity>
                </View>
            ) : answer == 3 ? (
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