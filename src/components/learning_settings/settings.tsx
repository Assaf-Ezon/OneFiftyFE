import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, Keyboard, TouchableWithoutFeedback, Alert } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

import CheckBox from 'expo-checkbox';
import Numeric from './numeric_input/numeric_input';

import SettingsStyle from './settings_style';

import { useLearningSettingsContext } from '../../context/settings_context/learning_context';
import { Languages } from '../../data_objects/enums/language';
import { LangItemsType } from '../../data_objects/general/lang_items_type';

const LearningSettings = () => {
    // settings context
    const {isLearningSettingOpen, toggleLearningSettings, settings, updateCheckboxes, updateLanguage, generateRandomNumbers} = useLearningSettingsContext();

    // state handling for smart study checkbox
    const [smartStudy, setSmartStudy] = useState<boolean>(settings.shouldIncludeSmartStudy);

    // state handling for regular study checkbox
    const [newWordsChecbox, setNewWordsChecbox] = useState<boolean>(settings.shouldIncludeNewWords);
    const [incorrectWordsChecbox, setIncorrectWordsChecbox] = useState<boolean>(settings.shouldIncludeIncorrectWords);
    const [practiceWordsChecbox, setPracticeWordsChecbox] = useState<boolean>(settings.shouldIncludePracticedwords);

    const isRegularPracticeOn = () => {
        return newWordsChecbox || incorrectWordsChecbox || practiceWordsChecbox;
    };  

    // state handling for language dropdown menu - 1. for open and close menu. 2. for choosing the value.
    const [langValue, setLangValue] = useState<string | null>(settings.language); 

    // the options for the dropdown menu
    const [langItems, setLangItems] = useState<LangItemsType[]>([
        {label: 'אנגלית', value: Languages.English},
        {label: 'עברית', value: Languages.Hebrew},
    ]);
    
    // update settings in context
    useEffect(() => {
        updateLanguage(langValue);
        updateCheckboxes(smartStudy, newWordsChecbox, incorrectWordsChecbox, practiceWordsChecbox);
    }, [langValue, smartStudy, newWordsChecbox, incorrectWordsChecbox, practiceWordsChecbox]);

    // checks if the form is filled correctly
    const checkForm = () => {
        if (Object.values(settings.levels).every(value => value === 0)) {
            Alert.alert('טופס לא תקין ', 'בחרו כמה מילים לתרגל');
            return false;
        }
        if (!langValue) {
            Alert.alert('טופס לא תקין ', 'בחרו שפה');
            return false;
        }
        if (!((smartStudy && !newWordsChecbox && !incorrectWordsChecbox && !practiceWordsChecbox) || (!smartStudy && (newWordsChecbox || incorrectWordsChecbox || practiceWordsChecbox)))) {
            Alert.alert('טופס לא תקין ', 'בחרו צורת תרגול');
            return false;
        }

        return true;
    };

    // updates the settings context with the choosen settings
    const updateSettings = () => {
        checkForm() ? toggleLearningSettings() : null;
    };

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={[{display: isLearningSettingOpen ? 'flex' : 'none'}, SettingsStyle.container]}>
                <View style={SettingsStyle.upperPart}>
                    <Text style={SettingsStyle.title} allowFontScaling={false}>הגדרות:</Text>
                </View>
                <View style={SettingsStyle.SettingsPart}>
                    <View style={SettingsStyle.PickLevel}>
                        <View style={SettingsStyle.LevelTitle}>
                            <Text style={SettingsStyle.ChooseLevelText} allowFontScaling={false}>בחרו מילים מכל רמה:</Text>
                            <TouchableOpacity style={SettingsStyle.RandomBtn} onPress={generateRandomNumbers}>
                                <Text style={SettingsStyle.RandomBtnText} allowFontScaling={false}>רנדומלי</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={SettingsStyle.selectLevels}>
                        {
                            Array.from({ length: 10 }, (_, i) => i + 1).map(i => (
                                <View style={SettingsStyle.checkboxContainer} key={i}>
                                <Numeric level={i} />
                                <Text style={SettingsStyle.levelsText} allowFontScaling={false}>{i}</Text>
                                </View>
                            ))
                        }   
                        </View>
                    </View>

                    <Dropdown
                        data={langItems}
                        labelField="label"
                        valueField="value"
                        value={langValue}
                        onChange={(item) => setLangValue(item.value)}
                        placeholder="בחרו שפה"
                        style={SettingsStyle.Dropdown}
                        selectedTextStyle={SettingsStyle.text}
                        inputSearchStyle={SettingsStyle.inputSearch}
                        placeholderStyle={SettingsStyle.text}
                        itemTextStyle={SettingsStyle.text}
                    />

                    <View style={SettingsStyle.TypeOfPractice}>
                        <Text style={SettingsStyle.TypeOfPracticeTitle} allowFontScaling={false}>בחרו צורת תרגול:</Text>
                        <View style={SettingsStyle.OptionsContainer}>
                            <View style={[SettingsStyle.PracticeContainer, {opacity: isRegularPracticeOn() ? 0.4 : 1}]}
                            pointerEvents={ isRegularPracticeOn()  ? 'none' : 'auto' }>
                                <View style={SettingsStyle.SmartStudy}>
                                    <Text style={SettingsStyle.SmartStudyText} allowFontScaling={false}>תרגול חכם</Text>
                                    <CheckBox value={smartStudy} onValueChange={() => {setSmartStudy(prev => !prev)}} />
                                </View>
                                <Text style={SettingsStyle.SmartStudyDescription} allowFontScaling={false}>בוחר עבורכם אילו מילים לתרגל (מומלץ)</Text>
                            </View>

                            <View style={SettingsStyle.VerticalLine} />

                            <View style={[SettingsStyle.PracticeContainer , {opacity: smartStudy ? 0.4 : 1}]}
                            pointerEvents={ smartStudy  ? 'none' : 'auto' }>
                                <View style={SettingsStyle.SmartStudy}>
                                    <Text style={SettingsStyle.RegularStudyText} allowFontScaling={false}>מילים חדשות</Text>
                                    <CheckBox value={newWordsChecbox} onValueChange={() => {setNewWordsChecbox(prev => !prev)}} />
                                </View>
                                <View style={SettingsStyle.SmartStudy}>
                                    <Text style={SettingsStyle.RegularStudyText} allowFontScaling={false}>מילים שלא הצלחתי</Text>
                                    <CheckBox value={incorrectWordsChecbox} onValueChange={() => {setIncorrectWordsChecbox(prev => !prev)}} />
                                </View>
                                <View style={SettingsStyle.SmartStudy}>
                                    <Text style={SettingsStyle.RegularStudyText} allowFontScaling={false}>מילים שתרגלתי</Text>
                                    <CheckBox value={practiceWordsChecbox} onValueChange={() => {setPracticeWordsChecbox(prev => !prev)}} />
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={SettingsStyle.LowerPart}>
                    <TouchableOpacity style={SettingsStyle.submitBtn} onPress={() => {updateSettings()}}>
                        <Text style={SettingsStyle.submitBtnText} allowFontScaling={false}>אישור</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};  

export default LearningSettings;
