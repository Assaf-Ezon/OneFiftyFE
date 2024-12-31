import { View, Text, TouchableOpacity } from 'react-native';

import LeaveGameStyle from './leave_game_style';

import { useNavigation } from '@react-navigation/native';
import { useLeaveGameContext } from '../../../context/game_context/leave_game_context';

const LeaveGame = () => {
    const navigation = useNavigation();

    const { toggleLeaveGameMenu } = useLeaveGameContext();

    return (
        <View style={LeaveGameStyle.container}>
            <View style={LeaveGameStyle.textContainer}>
                <Text style={LeaveGameStyle.title}>ההתקדמות שצברת במשחק לא תשמר</Text>
                <Text style={LeaveGameStyle.desc}>האם את/ה בטוח/ה שאת/ה רוצה לצאת מהמשחק?</Text>
            </View>
            <View style={LeaveGameStyle.btnsContainer}>
                <TouchableOpacity style={LeaveGameStyle.returnBtn} onPress={() => {toggleLeaveGameMenu()}}>
                    <Text style={LeaveGameStyle.returnBtnText}>חזרה למשחק</Text>
                </TouchableOpacity>
                <TouchableOpacity style={LeaveGameStyle.exitBtn} onPress={() => {navigation.goBack()}}>
                    <Text style={LeaveGameStyle.exitBtnContainer}>יציאה</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default LeaveGame;