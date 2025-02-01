import { ScrollView, View } from 'react-native';

import WordsStyle from './words_style';
import Word from './word/word';

import { useSettings } from '../../../context/dictionary_context/settings_context';
import { useWords } from '../../../context/general_context/words_context';
import { WordDetails } from '../../../data_objects/words/basic_data_objects/word_details';
import { Languages } from '../../../data_objects/enums/language';
import { WordStatisticsData } from '../../../data_objects/words/basic_data_objects/word_statistics_data';
import WordsFormatter from '../../../words_formatter';

const Words = () => {
    const { settings } = useSettings();
    const { englishWords, hebrewWords, englishUserStatistics, hebrewUserStatistics } = useWords();
    
    let words: { [word: string]: WordDetails } = {};
    let statistics: { [groupId: number]: { [word: string]: WordStatisticsData; }; } = {};

    try {
        if (settings.level in hebrewWords.Words && settings.level in englishWords.Words) {
            switch (settings.language) {
                case Languages.Hebrew:
                    words = hebrewWords.Words[settings.level];
                    statistics = hebrewUserStatistics.WordsStatistics.Words;
                    break;
                case Languages.English:
                    words = englishWords.Words[settings.level];
                    statistics = englishUserStatistics.WordsStatistics.Words;
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
                        return (
                            <Word
                                key={wordKey}
                                word={wordKey}
                                meaning={WordsFormatter.getMeaningsAsString(wordDetails.Meanings)}
                                success={statistics[settings.level]?.[wordKey].Successes ?? 0}
                                failure={statistics[settings.level]?.[wordKey].Failures ?? 0}
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