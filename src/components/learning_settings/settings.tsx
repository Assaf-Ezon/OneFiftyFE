import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, Keyboard, TouchableWithoutFeedback, Alert } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import CheckBox from 'expo-checkbox';
import NumericInput from './numeric_input/numeric_input';

import SettingsStyle from './settings_style';

import { useLearningSettingsContext } from '../../context/settings_context/learning_context';
import { Languages } from '../../data_objects/enums/language';
import { useNavigation } from '@react-navigation/native';

const LearningSettings = () => {
    // navigation
    const navigation = useNavigation();
    
    // disable swipe right to go back
    useEffect(() => {
        navigation.setOptions({
            gestureEnabled: false,
        });
    })

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
    const [langOpen, setLangOpen] = useState<boolean>(false);
    const [langValue, setLangValue] = useState<string | null>(settings.language); 

    // type of the items for the dropdown menu
    type LangItemsType = {
        label: string;
        value: string;
    };

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
            Alert.alert('טופס לא תקין ', 'בחר כמה מילים לתרגל');
            return false;
        }
        if (!langValue) {
            Alert.alert('טופס לא תקין ', 'בחר שפה');
            return false;
        }
        if (!((smartStudy && !newWordsChecbox && !incorrectWordsChecbox && !practiceWordsChecbox) || (!smartStudy && (newWordsChecbox || incorrectWordsChecbox || practiceWordsChecbox)))) {
            Alert.alert('טופס לא תקין ', 'בחר צורת תרגול');
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
                    <Text style={SettingsStyle.title}>הגדרות:</Text>
                </View>
                <View style={SettingsStyle.SettingsPart}>
                    <View style={SettingsStyle.PickLevel}>
                        <Text style={SettingsStyle.ChooseLevelText}>בחר מילים מכל רמה (אין לעבור 100 מילים סה"כ):</Text>
                        <View style={SettingsStyle.selectLevels}>
                        {
                            Array.from({ length: 10 }, (_, i) => i + 1).map(i => (
                                <View style={SettingsStyle.checkboxContainer} key={i}>
                                <NumericInput level={i} />
                                <Text style={SettingsStyle.levelsText}>{i}</Text>
                                </View>
                            ))
                        }   
                        </View>
                        <TouchableOpacity style={SettingsStyle.RandomBtn} onPress={generateRandomNumbers}>
                            <Text style={SettingsStyle.RandomBtnText}>רנדומלי</Text>
                        </TouchableOpacity>
                    </View>

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

                    <View style={SettingsStyle.TypeOfPractice}>
                        <Text style={SettingsStyle.TypeOfPracticeTitle}>בחר צורת תרגול (אחת משתי האפשרויות):</Text>
                        <View style={SettingsStyle.OptionsContainer}>
                            <View style={[SettingsStyle.PracticeContainer, {opacity: isRegularPracticeOn() ? 0.4 : 1}]}
                            pointerEvents={ isRegularPracticeOn()  ? 'none' : 'auto' }>
                                <View style={SettingsStyle.SmartStudy}>
                                    <Text style={SettingsStyle.SmartStudyText}>תרגול חכם</Text>
                                    <CheckBox value={smartStudy} onValueChange={() => {setSmartStudy(prev => !prev)}} />
                                </View>
                                <Text style={SettingsStyle.SmartStudyDescription}>בוחר עבורך איזה מילים לתרגל (מומלץ)</Text>
                            </View>

                            <View style={SettingsStyle.VerticalLine} />

                            <View style={[SettingsStyle.PracticeContainer , {opacity: smartStudy ? 0.4 : 1}]}
                            pointerEvents={ smartStudy  ? 'none' : 'auto' }>
                                <View style={SettingsStyle.SmartStudy}>
                                    <Text style={SettingsStyle.RegularStudyText}>מילים חדשות</Text>
                                    <CheckBox value={newWordsChecbox} onValueChange={() => {setNewWordsChecbox(prev => !prev)}} />
                                </View>
                                <View style={SettingsStyle.SmartStudy}>
                                    <Text style={SettingsStyle.RegularStudyText}>מילים שלא הצלחתי</Text>
                                    <CheckBox value={incorrectWordsChecbox} onValueChange={() => {setIncorrectWordsChecbox(prev => !prev)}} />
                                </View>
                                <View style={SettingsStyle.SmartStudy}>
                                    <Text style={SettingsStyle.RegularStudyText}>מילים שתרגלתי</Text>
                                    <CheckBox value={practiceWordsChecbox} onValueChange={() => {setPracticeWordsChecbox(prev => !prev)}} />
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={SettingsStyle.LowerPart}>
                    <TouchableOpacity style={SettingsStyle.submitBtn} onPress={() => {updateSettings()}}>
                        <Text style={SettingsStyle.submitBtnText}>אישור</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};  

export default LearningSettings;
