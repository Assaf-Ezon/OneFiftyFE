import { Text, View, TouchableOpacity, Image, Dimensions } from 'react-native';
import { FC, useState } from 'react';

import { IMAGES } from '../../../../image_handler';

import LevelProgressStyle from './level_progress_style';

import { LevelProgressConfig } from '../../../../data_objects/components_config/level_progress_config';
import { useWords } from '../../../../context/general_context/words_context';
import { Languages } from '../../../../data_objects/enums/language';
import { WordsDictionary } from '../../../../data_objects/words/dIctionary/words_dictionary';
import { UserStatistics } from '../../../../data_objects/words/statistics/user_statistics';

const { height } = Dimensions.get('window');

const LevelProgress: FC<LevelProgressConfig> = ({ language, level }) => {
    const { hebrewWords, 
        englishWords, 
        hebrewUserStatistics, 
        englishUserStatistics } = useWords();

    const [isLevelOpen, setIsLevelOpen] = useState<boolean>(false);

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

    let percentageeWordsSeen: string = (Object.keys(statistics.WordsStatistics.Words[level]).length/Object.keys(dictionary.Words[level]).length * 100).toFixed(1);

    return (
        <View style={[{height: isLevelOpen ? height * 0.25 : height * 0.1}, LevelProgressStyle.container]}>
            <TouchableOpacity style={LevelProgressStyle.levelContainer} onPress={() => {setIsLevelOpen(prev => !prev)}}>
                <Image source={isLevelOpen ? IMAGES.open_dictionary : IMAGES.close_dictionary} />
                <Text style={LevelProgressStyle.title}>רמה {level}</Text>
            </TouchableOpacity>
            {
                isLevelOpen ?
                null

                : 

                <View style={LevelProgressStyle.minimizedContainer}>
                    <View style={LevelProgressStyle.minimizedLangContainer}>
                        <Text style={LevelProgressStyle.lang}>שפה: {langName}</Text>
                        <Text style={LevelProgressStyle.amountOfWords}>סה"כ מילים: {Object.keys(dictionary.Words[level]).length}</Text>
                    </View>
                    <View style={LevelProgressStyle.progressBar}>
                        <View style={[{width: `${Number(percentageeWordsSeen)}%`}, LevelProgressStyle.fullPartProgressBar]} />
                    </View>
                </View>
            }
        </View>
    );
};  

export default LevelProgress;
