import { View, Text, TouchableOpacity } from 'react-native';

import ErrorGameStyle from './error_game_style';

import { useNavigation } from '@react-navigation/native';
import { useErrorGameContext } from '../../../context/game_context/error_game_context';


const ErrorGame = () => {
    const navigation = useNavigation();

    const { toggleErrorGameMenu } = useErrorGameContext();

    const handleErrorPopupPress = () => {
        toggleErrorGameMenu();
        navigation.goBack()
    }

    return (
        <View style={ErrorGameStyle.container}>
            <View style={ErrorGameStyle.textContainer}>
                <Text style={ErrorGameStyle.title}>תקלה קרתה ביצירת משחק</Text>
                <Text style={ErrorGameStyle.desc}>אנא נסו שנית מאוחר יותר</Text>
            </View>
            <View style={ErrorGameStyle.btnsContainer}>
                <TouchableOpacity style={ErrorGameStyle.exitBtn} onPress={() => {handleErrorPopupPress()}}>
                    <Text style={ErrorGameStyle.exitBtnContainer}>יציאה</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ErrorGame;