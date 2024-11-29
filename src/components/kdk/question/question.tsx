import { Text, View, TouchableOpacity, Image, Animated } from 'react-native';
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
    const navigation = useNavigation();
    const [answer, setAnswer] = useState<boolean>(false);

    const { settings } = useLearningSettingsContext();
    const { hebrewUserStatistics, englishUserStatistics, hebrewNewWords, englishNewWords } = useWords();
    
    let words: [string, { [word: string]: Word; }][] = [];
    switch (settings.language) {
        case "Hebrew":
            const heCreateGame = new createWordList(settings, hebrewNewWords, hebrewUserStatistics);
            words = Object.entries(heCreateGame.createList());
            // console.log(JSON.stringify(words));
            break;
        case "English":
            const enCreateGame = new createWordList(settings, englishNewWords, englishUserStatistics);
            words = Object.entries(enCreateGame.createList());
            break;
    }

    const levelsAmount = words.length;
    const [listPointer, setListPointer] = useState<number>(0);
    const [level, setLevel] = useState<number>(parseInt(words[listPointer][0]));
    const [amountInLevel, setAmountInLevel] = useState<number>(Object.keys(words[listPointer][1]).length);

    let totalWords = 0;
    words.forEach(group => {
        const wordGroup = group[1];
        totalWords += Object.keys(wordGroup).length;  
    });

    const [wordCount, setWordCount] = useState<number>(0);
    const [wordPerLevelCount, setWordPerLevelCount] = useState<number>(0);

    const [word, setWord] = useState<string>(Object.keys(words[listPointer][1])[wordPerLevelCount]);
    const [pirush, setPirush] = useState<string>(words[listPointer][1][Object.keys(words[listPointer][1])[wordPerLevelCount]].Meanings.map((meaningObj: { Meaning: any; }) => meaningObj.Meaning).join("\n")); 
    const [type, setType] = useState<string>(words[listPointer][1][Object.keys(words[listPointer][1])[wordPerLevelCount]].Type);

    const changeWord = () => {
        if ((wordPerLevelCount + 1) == amountInLevel) {
            if (levelsAmount == listPointer) {
                navigation.goBack();
            } else {
                setListPointer(listPointer + 1);
                setLevel(parseInt(word[listPointer][0]));
                setAmountInLevel(Object.keys(words[0][1]).length);

                setWordCount(wordCount + 1);
                setWordPerLevelCount(0);

                setWord(Object.keys(words[listPointer][1])[wordPerLevelCount]);
                setPirush(words[listPointer][1][Object.keys(words[listPointer][1])[wordPerLevelCount]].Meanings.map((meaningObj: { Meaning: any; }) => meaningObj.Meaning).join("\n"));
            }
        } else {
            setWordCount(wordCount + 1);
            setWordPerLevelCount(wordPerLevelCount + 1);

            setWord(Object.keys(words[listPointer][1])[wordPerLevelCount]);
            setPirush(words[listPointer][1][Object.keys(words[listPointer][1])[wordPerLevelCount]].Meanings.map((meaningObj: { Meaning: any; }) => meaningObj.Meaning).join("\n"));
            setType(words[listPointer][1][Object.keys(words[listPointer][1])[wordPerLevelCount]].Type);

            setAnswer(false);
        }
    };

    const setIfAnswerCorrect = (isCorrect: boolean) => {
        /* is correct logic here */
        setAnswer(true);
    };

    const fadeAnim = useState<Animated.Value>(new Animated.Value(0))[0];

    useEffect(() => {
        fadeIn(fadeAnim).start();
    }, [wordCount, fadeAnim]);

    const btnFadeAnim = useState<Animated.Value>(new Animated.Value(0))[0];

    useEffect(() => {
        if (answer) {
            fadeIn(btnFadeAnim, 1, 200, false).start();
        } else {
            btnFadeAnim.setValue(0);
        }
    }, [answer, btnFadeAnim]);

    return (
        <>
            <Animated.View style={[QuestionStyle.question, {opacity: fadeAnim}]}>
                <View style={QuestionStyle.wordSection}>
                    <View style={QuestionStyle.texts}>
                        <Text style={QuestionStyle.wordCounter}>{wordCount + 1}/{totalWords}</Text>
                        <Text style={QuestionStyle.wordCounter}>מקבץ: {level}</Text>
                        <Text style={QuestionStyle.wordCounter}>סוג מילה: {type}</Text>
                    </View>
                    <Text style={QuestionStyle.word}>{word}</Text>
                </View>
                <View style={QuestionStyle.interpretation}>
                    <LinearGradient colors={['#F27155', '#EA7B30']}
                                    start={{ x: 1, y: 0.5 }}
                                    end={{ x: 0, y: 0.5 }}
                                    style={QuestionStyle.color}>

                        <View style={QuestionStyle.meaningContainer}>
                            {answer ? (
                                <Text style={QuestionStyle.meaning}>{pirush}</Text>
                            ) : null}
                        </View>
                    </LinearGradient>
                </View>

                {!answer ? (
                <View style={QuestionStyle.btns}>
                    <TouchableOpacity style={QuestionStyle.btn} onPress={() => {setIfAnswerCorrect(false)}}>
                        <Text style={QuestionStyle.btnText}>לא ידעתי</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={QuestionStyle.btn} onPress={() => {setIfAnswerCorrect(true)}}>
                        <Text style={QuestionStyle.btnText}>ידעתי</Text>
                    </TouchableOpacity>
                </View>
                ) : null}
                {answer ? (
                    <Animated.View style={{opacity: btnFadeAnim}}>
                        <TouchableOpacity style={QuestionStyle.nextBtn} onPress={() => {changeWord()}}>
                            <Text style={QuestionStyle.btnText}>המשך</Text>
                        </TouchableOpacity>
                    </Animated.View>
                ) : null}
            </Animated.View>
        </>
    );
};

export default Question;