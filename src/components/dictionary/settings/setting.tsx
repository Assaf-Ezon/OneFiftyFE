import React, { useEffect, useState } from "react";
import { View } from "react-native";

import { Dropdown } from 'react-native-element-dropdown';

import SettingsStyle from "./settings_style";

import { useSettings } from '../../../context/dictionary_context/settings_context';
import { Languages } from "../../../data_objects/enums/language";
import { useWords } from "../../../context/general_context/words_context";
import { LevelItemsType } from "../../../data_objects/general/level_item_type";

const Settings = () => {
    const { setSettings } = useSettings();
    const { hebrewWords } = useWords();

    // lang settings
    const [langValue, setLangValue] = useState<string>('');
    
    type LangItemsType = {
        label: string;
        value: string;
    };

    const [langItems, setLangItems] = useState<LangItemsType[]>([
        {label: 'עברית', value: Languages.Hebrew},
        {label: 'אנגלית', value: Languages.English},
    ]);

    // level settings
    const [levelValue, setLevelValue] = useState<number>(-1);

    const [levelItems, setLevelItems] = useState<LevelItemsType[]>(() => 
        Object.keys(hebrewWords.Words).map((level) => ({
          label: String(level),
          value: Number(level), 
        }))
    );

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
            </View>
        </View>
    );
};  

export default Settings;