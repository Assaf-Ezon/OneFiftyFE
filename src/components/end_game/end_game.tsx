import { View, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { FC, useEffect, useState } from 'react';

import EndGameStyle from './end_game_style';

import { useNavigation } from '@react-navigation/native';
import AuthenticationHandler from '../../screens/AuthenticationHandler';

import { useStackManagerContext } from '../../context/general_context/stack_manager_context';
import { useWords } from '../../context/general_context/words_context';
import { useLearningSettingsContext } from '../../context/settings_context/learning_context';

import updateUserStatistics from '../../requests/update_stats_request';
import { EndGamePopupProps } from '../../Dataobjects/ComponentsProp/Games/EndGamePopupProps';

const EndGame: FC<EndGamePopupProps> = ({ correctAnswers, wrongAnswers }) => {
    const navigation = useNavigation();

    const authInstance = AuthenticationHandler.getInstance();

    const [loading, setLoading] = useState<boolean>(false);

    const { settings } = useLearningSettingsContext();
    const { handleLogout } = useStackManagerContext();
    const {hebrewWords, 
        englishWords, 
        hebrewUserStatistics, 
        setHebrewUserStatistics, 
        englishUserStatistics, 
        setEnglishUserStatistics, 
        updateNewHebrewWords, 
        updateNewEnglishWords} = useWords();
    
    const totalWords = correctAnswers.length + wrongAnswers.length; 

    const finishGame = async () => {
        setLoading(true);

        const name = await authInstance.getName();
        const token = await authInstance.getAccessToken();

        if (name && token) {
            const lang = settings.language;
            if (lang) {
                try {
                    const userStatistics = await updateUserStatistics(name, token, correctAnswers, wrongAnswers, lang);

                    switch (settings.language) {
                        case "Hebrew":
                            setHebrewUserStatistics(userStatistics.UserStatistics);
                            break;
                        case "English":
                            setEnglishUserStatistics(userStatistics.UserStatistics);
                            break;
                    }
                } catch (err) {
                    Alert.alert('קרתה תקלה לא צפויה, אנא נסה מחדש מאוחר יותר');
                }
            } else {
                Alert.alert('קרתה תקלה לא צפויה, אנא נסה מחדש מאוחר יותר');
            }

            setLoading(false);
            navigation.goBack()
        } else {
            setLoading(false);
            Alert.alert('קרתה שגיאה בהזדהות, אנא התחבר מחדש');
            handleLogout();
        }
    }

    // handles calculating new words for hebrew - when full dict and statistics are updated in the context
    useEffect(() => {
        if (Object.keys(hebrewWords).length > 0 && Object.keys(hebrewUserStatistics).length > 0) {
            updateNewHebrewWords();
        }
    }, [hebrewWords, hebrewUserStatistics]);

    // handles calculating new words for english - when full dict and statistics are updated in the context
    useEffect(() => {
        if (Object.keys(englishWords).length > 0 && Object.keys(englishUserStatistics).length > 0) {
            updateNewEnglishWords();
        }
    }, [englishWords, englishUserStatistics]);

    return (
        <View style={EndGameStyle.container}
            pointerEvents={loading ? 'none' : 'auto'}>
            <View style={EndGameStyle.titleContainer}>
                <Text style={EndGameStyle.title}>סוף התרגול</Text>
            </View>
            <View style={EndGameStyle.mainContainer}>
                <View style={EndGameStyle.sumContainer}>
                    <Text style={EndGameStyle.sum}>סה"כ מילים שתורגלו: {totalWords}</Text>
                    <Text style={EndGameStyle.lang}>שפה: {'עברית'}</Text>
                </View>
                <View style={EndGameStyle.correctContainer}>
                    <Text style={EndGameStyle.correct}>
                        סה"כ מילים שהצלחת: {correctAnswers.length} {'\n'}
                        אחוזי הצלחה: {(correctAnswers.length/totalWords)*100}%
                    </Text>
                </View>
                <View style={EndGameStyle.wrongContainer}>
                    <Text style={EndGameStyle.wrong}>
                        סה"כ מילים שנכשלת: {wrongAnswers.length} {'\n'}
                        אחוזי כישלון: {(wrongAnswers.length/totalWords)*100}%
                    </Text>
                </View>
            </View>
            <View style={[{opacity: loading ? 0.6 : 1}, EndGameStyle.btnContainer]}>
                <TouchableOpacity style={EndGameStyle.btn} onPress={() => {finishGame()}}>
                    <Text style={EndGameStyle.btnText}>סיים משחק</Text>
                </TouchableOpacity>
            </View>
            {loading ? <View style={EndGameStyle.loadingContainer}><ActivityIndicator size="large" color="black" /></View> : null}
        </View>
    );
};

export default EndGame;