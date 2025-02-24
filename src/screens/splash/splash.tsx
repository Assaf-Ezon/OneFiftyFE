import { View, Image, Alert } from 'react-native';
import { useEffect, useState } from 'react';
import AuthenticationPopup from '../../components/auth_popups/authentication_popup';
import useDisableBack from '../use_disable_back';

import SplashScreenStyle from './splash_style';

import { IMAGES } from '../../image_handler';
import { CONFIG } from '../../config';
import { Screens } from '../../data_objects/enums/screens';

import AuthenticationHandler from '../../authentication_handler';

import { StackNames, useStackManagerContext } from '../../context/general_context/stack_manager_context';
import { useProfile } from '../../context/general_context/profile_context';
import { useWords } from '../../context/general_context/words_context';

import { AuthErrorType } from '../../data_objects/enums/auth_error_type';
import ProfileDataRequestHandler from '../../requests/requests_handlers/profile_data_request_handler';
import { ProfileDataResponse } from '../../data_objects/requests/profile_data/profile_data_response';
import { LeaderboardDataResponse } from '../../data_objects/requests/leaderboard_data/leaderboard_data_response';
import LeaderboardDataRequestHandler, { getUserRankByName } from '../../requests/requests_handlers/leaderboard_data_request_handler';
import { RequestsError } from '../../data_objects/enums/requests_error_type';
import AuthenticationRequestsErrors from '../../requests/components_requests_errors/authentication_requests_errors';

const SplashScreen = ({ navigation }: {navigation: any}) => {
    useDisableBack(navigation);

    const {setStackIndexByName} = useStackManagerContext();
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
    const {profile, setProfile, IsInTrail, setIsTermsAndServiesValidation} = useProfile();

    const authInstance = AuthenticationHandler.getInstance();

    const [popupIndex, setPopupIndex] = useState<number>(AuthErrorType.None);

    const [canRedirect, setCanRedirect] = useState<boolean>(false);

    const errorHandler = () => {
        Alert.alert('תקלה בהתחברות!');
        navigation.replace(Screens.START);
    }

    useEffect(() => {
        navigation.setOptions({ gestureEnabled: false });
    }, []);

    useEffect(() => {        
        const validation = async () => {
            // checks if the refresh token is expired
            if (await authInstance.IsRefreshTokenExpired()) {
                setTimeout(() => {
                    navigation.replace(Screens.START);
                }, 1000); 
            } else {
                    // checks if retrieving the refresh token is successful
                    const success = await authInstance.refresh();

                    if (!success) {
                        errorHandler();
                    }
                
                await handleUserData();
            }
        }

        validation();
    }, []);
  
    const handleUserData = async () => {
        try {
            const name = await authInstance.getName();
            const token = await authInstance.getAccessToken();

            const data: ProfileDataResponse = await ProfileDataRequestHandler.getInstance().post({
                DisplayName: name, 
                token: token, 
            });

            // the version is latest
            if (data.Version != CONFIG.Version) {
                setPopupIndex(AuthErrorType.IncorrectVersion);
            } 
            // the user is active
            else if (!data.UserData.IsActive) {         
                setPopupIndex(AuthErrorType.Inactive);
            } else {
                const leaderboardData: LeaderboardDataResponse = await LeaderboardDataRequestHandler.getInstance().post({
                    DisplayName: name,
                    token: token,
                    LeaderboardType: 'OverallScore',
                    PartialList: false,
                    expirationDate: data.UserData.ExpirationDate,
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
                    lastTermsOfServiceApproval: new Date(data.UserData.LastTermsOfServiceApproval), 
                });
                
                setHebrewWords(data.HebrewWordsDictionary);
                setEnglishWords(data.EnglishWordsDictionary);
                setHebrewUserStatistics(data.HebrewUserStatistics);
                setEnglishUserStatistics(data.EnglishUserStatistics);

                setIsTermsAndServiesValidation(new Date(data.TermsOfServiceLatest) > new Date(data.UserData.LastTermsOfServiceApproval));

                setCanRedirect(true);
            }
        } catch (err) {

            if (err instanceof Error) {
                err.name == RequestsError.CredentialsError ? errorHandler() : null;
                AuthenticationRequestsErrors(err, setPopupIndex);
            } 
            else {
                errorHandler();
            }
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

    // changes the navigation stack when the new word dict is built
    useEffect(() => {
      if (canRedirect) {
        setStackIndexByName(StackNames.Main);
        profile.isTrial ? Alert.alert('יש לשים לב שהמשתמש הינו בתקופת ניסיון של כ-3 ימים') : null;
      }
    }, [canRedirect]);

    return(
      <View style={{backgroundColor: "#FAF0E6", flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Image source={IMAGES.logo} />
          <AuthenticationPopup index={popupIndex} setPopupIndex={setPopupIndex} />
      </View>
    );
};

export default SplashScreen;
