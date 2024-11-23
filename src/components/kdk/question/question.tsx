import { Text, View, TouchableOpacity, Image, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import QuestionStyle from './question_style';
import { fadeIn } from '../../../animations/fade_animations';

import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';

const Question = () => {
    const navigation = useNavigation();
    const [answer, setAnswer] = useState<boolean>(false);

    const words = JSON.parse('{"איסטניס": "מעודן, אנין טעם", "תמימות דעים": "הסכמה כוללת", "אָסוּתָא": "לבריאות"}');
    const len = Object.keys(words).length;

    const [count, setCount] = useState<number>(1);
    const [word, setWord] = useState<string>(Object.entries(words)[0][0]);
    const [pirush, setPirush] = useState<any>(Object.entries(words)[0][1]); 

    const changeWord = () => {
        if (len == count) {
            navigation.goBack();
        }
        else {
            setCount(count => count + 1);
            setWord(Object.entries(words)[count][0]);
            setPirush(Object.entries(words)[count][1]);
            setAnswer(false);
        };
    };

    const setIfAnswerCorrect = (isCorrect: boolean) => {
        /* is correct logic here */
        setAnswer(true);
    };

    const fadeAnim = useState<Animated.Value>(new Animated.Value(0))[0];

    useEffect(() => {
        fadeIn(fadeAnim).start();
    }, [count, fadeAnim]);

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
                    <Text style={QuestionStyle.wordCounter}>{count}/{len}</Text>
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