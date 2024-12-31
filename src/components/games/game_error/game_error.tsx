import { View, Text, TouchableOpacity } from 'react-native';

import GameErrorStyle from './game_error_style';

import { useNavigation } from '@react-navigation/native';
import { useGameErrorContext } from '../../../context/game_context/game_error_context';


const GameError = () => {
    const navigation = useNavigation();

    const { toggleGameErrorMenu } = useGameErrorContext();

    const handleErrorPopupPress = () => {
        toggleGameErrorMenu();
        navigation.goBack()
    }

    return (
        <View style={GameErrorStyle.container}>
            <View style={GameErrorStyle.textContainer}>
                <Text style={GameErrorStyle.title}>תקלה קרתה ביצירת משחק</Text>
                <Text style={GameErrorStyle.desc}>אנא נסו שנית מאוחר יותר</Text>
            </View>
            <View style={GameErrorStyle.btnsContainer}>
                <TouchableOpacity style={GameErrorStyle.exitBtn} onPress={() => {handleErrorPopupPress()}}>
                    <Text style={GameErrorStyle.exitBtnContainer}>יציאה</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default GameError;