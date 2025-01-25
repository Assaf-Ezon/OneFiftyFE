import { ScrollView, View } from 'react-native';

import WordsStyle from './words_style';
import Word from './word/word';

import { useSettings } from '../../../context/dictionary_context/settings_context';
import { useWords } from '../../../context/general_context/words_context';
import { WordDetails } from '../../../data_objects/words/basic_data_objects/word_details';
import { Languages } from '../../../data_objects/enums/language';

const Words = () => {
    const { settings } = useSettings();
    const { englishWords, hebrewWords } = useWords();
    
    let words: { [word: string]: WordDetails } = {};
    try {
        if (settings.level in hebrewWords.Words && settings.level in englishWords.Words) {
            switch (settings.language) {
                case Languages.Hebrew:
                    words = hebrewWords.Words[settings.level];
                    break;
                case Languages.English:
                    words = englishWords.Words[settings.level];
                    break;
            }
        }
    } catch (error) {
        console.error('An error has accourd: ', error);
    }

    return (
        <View style={WordsStyle.scrollviewContainer}>
            <ScrollView contentContainerStyle={WordsStyle.container}
            showsVerticalScrollIndicator={false}>
                {   
                    Object.entries(words).map(([wordKey, wordDetails]) => {
                        const combinedMeaning = wordDetails.Meanings.map((meaningObj: { Meaning: any; }) => meaningObj.Meaning).join("\n");
                        return (
                            <Word
                                key={wordKey}
                                word={wordKey}
                                meaning={combinedMeaning}
                            />
                        );
                    })
                }
                <View style={WordsStyle.blank}></View>
            </ScrollView>
        </View>
    );
};

export default Words;