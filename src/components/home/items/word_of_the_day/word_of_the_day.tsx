import { View, Text } from 'react-native';
import { FC } from 'react';
import {LinearGradient} from 'expo-linear-gradient';
import wordOfTheDayStyle from './word_of_the_day_style';

const WordOfTheDay: FC = () => {
    return (
        <View style={wordOfTheDayStyle.container}>
            <LinearGradient colors={['#F27155', '#EA7B30']}
                            start={{ x: 1, y: 0.5 }}
                            end={{ x: 0, y: 0.5 }}
                            style={wordOfTheDayStyle.wordOfTheDaySection}>
                <View style={wordOfTheDayStyle.title}>
                    <Text style={wordOfTheDayStyle.subTitle}>המילה היומית</Text>
                    <Text style={wordOfTheDayStyle.word}>"איסטניס"</Text>
                </View>
                <View style={wordOfTheDayStyle.meaningContainer}>
                    <Text style={wordOfTheDayStyle.meaning}>מעודן, אנין טעם</Text>
                </View>
                <View style={wordOfTheDayStyle.blankSpace}></View>
            </LinearGradient>
        </View>
    );
};

export default WordOfTheDay;