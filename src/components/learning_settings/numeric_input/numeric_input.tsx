import { Text, View, TextInput, Image, TouchableOpacity } from 'react-native';
import { FC, useEffect, useState } from 'react';

import NumbericInputStyle from './numeric_input_style';

import { useLearningSettingsContext } from '../../../context/settings_context/learning_context';

interface NumericInputInterface {
    level: number;
}

const NumericInput: FC<NumericInputInterface> = ({ level }) => {
    const {settings, updateLevel} = useLearningSettingsContext();
    const [value, setValue] = useState<number>(settings.levels[level] ?? 0);

    useEffect(() => {
        updateLevel(level, value);
    }, [value])

    const increase = () => {
        if (value < 50) {
            setValue(prevValue => prevValue + 1)
        }
    };

    const decrease = () => {
        if (value > 0) {
            setValue(prevValue => prevValue - 1)
        }
    };

    return (

        <View style={NumbericInputStyle.container}>
            <TouchableOpacity style={NumbericInputStyle.btn} onPress={decrease}>
                <Text style={NumbericInputStyle.text}>-</Text>
            </TouchableOpacity>
            <TextInput
                style={NumbericInputStyle.inputField}
                placeholder={value.toString()}
                keyboardType='numeric'
                value={value.toString()}
                onChangeText={(text) => {
                    const numericValue = parseInt(text, 10);
                    if (!isNaN(numericValue)) {
                        setValue(numericValue);
                    }
                }}
            />
            <TouchableOpacity style={NumbericInputStyle.btn} onPress={increase}>
                <Text style={NumbericInputStyle.text}>+</Text>
            </TouchableOpacity>
        </View>
    );
};  

export default NumericInput;
