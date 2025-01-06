import { View, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { FC, useEffect, useState } from 'react';

import EndGameStyle from './end_game_style';

import { useNavigation } from '@react-navigation/native';
import AuthenticationHandler from '../../../authentication_handler';

import { useStackManagerContext } from '../../../context/general_context/stack_manager_context';
import { useWords } from '../../../context/general_context/words_context';
import { useLearningSettingsContext } from '../../../context/settings_context/learning_context';
import { useProfile } from '../../../context/general_context/profile_context';

import { Languages } from '../../../data_objects/enums/language';
import { UpdateUserStatsResponse } from '../../../data_objects/requests/update_user_stats/update_user_stats_response';
import { EndGamesStatisticsConfig } from '../../../data_objects/components_config/end_game_popup_config';
import UpdateUserStatisticsRequestHandler from '../../../requests/requests_handlers/update_user_statistics_request_handler';
import { RequestsError } from '../../../data_objects/enums/requests_error_type';
import AppRequestsErrors from '../../../requests/components_requests_errors/app_requests_errors';

const EndGame: FC<EndGamesStatisticsConfig> = ({ correctAnswers, wrongAnswers }) => {
    const navigation = useNavigation();

    const authInstance = AuthenticationHandler.getInstance();

    const [loading, setLoading] = useState<boolean>(false);

    const { settings } = useLearningSettingsContext();
    const { profile } = useProfile();
    const { handleLogout, handleInactive } = useStackManagerContext();
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

        try {
            const name = await authInstance.getName();
            const token = await authInstance.getAccessToken();

            const lang = settings.language;

            const userStatistics: UpdateUserStatsResponse = await UpdateUserStatisticsRequestHandler.getInstance().post({
                DisplayName: name, 
                token: token, 
                WordsSuccess: correctAnswers,
                WordsFailure: wrongAnswers,
                Language: lang,
                expirationDate: profile.expirationDate,
            });

            switch (settings.language) {
                case Languages.Hebrew:
                    setHebrewUserStatistics(userStatistics.UserStatistics);
                    break;
                case Languages.English:
                    setEnglishUserStatistics(userStatistics.UserStatistics);
                    break;
            }

            setTimeout(() => {
                setLoading(false),
                navigation.goBack();
            }, 500); 
        } catch (err) {
            setLoading(false);

            if (err instanceof Error) {
                    if (err.name == RequestsError.LanguageError) {
                        Alert.alert('קרתה תקלה לא צפויה, אנא נסו מחדש מאוחר יותר');
                        navigation.goBack();                    
                    }
    
                    AppRequestsErrors(err, handleLogout, handleInactive);
            } else {
                Alert.alert('קרתה תקלה לא צפויה, אנא נסו מחדש מאוחר יותר');
                navigation.goBack();
            }
        }
    }

    // handles calculating new words for hebrew - when full dict and statistics are updated in the context
    useEffect(() => {
        if (Object.keys(hebrewWords).length > 0 && Object.keys(hebrewUserStatistics).length > 0) {
            updateNewHebrewWords();
        }
    }, [hebrewUserStatistics]);

    // handles calculating new words for english - when full dict and statistics are updated in the context
    useEffect(() => {
        if (Object.keys(englishWords).length > 0 && Object.keys(englishUserStatistics).length > 0) {
            updateNewEnglishWords();
        }
    }, [englishUserStatistics]);

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
                        סה"כ מילים שהצלחתם: {correctAnswers.length} {'\n'}
                        אחוזי הצלחה: {((correctAnswers.length/totalWords)*100).toFixed(1)}%
                    </Text>
                </View>
                <View style={EndGameStyle.wrongContainer}>
                    <Text style={EndGameStyle.wrong}>
                        סה"כ מילים שנכשלתם: {wrongAnswers.length} {'\n'}
                        אחוזי כישלון: {((wrongAnswers.length/totalWords)*100).toFixed(1)}%
                    </Text>
                </View>
            </View>
            <View style={[{opacity: loading ? 0.6 : 1}, EndGameStyle.btnContainer]}>
                <TouchableOpacity style={EndGameStyle.btn} onPress={() => {finishGame()}}>
                    <Text style={EndGameStyle.btnText}>סיום משחק</Text>
                </TouchableOpacity>
            </View>
            {loading ? <View style={EndGameStyle.loadingContainer}><ActivityIndicator size="large" color="black" /></View> : null}
        </View>
    );
};

export default EndGame;