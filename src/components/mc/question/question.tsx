import { Text, View, TouchableOpacity, Image, Animated } from 'react-native';
import { IMAGES } from '../../../image_handler';

import QuestionStyle from './question_style';
import { fadeIn } from '../../../animations/fade_animations';

import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';

const Question = () => {
    const navigation = useNavigation();
    const [next, setNext] = useState<boolean>(false);
    const [bdika, setBdika] = useState<boolean>(false);

    type WordsType = {
        [key: string]: string[]; 
    };

    const words: WordsType = JSON.parse('{"תְּמִימוּת דֵּעִים": ["הסכמה כוללת", "הסכמה כוללת", "אבוי", "תחושת צער עמוקה", "העמיד פני חולה"], "אַלְלַי": ["אבוי", "אבוי", "הסכמה כוללת", "תחושת צער עמוקה", "העמיד פני חולה"], "יָגוֹן": ["תחושת צער עמוקה", "העמיד פני חולה", "הגזים בדברים שהוציא מפיו או בהתנהגות שלו, החל לדבר דברים שאינם נכונים/מדויקים, עשה דברים אסורים", "תחושת צער עמוקה", "הסמכה כוללת"]}');
    const len = Object.keys(words).length;

    const [count, setCount] = useState<number>(1);
    const [word, setWord] = useState<string>(Object.entries(words)[0][0]);
    const [pirushim, setPirushim] = useState<string[]>(Object.entries(words)[0][1]); 
    const [selectedPirush, setSelectedPirush] = useState<string|null>();

    const changeWord = () => {
        if (len == count) {
            navigation.goBack();
        }
        else {
            setCount(count => count + 1);
            setWord(Object.entries(words)[count][0]);
            setPirushim(Object.entries(words)[count][1]);
            setSelectedPirush(null);
            setNext(false);
        };
    };

    const setIfAnswerCorrect = () => {
        /* is correct logic here - selectedPirush is the chosen answer by the user */
        setNext(true);
    };

    const setDesiredPirush = (pirush: string) => {
        setSelectedPirush(pirush);
        setBdika(true);
    };

    const fadeAnim = useState<Animated.Value>(new Animated.Value(0))[0];

    useEffect(() => {
        fadeIn(fadeAnim).start();
    }, [pirushim, fadeAnim]);

    return (
        <>
            <Animated.View style={[QuestionStyle.question, {opacity: fadeAnim}]}>
                <View style={QuestionStyle.wordSection}>
                    <Text style={QuestionStyle.wordCounter}>{count}/{len}</Text>
                    <Text style={QuestionStyle.word}>{word}</Text>
                </View>
                <View style={QuestionStyle.pirushim}>
                    {
                        pirushim.slice(1).map((pirush) => {
                            return (
                                <TouchableOpacity 
                                style={QuestionStyle.option} 
                                onPress={!next ? () => {setDesiredPirush(pirush)} : () => {}}
                                key={pirush}>
                                    <Text style={[
                                    QuestionStyle.optionText, 
                                    {fontWeight: next && pirush === pirushim[0] ? '600' : '300', 
                                    textDecorationLine: next && pirush === selectedPirush ? 'underline' : 'none'}]}>
                                        {pirush}
                                    </Text>
                                    <Image source={pirush ===  selectedPirush && bdika ? IMAGES.chosen_option : 
                                        pirush === pirushim[0] && next ? IMAGES.correct : 
                                        next ? IMAGES.wrong : IMAGES.option} 
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
                <TouchableOpacity style={QuestionStyle.nextBtn} onPress={() => {setIfAnswerCorrect(); changeWord();}}>
                    <Text style={QuestionStyle.btnText}>המשך</Text>
                </TouchableOpacity>
            ) : null}
        </>
    );
};

export default Question;