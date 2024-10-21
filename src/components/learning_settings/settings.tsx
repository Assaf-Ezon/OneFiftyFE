import { useState } from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import CheckBox from 'expo-checkbox';
import { IMAGES } from '../../image_handler';

import DropDownPicker from 'react-native-dropdown-picker';

import SettingsStyle from './settings_style';

import { useLearningSettingsContext } from '../../context/settings_context/learning_context';

const LearningSettings = () => {
    const {isLearningSettingOpen, toggleLearningSettings} = useLearningSettingsContext();

    const [smartStudy, setSmartStudy] = useState<boolean>(true);

    const [langOpen, setLangOpen] = useState<boolean>(false);
    const [langValue, setLangValue] = useState<string | null>(null);

    type LangItemsType = {
        label: string;
        value: string;
    };

    const [langItems, setLangItems] = useState<LangItemsType[]>([
        {label: 'עברית', value: 'Hebrew'},
        {label: 'אנגלית', value: 'English'},
    ]);

    const [levels, setLevels] = useState<[number, boolean][]>([
        [10, false],
        [9, false],
        [8, false],
        [7, false],
        [6, false],
        [5, false],
        [4, false],
        [3, false],
        [2, false],
        [1, false],
    ]);

    const toggleSpecificLevel = (level: number) => { 
        setLevels(prev => 
            prev.map(prevLevel => 
                prevLevel[0] === level 
                ? [prevLevel[0], !prevLevel[1]] 
                : prevLevel
            )
        );
    };

    return (
        <View style={[{display: isLearningSettingOpen ? 'flex' : 'none'}, SettingsStyle.container]}>
            <View style={SettingsStyle.upperPart}>
                <TouchableOpacity style={SettingsStyle.exitBtn} onPress={() => {toggleLearningSettings()}}>
                    <Image source={IMAGES.back_icon} />
                </TouchableOpacity>
                <Text style={SettingsStyle.title}>הגדרות:</Text>
            </View>
            <View style={SettingsStyle.SettingsPart}>
                <View style={SettingsStyle.SmartStudy}>
                    <Text style={SettingsStyle.SmartStudyText}>תרגול חכם</Text>
                    <CheckBox value={smartStudy} onValueChange={() => {setSmartStudy(prev => !prev)}} />
                </View>
                <Text style={SettingsStyle.SmartStudyDescription}>תרגול חכם הינו מתרגל אוטומטי, בחירתו משמע התעלמות מיתר ההגדרות (מומלץ).</Text>
                <DropDownPicker
                    open={langOpen}
                    value={langValue}
                    items={langItems}
                    setOpen={setLangOpen}
                    setValue={setLangValue}
                    setItems={setLangItems}
                    placeholder='בחר שפת תרגול'
                    textStyle={{textAlign: 'right'}}
                />
                <View style={SettingsStyle.PickLevel}>
                    <Text style={SettingsStyle.ChooseLevelText}>בחר רמות:</Text>
                    <View style={SettingsStyle.selectLevels}>
                        {
                            levels.map(level => {
                                return (
                                    <View style={SettingsStyle.checkboxContainer}>
                                        <CheckBox value={level[1]} onValueChange={() => {toggleSpecificLevel(level[0])}} />
                                        <Text>{level[0]}</Text>
                                    </View>
                                )
                            })
                        }
                    </View>
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
