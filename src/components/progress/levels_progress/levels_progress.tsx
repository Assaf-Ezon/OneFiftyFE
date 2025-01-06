import { View, ScrollView, TouchableOpacity, Text } from 'react-native';
import { useState } from 'react';

import LevelsProgressStyle from './levels_progress_style';

import LevelProgress from './level_progress/level_progress';
import { Languages } from '../../../data_objects/enums/language';
import { useWords } from '../../../context/general_context/words_context';

const LevelsProgress = () => {
    const { hebrewWords, englishWords } = useWords();

    const [lang, setLang] = useState<string>(Languages.Hebrew);

    return (
        <View style={LevelsProgressStyle.ScrollviewContainer}>
            <View style={LevelsProgressStyle.SwitchContainer}>
                <TouchableOpacity style={[{backgroundColor: lang == Languages.English ? '#FAF0E6' : 'white'}, LevelsProgressStyle.LeftSwitchBtn]} onPress={() => {setLang(Languages.English)}}>
                    <Text style={LevelsProgressStyle.SwitchText}>אנגלית</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[{backgroundColor: lang == Languages.Hebrew ? '#FAF0E6' : 'white'}, LevelsProgressStyle.RightSwitchBtn]} onPress={() => {setLang(Languages.Hebrew)}}>
                    <Text style={LevelsProgressStyle.SwitchText}>עברית</Text>
                </TouchableOpacity>
            </View>
            <ScrollView contentContainerStyle={LevelsProgressStyle.mainPart}
                    showsVerticalScrollIndicator={false}>
                
                {
                    lang == Languages.English ? 
                    Object.keys(englishWords.Words).map((level) => {
                        return (
                            <LevelProgress key={level} language={lang} level={parseInt(level)} />
                        )
                    })

                    :
                    Object.keys(hebrewWords.Words).map((level) => {
                        return (
                            <LevelProgress key={level} language={lang} level={parseInt(level)} />
                        )
                    }) 
                }

                <View style={LevelsProgressStyle.blank} />
            </ScrollView>
        </View>
    );
};  

export default LevelsProgress;
