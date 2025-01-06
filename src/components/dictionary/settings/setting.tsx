import { useEffect, useState } from "react";
import { View } from "react-native";

import DropDownPicker from 'react-native-dropdown-picker';

import SettingsStyle from "./settings_style";

import { useSettings } from '../../../context/dictionary_context/settings_context';
import { Languages } from "../../../data_objects/enums/language";
import { useWords } from "../../../context/general_context/words_context";
import { LevelItemsType } from "../../../data_objects/general/level_item_type";

const Settings = () => {
    const { setSettings } = useSettings();
    const { hebrewWords } = useWords();

    // lang settings
    const [langOpen, setLangOpen] = useState<boolean>(false);
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
    const [levelOpen, setLevelOpen] = useState<boolean>(false);
    const [levelValue, setLevelValue] = useState<number>(-1);

    const [levelItems, setLevelItems] = useState<LevelItemsType[]>(() => 
        Object.keys(hebrewWords.Words).map((level) => ({
          label: String(level),
          value: Number(level), 
        }))
      );

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
                placeholder='בחרו רמה'
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
                placeholder='בחרו שפה'
                textStyle={{textAlign: 'right'}}
                />
            </View>
        </View>
    );
};  

export default Settings;