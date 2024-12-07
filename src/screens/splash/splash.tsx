import { View, Image, Modal, TouchableOpacity, Text, Alert } from 'react-native';
import { useEffect, useState } from 'react';

import SplashScreenStyle from './splash_style';

import { IMAGES } from '../../image_handler';
import { CONFIG } from '../../config';

import * as SecureStore from 'expo-secure-store';
import authentication from '../authentication';

import { useStackManagerContext } from '../../context/general_context/stack_manager_context';
import { useProfile } from '../../context/general_context/profile_context';
import { useWords } from '../../context/general_context/words_context';

import getProfileData from '../../requests/profile_data_request';
import { getLeaderboardData, getUserRankByName } from '../../requests/top_rated_request';

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
    const {setProfile} = useProfile();

    const [isVersionIncorrect, setIsVersionIncorrect] = useState<boolean>(false);
    const [isNotActiveOpen, setIsNotActiveOpen] = useState<boolean>(false);

    const auth = new authentication();

    useEffect(() => {
        const validation = async () => {
            const refresh_token = await SecureStore.getItemAsync(CONFIG.refresh_token);
            const refresh_token_exp = await SecureStore.getItemAsync(CONFIG.refresh_token_exp);

            // checks if the refresh and access tokens exist and if they are string type
            if (refresh_token && refresh_token_exp && typeof refresh_token_exp == 'string' && typeof refresh_token == 'string') {
                // checks if the refresh token is expired
                if (new Date(refresh_token_exp) <= (new Date())) {
                    setTimeout(() => {
                        navigation.replace('start');
                    }, 1000); 
                } else {
                    setTimeout(async () => {
                        // checks if retrieving the refresh token is successful
                        const success = await auth.refresh(refresh_token);
                        if (!success) {
                            Alert.alert('תקלה בהתחברות!');
                        }
                    }, 1000);

                    await handleUserData();
                }
            } else {
                navigation.replace('start');
            }
        }

    validation();
  }, []);
  
    const handleUserData = async () => {
        const data = await getProfileData();
        
        if (data && typeof data !== 'number' && 'UserData' in data) { 
            if (data.Version != CONFIG.Version) {
                setIsVersionIncorrect(true);
            } else if (!data.UserData.IsActive) {
                var oldDate = new Date();
                oldDate.setUTCHours(oldDate.getUTCHours() - 24);
                
                await SecureStore.setItemAsync(CONFIG.refresh_token_exp, oldDate.toISOString());
                setIsNotActiveOpen(true);
            } else {
                const leaderboardData = await getLeaderboardData('OverallScore', false);

                var userRank = 0;

                if (leaderboardData && typeof leaderboardData !== 'number' && 'Scores' in leaderboardData) {
                    const name = await SecureStore.getItemAsync('name');
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
              });

                setHebrewWords(data.HebrewWordsDictionary);
                setEnglishWords(data.EnglishWordsDictionary);
                setHebrewUserStatistics(data.HebrewUserStatistics);
                setEnglishUserStatistics(data.EnglishUserStatistics);
            }
        } else {
            Alert.alert('תקלה בהתחברות!');
            navigation.replace('start');
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
      if (Object.keys(hebrewNewWords).length > 0 && Object.keys(englishNewWords).length > 0) {
        setStackIndexByName('main');
      }
    }, [hebrewNewWords, englishNewWords]);

    return(
      <View style={{backgroundColor: "#FAF0E6", flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Image source={IMAGES.logo} />
          {
            isNotActiveOpen ? 
            <Modal animationType="fade"
            transparent={true}
            visible={true}>
                <View style={SplashScreenStyle.inactivePopup}>
                    <View style={SplashScreenStyle.inactivePopupTitleContainer}>
                        <Text style={SplashScreenStyle.inactivePopupTitle}>משתמש לא בתוקף</Text>
                    </View>
                    <View style={SplashScreenStyle.inactivePopupMainContainer}>
                        <Text style={SplashScreenStyle.inactiveExplanationText}>
                            חשבונך הינו פג תוקף מאחת מהסיבות הבאות: {'\n'}
                                1. תקופת המנוי של המשתמש נגמרה{'\n'}
                                2. תקופת הניסיון של המשתמש נגמרה{'\n'}{'\n'}{'\n'}
                                
                            על מנת להמשיך את השימוש באפליקציה, עליך לרכוש מנוי. על מנת לרכוש מנוי, לחץ על הכפתור.{'\n'}{'\n'}
                            (במידה וחלה טעות, פנה אלינו במייל שלנו: OneFifty.customers.com)
                        </Text>
                    </View>
                    <View style={SplashScreenStyle.btnsContainer}>
                        <TouchableOpacity style={SplashScreenStyle.inactivePopupBtn} onPress={() => setStackIndexByName('inactive')}>
                                <Text style={SplashScreenStyle.inactivePopupBtnText}>מעבר לתשלום</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={SplashScreenStyle.inactivePopupBtn} onPress={() => navigation.replace('start')}>
                                <Text style={SplashScreenStyle.inactivePopupBtnText}>למסך התחברות</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>  
            : null
        }
        {
            isVersionIncorrect ?
            <Modal animationType="fade"
            transparent={true}
            visible={true}>
                <View style={SplashScreenStyle.versionPopupContainer}>
                    <View style={SplashScreenStyle.versionPopupTitleContainer}>
                        <Text style={SplashScreenStyle.versionPopupTitle}>עדכן גרסה</Text>
                    </View>
                    <View style={SplashScreenStyle.versionPopupMainContainer}>
                        <Text style={SplashScreenStyle.versionExplanationText}>
                            גרסה המותקנת על מכשירך אינה העדכנית ביותר. {'\n'}
                            אנא עדכן את הגרסה על מנת להמשיך להשתמש באפליקציה{'\n'}
                        </Text>
                    </View>
                </View>
            </Modal>
            : null 
        }
      </View>
    );
};

export default SplashScreen;
