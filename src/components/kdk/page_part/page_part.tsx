import { Text, View, TouchableOpacity, Image } from 'react-native';
import { IMAGES } from '../../../image_handler';
import {LinearGradient} from 'expo-linear-gradient';

import PagePartStyle from './page_part_style';

import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';

const PagePart = () => {
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

    return (
        <View style={PagePartStyle.container}>
            <View style={PagePartStyle.topPart}>
                <View style={PagePartStyle.topPartText}>
                    <TouchableOpacity onPress={() => {navigation.goBack()}}>
                        <Image source={IMAGES.back_icon} />
                    </TouchableOpacity>
                    <Text style={PagePartStyle.pageTitle}>ידעתי / לא ידעתי</Text>
                </View>
            </View>
            <View style={PagePartStyle.question}>
                <View style={PagePartStyle.wordSection}>
                    <Text style={PagePartStyle.wordCounter}>{count}/{len}</Text>
                    <Text style={PagePartStyle.word}>{word}</Text>
                </View>
                <View style={PagePartStyle.interpretation}>
                    <LinearGradient colors={['#F27155', '#EA7B30']}
                                    start={{ x: 1, y: 0.5 }}
                                    end={{ x: 0, y: 0.5 }}
                                    style={PagePartStyle.color}>

                        <View style={PagePartStyle.meaningContainer}>
                            {answer && (
                                <Text style={PagePartStyle.meaning}>{pirush}</Text>
                            )}
                        </View>
                    </LinearGradient>
                </View>

                {!answer && (
                <View style={PagePartStyle.btns}>
                    <TouchableOpacity style={PagePartStyle.btn} onPress={() => {setIfAnswerCorrect(false)}}>
                        <Text style={PagePartStyle.btnText}>לא ידעתי</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={PagePartStyle.btn} onPress={() => {setIfAnswerCorrect(true)}}>
                        <Text style={PagePartStyle.btnText}>ידעתי</Text>
                    </TouchableOpacity>
                </View>
                )}
                {answer && (
                    <TouchableOpacity style={PagePartStyle.nextBtn} onPress={() => {changeWord()}}>
                        <Text style={PagePartStyle.btnText}>המשך</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};  

export default PagePart;
