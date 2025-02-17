import { Text, View, TextInput, Image, TouchableOpacity, Alert } from 'react-native';
import { FC, useEffect, useState } from 'react';

import NumbericInputStyle from './numeric_input_style';

import { useLearningSettingsContext } from '../../../context/settings_context/learning_context';
import { GameSettingsNumericInputConfig } from '../../../data_objects/components_config/learning_page/game_settings_numeric_input_config';

const NumericInput: FC<GameSettingsNumericInputConfig> = ({ level }) => {
    // settings context
    const {settings, updateLevel} = useLearningSettingsContext();

    // use state for the quantity counter
    const [value, setValue] = useState<number>(settings.levels[level]);

    // userEffects to update the context when you change the quantity
    useEffect(() => {
        updateLevel(level, value);
    }, [value])

    // userEffects to update the value when the quantity in the levels change - in random
    useEffect(() => {
        setValue(settings.levels[level]);
    }, [settings.levels[level]]);

    // increase/decrease functions for the buttons
    const increase = () => {
        if (value < 50 && Object.values(settings.levels).reduce((total, value) => total + value, 0) < 100) {
            setValue(prevValue => prevValue + 1)
        }
    };

    const decrease = () => {
        if (value > 0) {
            setValue(prevValue => prevValue - 1)
        }
    };

    // handle numberinput
    const handleChangeText = (text: string) => {
        const numericValue = parseInt(text, 10);
    
        const currentTotal = Object.values(settings.levels).reduce((total, value) => total + value, 0) - (settings.levels[level] || 0);

        const potentialTotal = currentTotal + (isNaN(numericValue) ? 0 : numericValue);

        if (!isNaN(numericValue) && numericValue <= 50 && potentialTotal <= 100) {
            setValue(numericValue);
        } else if (!isNaN(numericValue) && numericValue > 50) {
            Alert.alert('מספר לא תקין', 'לא יכול להיות יותר מ-50 מילים ברמה אחת');
        } else if (!isNaN(numericValue) && potentialTotal > 100) {
            Alert.alert('מספר לא תקין', 'סה"כ מילים לא יכול לעבור את ה-100');
        } else {
            Alert.alert('מספר לא תקין', 'נא להזין מספר תקין');
        }
    };

    return (

        <View style={NumbericInputStyle.container}>
            <TouchableOpacity style={NumbericInputStyle.btn} onPress={decrease}>
                <Text style={NumbericInputStyle.text} allowFontScaling={false}>-</Text>
            </TouchableOpacity>
            <View style={NumbericInputStyle.inputFieldContainer}>
                <TextInput
                    style={NumbericInputStyle.inputField}
                    placeholder={value.toString()}
                    keyboardType='numeric'
                    value={value.toString()}
                    selectTextOnFocus={true}
                    onChangeText={(text) => {handleChangeText(text)}}
                    allowFontScaling={false}
                    multiline={false}
                />
            </View>
            <TouchableOpacity style={NumbericInputStyle.btn} onPress={increase}>
                <Text style={NumbericInputStyle.text} allowFontScaling={false}>+</Text>
            </TouchableOpacity>
        </View>
    );
};  

export default NumericInput;
