import { ScrollView, View } from 'react-native';

import WordsStyle from './words_style';
import Word from './word/word';

import { useSettings } from '../../../context/dictionary_context/settings_context';

const Words = () => {
    type WordType = [string, number, string, string];

    const words: WordType[] = [
        ['Hebrew', 1, 'אִסְטְנִיס', 'אנין דעת, מעודן, שאינו יכול לסבול צער, מיאוס וגועל'],
        ['Hebrew', 2, 'אִטֵּר', 'שמאלי'], 
        ['Hebrew', 3, 'בּוֹהֵק', 'מפיץ אור'], 
        ['Hebrew', 4, 'אֵימָתַי', 'מתי'], 
        ['Hebrew', 5, 'גִּיל', 'שמחה'],
    ];

    const { settings } = useSettings();

    return (
        <View style={WordsStyle.scrollviewContainer}>
            <ScrollView contentContainerStyle={[WordsStyle.container, {flexGrow: 1}]}
            showsVerticalScrollIndicator={false}>
                {words.filter(word => word[0] === settings?.language && word[1] == settings.level).map(w => {
                    return (
                        <Word word={w[2]} meaning={w[3]} key={w[2]} />
                    ); 
                })}
                <View style={WordsStyle.blank}></View>
            </ScrollView>
        </View>
    );
};

export default Words;