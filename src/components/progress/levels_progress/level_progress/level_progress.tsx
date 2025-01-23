import { Text, View, TouchableOpacity, Image, Dimensions } from 'react-native';
import { FC, useState } from 'react';

import { IMAGES } from '../../../../image_handler';

import LevelProgressStyle from './level_progress_style';

import { LevelProgressConfig } from '../../../../data_objects/components_config/level_progress_config';
import { useWords } from '../../../../context/general_context/words_context';
import { Languages } from '../../../../data_objects/enums/language';
import { WordsDictionary } from '../../../../data_objects/words/dIctionary/words_dictionary';
import { UserStatistics } from '../../../../data_objects/words/statistics/user_statistics';

const { width, height } = Dimensions.get('window');

const LevelProgress: FC<LevelProgressConfig> = ({ language, level }) => {
    const { hebrewWords, 
        englishWords, 
        hebrewUserStatistics, 
        englishUserStatistics } = useWords();

    const [isLevelOpen, setIsLevelOpen] = useState<boolean>(false);
    const [fullProgressBarWidth, setFullProgressBarWidth] = useState<number>(0);

    let langName: string;
    let dictionary: WordsDictionary;
    let statistics: UserStatistics;

    if (language == Languages.Hebrew) {
        langName = 'עברית';
        dictionary = hebrewWords;
        statistics = hebrewUserStatistics;
    }
    else {
        langName = 'אנגלית';
        dictionary = englishWords;
        statistics = englishUserStatistics;
    }

    // count of all words in level
    let countAllWords: number = Object.keys(dictionary.Words[level]).length;
    // seen words/all words (per level)
    let percentageWordsSeen: string = (Object.keys(statistics.WordsStatistics.Words[level] || {}).length/Object.keys(dictionary.Words[level]).length * 100).toFixed(1);
    // how many words seen/practiced in level
    let countSeenWords: number = Object.keys(statistics.WordsStatistics.Words[level] || {}).length;
    // how many words the user was only wrong in level
    let countWrongWords: number = Object.values(statistics.WordsStatistics.Words[level] || {}).filter(word => word.Successes === 0).length;
    // wrong words/all practiced words
    let percentageWrongWordsFromPracticed: string = countWrongWords ? (countWrongWords/Object.keys(statistics.WordsStatistics.Words[level] || {}).length * 100).toFixed(1) : '0.0';
    // sum of all words in statistics - Successes + Failures
    let sumOfWordsPracticed: number = 0;
    Object.values(statistics.WordsStatistics.Words[level] || {}).forEach(word => {
        sumOfWordsPracticed += word.Successes;
        sumOfWordsPracticed += word.Failures;
    });

    // Function to interpolate the color from #FF7518 to #50C878
    const getBackgroundColor = (width: number) => {
        const progressRatio = Number(percentageWordsSeen) / 100; 

        const normalizedWidth = Math.min(Math.max(progressRatio, 0), 1);

        const r = Math.round(255 - normalizedWidth * (255 - 80)); // Red: 255 → 80
        const g = Math.round(117 + normalizedWidth * (200 - 117)); // Green: 117 → 200
        const b = Math.round(24 + normalizedWidth * (120 - 24)); // Blue: 24 → 120

        return `rgb(${r}, ${g}, ${b})`; 
    };

    return (
        <View style={[{height: isLevelOpen ? height * 0.25 : height * 0.1}, LevelProgressStyle.container]}>
            <TouchableOpacity style={LevelProgressStyle.levelContainer} onPress={() => {setIsLevelOpen(prev => !prev)}}>
                <Image source={isLevelOpen ? IMAGES.open_dictionary : IMAGES.close_dictionary} />
                <Text style={LevelProgressStyle.title} allowFontScaling={false}>רמה {level}</Text>
            </TouchableOpacity>
            <View style={LevelProgressStyle.minimizedContainer}>
                    <View style={LevelProgressStyle.minimizedLangContainer}>
                        <Text allowFontScaling={false}>שפה: {langName}</Text>
                        <Text allowFontScaling={false}>סה"כ מילים: {countAllWords}</Text>
                    </View>
                    <View style={LevelProgressStyle.progressBar}>
                        <View style={[{width: `${Number(percentageWordsSeen)}%`, backgroundColor: getBackgroundColor(fullProgressBarWidth)}, 
                            LevelProgressStyle.fullPartProgressBar]} 
                            onLayout={(event) => {
                                const layoutWidth = event.nativeEvent.layout.width;
                                setFullProgressBarWidth(layoutWidth);
                              }}/>
                    </View>
            </View>
            {
                isLevelOpen ?

                <View style={LevelProgressStyle.statisticsContainer}>
                    <Text allowFontScaling={false}>סה"כ מילים חדשות שנותרו: {countAllWords-countSeenWords}</Text>
                    <Text allowFontScaling={false}>סה"כ מילים שתורגלו: {countSeenWords} ({percentageWordsSeen}%)</Text>
                    <Text allowFontScaling={false}>סה"כ מילים שלא הצלחתי בכלל: {countWrongWords} ({percentageWrongWordsFromPracticed}%)</Text>
                    <Text allowFontScaling={false}>סה"כ תרגולים ברמה: {sumOfWordsPracticed}</Text>
                </View>

                : null
            }
        </View>
    );
};  

export default LevelProgress;
