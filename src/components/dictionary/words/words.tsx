import { useEffect } from "react";
import { ScrollView } from "react-native";

import WordsStyle from "./words_style";
import Word from './word/word';

import { useSettings } from '../../../context/dictionary_context/settings_context';
import { Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

const Words = () => {
    type WordType = [string, number, string, string];

    const words: WordType[] = [
        ['Hebrew', 1, 'אִסְטְנִיס', 'אנין דעת, מעודן, שאינו יכול לסבול צער, מיאוס וגועל'],
        ['Hebrew', 1, 'אִטֵּר', 'שמאלי'], 
        ['Hebrew', 3, 'בּוֹהֵק', 'מפיץ אור'], 
        ['Hebrew', 5, 'אֵימָתַי', 'מתי'], 
        ['Hebrew', 8, 'גִּיל', 'שמחה'],
    ];

    const { settings } = useSettings();
    const count = 5;

    return (
        <ScrollView style={WordsStyle.container} contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}>
            {words.filter(word => word[0] === settings?.language && word[1] == settings.level).map(w => {
                return (
                    <Word word={w[2]} meaning={w[3]} count={1} key={w[2]} />
                ); 
            })}
        </ScrollView>
    );
};

export default Words;