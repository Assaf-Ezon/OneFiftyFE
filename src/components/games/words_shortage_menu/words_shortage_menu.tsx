import { View, Text, TouchableOpacity, ScrollView } from 'react-native';

import WordsShortageMenuStyle from './words_shortage_menu_style';

import { useNavigation } from '@react-navigation/native';
import { useWordsShortageContext } from '../../../context/game_context/words_shortage_context';
import wordsGroupToTranslation from './words_group_to_translation';

const WordsShortageMenu = () => {
    const navigation = useNavigation();

    const { setIsWordsShortage, wordsShortage } = useWordsShortageContext();

    return (
        <View style={WordsShortageMenuStyle.container}>
            <View style={WordsShortageMenuStyle.textContainer}>
                <Text style={WordsShortageMenuStyle.title} allowFontScaling={false}>שים לב שבמשחק שביקשת יש פערים</Text>  
            </View>
            <View style={WordsShortageMenuStyle.ScrollviewContainer}>
                <ScrollView contentContainerStyle={WordsShortageMenuStyle.ShortageContainer}>
                    {
                        Object.entries(wordsShortage).map(([groupId, words]) => (
                            words.map((word, index) => (
                                <Text key={index} style={WordsShortageMenuStyle.desc} allowFontScaling={false}>
                                    ברמה {groupId} בסוג {wordsGroupToTranslation(word)}
                                </Text>
                            ))
                        ))
                    }
                </ScrollView>
            </View>
            <View style={WordsShortageMenuStyle.btnsContainer}>
                <TouchableOpacity style={WordsShortageMenuStyle.exitBtn} onPress={() => {setIsWordsShortage(false)}}>
                    <Text style={WordsShortageMenuStyle.exitBtnContainer} allowFontScaling={false}>המשך</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default WordsShortageMenu;