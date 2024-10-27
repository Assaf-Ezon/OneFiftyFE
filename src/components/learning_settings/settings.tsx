import { useState } from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import CheckBox from 'expo-checkbox';
import DropDownPicker from 'react-native-dropdown-picker';

import { IMAGES } from '../../image_handler';

import SettingsStyle from './settings_style';

import { useLearningSettingsContext } from '../../context/settings_context/learning_context';

const LearningSettings = () => {
    // settings context
    const {isLearningSettingOpen, toggleLearningSettings, settings, setSettings} = useLearningSettingsContext();

    // flag for if filled correctly
    const [isfilledCorrectly, setIsFilledCorrectly] = useState<boolean>(true);

    // state handling for smart study checkbox
    const [smartStudy, setSmartStudy] = useState<boolean>(settings.smartStudy);

    // state handling for language dropdown menu - 1. for open and close menu. 2. for choosing the value.
    const [langOpen, setLangOpen] = useState<boolean>(false);
    const [langValue, setLangValue] = useState<string | null>(settings.language); 

    // type of the items for the dropdown menu
    type LangItemsType = {
        label: string;
        value: string;
    };

    // the options for the dropdown menu
    const [langItems, setLangItems] = useState<LangItemsType[]>([
        {label: 'אנגלית', value: 'English'},
        {label: 'עברית', value: 'Hebrew'},
    ]);

    // the checkbox options
    const [levels, setLevels] = useState<[number, boolean][]>(settings.levels);

    // updates the levels list state
    const toggleSpecificLevel = (level: number) => { 
        setLevels(prev => 
            prev.map(prevLevel => 
                prevLevel[0] === level 
                ? [prevLevel[0], !prevLevel[1]] 
                : prevLevel
            )
        );
    };

    // checks if the form is filled correctly
    const checkForm = () => {
        return (smartStudy) || (langValue && levels.some(level => level[1] === true));
    };

    // updates the settings context with the choosen settings
    const updateSettings = () => {
        if (checkForm()) {
            setSettings({
                smartStudy: smartStudy,
                language: langValue,
                levels: levels
            });
            setIsFilledCorrectly(true);
            toggleLearningSettings();
        } else {
            setIsFilledCorrectly(false);
        }
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
                                    <View style={SettingsStyle.checkboxContainer} key={level[0]}>
                                        <CheckBox value={level[1]} onValueChange={() => {toggleSpecificLevel(level[0])}} />
                                        <Text>{level[0]}</Text>
                                    </View>
                                )
                            })
                        }
                    </View>
                </View>
                {
                    isfilledCorrectly ? null :
                    <Text style={SettingsStyle.popupMsg}>אנא בחר שפה + רמות / תרגול חכם</Text>
                }
            </View>
            <View style={SettingsStyle.LowerPart}>
                <TouchableOpacity style={SettingsStyle.submitBtn} onPress={() => {updateSettings()}}>
                    <Text style={SettingsStyle.submitBtnText}>אישור</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};  

export default LearningSettings;
