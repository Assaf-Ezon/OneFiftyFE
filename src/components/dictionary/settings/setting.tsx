import { useEffect, useState } from "react";
import { View } from "react-native";

import DropDownPicker from 'react-native-dropdown-picker';

import SettingsStyle from "./settings_style";

import { useSettings } from '../../../context/dictionary_context/settings_context';

const Settings = () => {
    const { setSettings } = useSettings();

    // lang settings
    const [langOpen, setLangOpen] = useState<boolean>(false);
    const [langValue, setLangValue] = useState<string>('');
    
    type LangItemsType = {
        label: string;
        value: string;
    };

    const [langItems, setLangItems] = useState<LangItemsType[]>([
        {label: 'עברית', value: 'Hebrew'},
        {label: 'אנגלית', value: 'English'},
    ]);

    // level settings
    const [levelOpen, setLevelOpen] = useState<boolean>(false);
    const [levelValue, setLevelValue] = useState<number>(-1);
    
    type LevelItemsType = {
        label: string;
        value: number;
    };

    const [levelItems, setLevelItems] = useState<LevelItemsType[]>([
        {label: '1', value: 1},
        {label: '2', value: 2},
        {label: '3', value: 3},
        {label: '4', value: 4},
        {label: '5', value: 5},
        {label: '6', value: 6},
        {label: '7', value: 7},
        {label: '8', value: 8},
        {label: '9', value: 9},
        {label: '10', value: 10},
    ]);

    useEffect(() => {
        setSettings({ language: langValue, level: levelValue });
    }, [langOpen, levelOpen]);

    return (
        <View style={SettingsStyle.container}>
            <View style={SettingsStyle.dropDownContainer}>
                <DropDownPicker
                open={levelOpen}
                value={levelValue}
                items={levelItems}
                setOpen={setLevelOpen}
                setValue={setLevelValue}
                setItems={setLevelItems}
                placeholder='בחר רמה'
                textStyle={{textAlign: 'right'}}
                />
            </View>
            <View style={SettingsStyle.dropDownContainer}>
                <DropDownPicker
                open={langOpen}
                value={langValue}
                items={langItems}
                setOpen={setLangOpen}
                setValue={setLangValue}
                setItems={setLangItems}
                placeholder='בחר שפה'
                textStyle={{textAlign: 'right'}}
                />
            </View>
        </View>
    );
};  

export default Settings;