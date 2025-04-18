import React, { useEffect, useState } from "react";
import { View } from "react-native";

import { Dropdown } from 'react-native-element-dropdown';

import SettingsStyle from "./settings_style";

import { useSettings } from '../../../context/dictionary_context/settings_context';
import { Languages } from "../../../data_objects/enums/language";
import { useWords } from "../../../context/general_context/words_context";
import SegmentedControl from '@react-native-segmented-control/segmented-control';

const Settings = () => {
    const { setSettings } = useSettings();
    const { hebrewWords } = useWords();

    // lang settings
    const [langValue, setLangValue] = useState<string>('');

    const langItems: { [key: string]: string } = {
        'עברית': Languages.Hebrew,
        'אנגלית': Languages.English,
    };

    // level settings
    const [levelValue, setLevelValue] = useState<number>(-1);

    const levelItems = Object.keys(hebrewWords.Words).map((level) => ({
          label: String(level),
          value: Number(level), 
        }));

    useEffect(() => {
        setSettings({ language: langValue, level: levelValue });
    }, [langValue, levelValue]);

    return (
        <View style={SettingsStyle.container}>
            <View style={SettingsStyle.dropDownContainer}>
                <Dropdown
                    data={levelItems}
                    labelField="label"
                    valueField="value"
                    value={levelValue}
                    onChange={(item) => setLevelValue(item.value)}
                    placeholder="בחרו רמה"
                    style={SettingsStyle.Dropdown}
                    selectedTextStyle={SettingsStyle.text}
                    inputSearchStyle={SettingsStyle.inputSearch}
                    placeholderStyle={SettingsStyle.text}
                    itemTextStyle={SettingsStyle.text}
                />
            </View>
            <View style={SettingsStyle.dropDownContainer}>
                <SegmentedControl
                    values={Object.keys(langItems)}
                    selectedIndex={0}
                    onChange={(event) => {
                        const index = event.nativeEvent.selectedSegmentIndex;
                        const langVal = langItems[Object.keys(langItems)[index]];
                        if (langVal){
                            setLangValue(langVal);
                        }
                    }}
                />
            </View>
        </View>
    );
};  

export default Settings;