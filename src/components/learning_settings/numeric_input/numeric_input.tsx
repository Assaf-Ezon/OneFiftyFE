import { Alert, Dimensions } from 'react-native';
import { FC, useState } from 'react';
import NumericInput from './implementation/NumericInput';

import NumbericInputStyle from './numeric_input_style';

import { useLearningSettingsContext } from '../../../context/settings_context/learning_context';
import { GameSettingsNumericInputConfig } from '../../../data_objects/components_config/learning_page/game_settings_numeric_input_config';

const { width, height } = Dimensions.get('window');

const Numeric: FC<GameSettingsNumericInputConfig> = ({ level }) => {
    // settings context
    const {settings, updateLevel} = useLearningSettingsContext();

    // use state for the quantity counter
    const [value, setValue] = useState<number>(settings.levels[level]);

    // handle numberinput
    const handleChangeText = (value: number) => {
        const currentTotal = Object.values(settings.levels).reduce((total, value) => total + value, 0) - (settings.levels[level]);

        const potentialTotal = currentTotal + (isNaN(value) ? 0 : value);

        if (!isNaN(value) && value <= 50 && potentialTotal <= 100) {
            setValue(value);
            updateLevel(level, value);
        } else if (!isNaN(value) && value > 50) {
            Alert.alert('מספר לא תקין', 'לא יכול להיות יותר מ-50 מילים ברמה אחת');
            setValue(50);
        } else if (!isNaN(value) && potentialTotal > 100) {
            Alert.alert('מספר לא תקין', 'סה"כ מילים לא יכול לעבור את ה-100');
            setValue(100 - currentTotal);
        } else {
            Alert.alert('מספר לא תקין', 'נא להזין מספר תקין');
        }
    };

    return (
        <NumericInput
            value={value}
            onChange={(val: any) => {setValue(val); handleChangeText(val);}}
            totalWidth={width * 0.15}
            totalHeight={height * 0.03}
            step={1}
            valueType='integer' 
            rightButtonBackgroundColor='#c0c0c0' 
            leftButtonBackgroundColor='#c0c0c0'
            minValue={0}
            maxValue={Math.min(50, 100 - (Object.values(settings.levels).reduce((total, value) => total + value, 0) - (settings.levels[level])))}
            editable={true}
        />
    );
};  

export default Numeric;
