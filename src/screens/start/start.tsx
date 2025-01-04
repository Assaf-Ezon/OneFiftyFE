import { View, Image, Text, Pressable, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';
import AuthenticationPopup from '../../components/auth_popups/authentication_popup';
import { AuthErrorType } from '../../data_objects/enums/auth_error_type';

import StartScreenStyle from './start_style';

import { IMAGES } from '../../image_handler';
import { CONFIG } from '../../config';

import { useProfile } from '../../context/general_context/profile_context';
import { useWords } from '../../context/general_context/words_context';
import { useStackManagerContext, StackNames } from '../../context/general_context/stack_manager_context';

import AuthenticationHandler from '../authentication_handler';

import { ProfileDataResponse } from '../../data_objects/requests/profile_data/profile_data_response';
import ProfileDataRequestHandler from '../../requests/requests_handlers/profile_data_request_handler';
import { LeaderboardDataResponse } from '../../data_objects/requests/leaderboard_data/leaderboard_data_response';
import LeaderboardDataRequestHandler, { getUserRankByName } from '../../requests/requests_handlers/leaderboard_data_request_handler';

const StartScreen = ({ navigation }: {navigation: any}) => {
    // contexts
    const {setProfile, IsInTrail} = useProfile();
    const {hebrewWords, 
        setHebrewWords, 
        englishWords, 
        setEnglishWords, 
        hebrewUserStatistics, 
        setHebrewUserStatistics, 
        englishUserStatistics, 
        setEnglishUserStatistics, 
        hebrewNewWords, 
        updateNewHebrewWords, 
        englishNewWords, 
        updateNewEnglishWords} = useWords();

    const {setStackIndexByName} = useStackManagerContext();
    
    const authInstance = AuthenticationHandler.getInstance();

    // prevents the first useEffect to activate when page initialized
    const [initialized, setInitialized] = useState(false);

    // loading flag
    const [loading, setLoading] = useState<boolean>(false);

    // flag for redirection 
    const [canRedirect, setCanRedirect] = useState<boolean>(false);

    // popup flag and index
    const [popupIndex, setPopupIndex] = useState<number>(AuthErrorType.None);

    const [request, response, promptAsync] = authInstance.getAuthCode();

    // activated when there is a response
    useEffect(() => { 
        const processResponse = async () => {
            if (response && response.type == 'success') {
                setLoading(true);
                await saveInfo();
                await handleUserData();
            } else {
                setLoading(false);
                setPopupIndex(AuthErrorType.Error);
            }
        };
        
        if (initialized) {
            processResponse();
        } else {
            setInitialized(true); 
        }
    }, [response]); 

    // saves token and name inside the local storage
    const saveInfo = async () => {
        if (response && response.type == 'success') {
            const success = await authInstance.getAuthToken(request, response);
            if (!success) {
                setLoading(false);

                setPopupIndex(AuthErrorType.Error);
            }
        } else {
            setPopupIndex(AuthErrorType.Error);
        }
    };

    // sets profile and words context with fetched data
    const handleUserData = async () => {
        const name = await authInstance.getName();
        const token = await authInstance.getAccessToken();

        if (name && token) {
            try {
                const data: ProfileDataResponse = await ProfileDataRequestHandler.getInstance().post({
                    DisplayName: name, 
                    token: token, 
                });
                
                // the user data is what we need
                if (data && 'UserData' in data) {
                    // if version is correct
                    if (data.Version != CONFIG.Version) {
                        setPopupIndex(AuthErrorType.IncorrectVersion);
                    }  
                    // the version is latest
                    else if (!data.UserData.IsActive) {
                        setPopupIndex(AuthErrorType.Inactive);
                    } 
                    // the user is active
                    else {
                        const leaderboardData: LeaderboardDataResponse = await LeaderboardDataRequestHandler.getInstance().post({
                            DisplayName: name,
                            token: token,
                            LeaderboardType: 'OverallScore',
                            PartialList: false,
                        });
                        
                        setProfile({
                            name: data.UserData.DisplayName,
                            email: data.UserData.Email,
                            rank: getUserRankByName(leaderboardData.Scores, name),
                            score: data.UserData.Score,
                            dateJoined: new Date(data.UserData.DateJoined), 
                            expirationDate: new Date(data.UserData.ExpirationDate), 
                            profileImage: IMAGES.profile_images[data.UserData.ProfilePicture],
                            isTrial: IsInTrail(data.UserData.DateJoined, data.UserData.ExpirationDate),
                        });

                        setHebrewWords(data.HebrewWordsDictionary);
                        setEnglishWords(data.EnglishWordsDictionary);
                        setHebrewUserStatistics(data.HebrewUserStatistics);
                        setEnglishUserStatistics(data.EnglishUserStatistics);

                        setCanRedirect(true);
                    }
                } else {
                    setLoading(false);

                    setPopupIndex(AuthErrorType.Error);
                }
            } catch (err) {
                console.error(err);
                setLoading(false);

                setPopupIndex(AuthErrorType.Error);
            }
        } else {
            setLoading(false);

            setPopupIndex(AuthErrorType.Error);
        }
    };

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

    // changes the navigation stack when the new word dict is built
    useEffect(() => {
        if (canRedirect) {
            setLoading(false);
            setStackIndexByName(StackNames.Main);
        }
      }, [canRedirect]);

    return(
      <View style={StartScreenStyle.container}>
        <View style={[{opacity: loading || popupIndex !== AuthErrorType.None ? 0.2 : 1}, StartScreenStyle.image]} 
        pointerEvents={ loading || popupIndex !== AuthErrorType.None ? 'none' : 'auto' }>
            <Image source={IMAGES.start_screen} />       
        </View>

        {loading ? <View style={StartScreenStyle.loadingContainer}><ActivityIndicator size="large" color="#0000ff" style={StartScreenStyle.loading} /></View> : null}   
        <AuthenticationPopup index={popupIndex} setPopupIndex={setPopupIndex} />

        <View style={[{opacity: loading || popupIndex !== AuthErrorType.None ? 0.2 : 1}, StartScreenStyle.textContainer]} 
        pointerEvents={ loading || popupIndex !== AuthErrorType.None ? 'none' : 'auto' }>
            <Text style={StartScreenStyle.title}>
                150 - לומדת פסיכומטרי{'\n'}
                למד מילים בכל מקום
            </Text>
            <Text style={StartScreenStyle.paragraph}>
                150 הינו כלי ללימוד מילים בעברית ובאנגלית כחלק מהכנה{'\n'}
                למבחן הפסיכומטרי. מגוון משחקונים ולומדות לצורך שינון{'\n'}
                ולמידה של מילים חדשות.
            </Text>
            <View style={StartScreenStyle.btnContainer}>
                <Pressable style={StartScreenStyle.btn} onPress={() => {promptAsync({ showInRecents: true })} }>
                    <Text style={StartScreenStyle.btnText}>בואו נתחיל</Text>            
                </Pressable>
            </View>
        </View>
      </View>
    );
};

export default StartScreen;