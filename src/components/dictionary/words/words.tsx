import { ScrollView, View } from 'react-native';

import WordsStyle from './words_style';
import Word from './word/word';

import { useSettings } from '../../../context/dictionary_context/settings_context';
import { Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

const Words = () => {
    type WordType = [string, number, string, string];

    const words: WordType[] = [
        ['Hebrew', 1, 'אִסְטְנִיס', 'אנין דעת, מעודן, שאינו יכול לסבול צער, מיאוס וגועל'],
        ['Hebrew', 1, 'אִטֵּר', 'שמאלי'], 
        ['Hebrew', 1, 'בּוֹהֵק', 'מפיץ אור'], 
        ['Hebrew', 1, 'אֵימָתַי', 'מתי'], 
        ['Hebrew', 1, 'גִּיל', 'שמחה'],
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
            </ScrollView>
        </View>
    );
};

export default Words;