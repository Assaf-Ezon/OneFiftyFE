import { View, Image, Modal, TouchableOpacity, Text, Alert } from 'react-native';
import { useEffect, useState } from 'react';
import AuthenticationPopup from '../../components/auth_popups/authentication_popup';

import SplashScreenStyle from './splash_style';

import { IMAGES } from '../../image_handler';
import { CONFIG } from '../../config';
import { Screens } from '../../data_objects/enums/screens';

import AuthenticationHandler from '../authentication_handler';

import { StackNames, useStackManagerContext } from '../../context/general_context/stack_manager_context';
import { useProfile } from '../../context/general_context/profile_context';
import { useWords } from '../../context/general_context/words_context';

import getProfileData from '../../requests/profile_data_request';
import { getLeaderboardData, getUserRankByName } from '../../requests/top_rated_request';
import { AuthErrorType } from '../../data_objects/enums/auth_error_type';

const SplashScreen = ({ navigation }: {navigation: any}) => {
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
    const {setProfile, IsInTrail} = useProfile();

    const authInstance = AuthenticationHandler.getInstance();

    const [popupIndex, setPopupIndex] = useState<number>(AuthErrorType.None);

    const [canRedirect, setCanRedirect] = useState<boolean>(false);

    const errorHandler = () => {
        Alert.alert('תקלה בהתחברות!');
        navigation.replace(Screens.START);
    }

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
                        Alert.alert('תקלה בהתחברות!');
                        navigation.replace(Screens.START);
                    }
                
                await handleUserData();
            }
        }

        validation();
    }, []);
  
    const handleUserData = async () => {
        const name = await authInstance.getName();
        const token = await authInstance.getAccessToken();

        if (name && token) {
            try {
                const data = await getProfileData(name, token);

                // the user data is what we need
                if (data && 'UserData' in data) { 
                    // the version is latest
                    if (data.Version != CONFIG.Version) {
                        setPopupIndex(AuthErrorType.IncorrectVersion);
                    } 
                    // the user is active
                    else if (!data.UserData.IsActive) {         
                        setPopupIndex(AuthErrorType.Inactive);
                    } else {
                        const leaderboardData = await getLeaderboardData(await authInstance.getName(), await authInstance.getAccessToken(), 'OverallScore', false);

                        var userRank = 0;
                        
                        if (leaderboardData && 'Scores' in leaderboardData) {
                            const name = await authInstance.getName();
                            var userRank = getUserRankByName(leaderboardData.Scores, typeof name === 'string' ? name : '');
                        } 
                        
                        setProfile({
                        name: data.UserData.DisplayName,
                        email: data.UserData.Email,
                        rank: userRank,
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
                    errorHandler();
                }
            } catch (err) {
                console.error(err);
                errorHandler();
            }
        } else {
            errorHandler();
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
