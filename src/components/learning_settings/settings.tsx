import { useState } from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import CheckBox from 'expo-checkbox';
import { IMAGES } from '../../image_handler';

import SettingsStyle from './settings_style';

import { useLearningSettingsContext } from '../../context/settings_context/learning_context';

const LearningSettings = () => {
    const {isLearningSettingOpen, toggleLearningSettings} = useLearningSettingsContext();

    const [levels, setLevels] = useState([
        { level: 1, isChecked: false },
        { level: 2, isChecked: false },
        { level: 3, isChecked: false },
        { level: 4, isChecked: false },
        { level: 5, isChecked: false },
        { level: 6, isChecked: false },
        { level: 7, isChecked: false },
        { level: 8, isChecked: false },
        { level: 9, isChecked: false },
        { level: 10, isChecked: false },
      ]);

    return (
        <View style={[{display: isLearningSettingOpen ? 'flex' : 'none'}, SettingsStyle.container]}>
            <View style={SettingsStyle.upperPart}>
                <TouchableOpacity style={SettingsStyle.exitBtn} onPress={() => {toggleLearningSettings()}}>
                    <Image source={IMAGES.back_icon} />
                </TouchableOpacity>
                <Text style={SettingsStyle.title}>הגדרות:</Text>
            </View>
            <View style={SettingsStyle.SettingsPart}>
                <Text>בחר רמות:</Text>
                <View style={SettingsStyle.selectLevels}>
                    {
                        levels.map(level => {
                            return (
                                <View>
                                    <Text>{level.level}</Text>
                                    <CheckBox value={level.isChecked} />
                                </View>
                            )
                        })
                    }
                </View>
            </View>
            <View style={SettingsStyle.LowerPart}>
                <TouchableOpacity style={SettingsStyle.submitBtn} onPress={() => {toggleLearningSettings()}}>
                    <Text style={SettingsStyle.submitBtnText}>אישור</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};  

export default LearningSettings;
