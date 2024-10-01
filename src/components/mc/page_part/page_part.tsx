import { Text, View, TouchableOpacity, Image, Animated } from 'react-native';
import { IMAGES } from '../../../image_handler';

import PagePartStyle from './page_part_style';

import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';

const PagePart = () => {
    const navigation = useNavigation();
    const [answer, setAnswer] = useState<boolean>(false);

    type WordsType = {
        [key: string]: string[]; 
    };

    const words: WordsType = JSON.parse('{"תְּמִימוּת דֵּעִים": ["הסכמה כוללת", "הסכמה כוללת", "אבוי", "תחושת צער עמוקה", "העמיד פני חולה"], "אַלְלַי": ["אבוי", "אבוי", "הסכמה כוללת", "תחושת צער עמוקה", "העמיד פני חולה"], "יָגוֹן": ["תחושת צער עמוקה", "העמיד פני חולה", "הגזים בדברים שהוציא מפיו או בהתנהגות שלו, החל לדבר דברים שאינם נכונים/מדויקים, עשה דברים אסורים", "תחושת צער עמוקה", "הסמכה כוללת"]}');
    const len = Object.keys(words).length;

    const [count, setCount] = useState<number>(1);
    const [word, setWord] = useState<string>(Object.entries(words)[0][0]);
    const [pirushim, setPirushim] = useState<string[]>(Object.entries(words)[0][1]); 

    const changeWord = () => {
        if (len == count) {
            navigation.goBack();
        }
        else {
            setCount(count => count + 1);
            setWord(Object.entries(words)[count][0]);
            setPirushim(Object.entries(words)[count][1]);
            setAnswer(false);
        };
    };

    const setIfAnswerCorrect = (isCorrect: boolean) => {
        /* is correct logic here */
        setAnswer(true);
    };

    const fadeAnim = useState<Animated.Value>(new Animated.Value(0))[0];

    useEffect(() => {
        fadeAnim.setValue(0);
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 100,
            useNativeDriver: true,
      }).start();
    }, [answer, fadeAnim]);

    return (
        <View style={PagePartStyle.container}>
            <View style={PagePartStyle.topPart}>
                <View style={PagePartStyle.topPartText}>
                    <TouchableOpacity onPress={() => {navigation.goBack()}}>
                        <Image source={IMAGES.back_icon} />
                    </TouchableOpacity>
                    <Text style={PagePartStyle.pageTitle}>שאלון אמריקאי</Text>
                </View>
            </View>
            <Animated.View style={[PagePartStyle.question, {opacity: fadeAnim}]}>
                <View style={PagePartStyle.wordSection}>
                    <Text style={PagePartStyle.wordCounter}>{count}/{len}</Text>
                    <Text style={PagePartStyle.word}>{word}</Text>
                </View>
                <View style={PagePartStyle.pirushim}>
                    {
                        pirushim.slice(1).map((pirush) => {
                            return (
                                <TouchableOpacity 
                                style={[PagePartStyle.option, answer ? pirushim[0] == pirush ? {backgroundColor: '#7efd2c'} : {backgroundColor: '#FF7518'} : {backgroundColor: 'white'}]} 
                                onPress={pirushim[0] == pirush ? () => {setIfAnswerCorrect(true)} : () => {setIfAnswerCorrect(false)}}>
                                    <Text style={PagePartStyle.optionText}>{pirush}</Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
            </Animated.View>
            {answer && (
                <TouchableOpacity style={PagePartStyle.nextBtn} onPress={() => {changeWord()}}>
                    <Text style={PagePartStyle.btnText}>המשך</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};  

export default PagePart;
