import { View, Image } from 'react-native';
import { useEffect } from 'react';

import { IMAGES } from '../../image_handler';
import { CONFIG } from '../../config';

import * as SecureStore from 'expo-secure-store';
import * as AuthSession from 'expo-auth-session';

import { useStackManagerContext } from '../../context/general_context/stack_manager_context';
import { useProfile } from '../../context/general_context/profile_context';
import { useWords } from '../../context/general_context/words_context';

import getProfileData from '../../requests/profile_data_request';
import { getLeaderboardData, getUserRankByName } from '../../requests/top_rated_request';

const tenantName = 'OneFiftyApp'; 
const clientId = 'e448e103-0d00-4b1f-842e-96da9d017f11';
const policyName = 'B2C_1_OneFiftyApp';

const SplashScreen = ({ navigation }: {navigation: any}) => {
    const {setStackIndex} = useStackManagerContext();
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

    const discovery = {
        authorizationEndpoint: `https://${tenantName}.b2clogin.com/${tenantName}.onmicrosoft.com/${policyName}/oauth2/v2.0/authorize`,
        tokenEndpoint: `https://${tenantName}.b2clogin.com/${tenantName}.onmicrosoft.com/${policyName}/oauth2/v2.0/token`,
    };

    const getNameFromDecodedJWT = (token: string): string => {
        const [header, payload, signature] = token.split(".");
        
        const decodedPayload = JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/")));
        return decodedPayload.name;
    };

    useEffect(() => {
      const validation = async () => {
          const refresh_token = await SecureStore.getItemAsync(CONFIG.refresh_token)
          const refresh_token_exp = await SecureStore.getItemAsync(CONFIG.refresh_token_exp);

          if (typeof refresh_token_exp == 'string' && typeof refresh_token == 'string') {
              if (parseInt(refresh_token_exp) <= (Date.now() / 1000)) {
                  setTimeout(async () => {
                      navigation.replace('start');
                  }, 1000); 
              } else {
                  const refreshedTokenResponse = await AuthSession.refreshAsync({
                        clientId: clientId,
                        scopes: ["openid", "offline_access", "profile"],
                        refreshToken: refresh_token,
                    },
                        discovery
                  );

                  if (refreshedTokenResponse.idToken && refreshedTokenResponse.refreshToken) {
                      await SecureStore.setItemAsync(CONFIG.access_token, refreshedTokenResponse.idToken);
                      await SecureStore.setItemAsync(CONFIG.access_token_exp, ((Date.now() / 1000) + 3600).toString());
  
                      await SecureStore.setItemAsync(CONFIG.refresh_token, refreshedTokenResponse.refreshToken);
                      await SecureStore.setItemAsync(CONFIG.refresh_token_exp, ((Date.now() / 1000) + 13 * 24 * 3600).toString());
  
                      await SecureStore.setItemAsync(CONFIG.name, getNameFromDecodedJWT(refreshedTokenResponse.idToken));
                  }
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
            if (!data.UserData.IsActive) {

            } else {
                const scores = await getLeaderboardData('OverallScore', false);

                if (scores && typeof scores !== 'number' && 'Scores' in scores) {
                    const name = await SecureStore.getItemAsync('name');

                    setProfile({
                        name: data.UserData.DisplayName,
                        email: data.UserData.Email,
                        rank: getUserRankByName(scores.Scores, typeof name === 'string' ? name : ''),
                        score: data.UserData.Score,
                        dateJoined: new Date(data.UserData.DateJoined), 
                        expirationDate: new Date(data.UserData.ExpirationDate), 
                        profileImage: IMAGES.profile_images[data.UserData.ProfilePicture],
                    });
                } else {
                    setProfile({
                        name: data.UserData.DisplayName,
                        email: data.UserData.Email,
                        rank: 0,
                        score: data.UserData.Score,
                        dateJoined: new Date(data.UserData.DateJoined), 
                        expirationDate: new Date(data.UserData.ExpirationDate), 
                        profileImage: IMAGES.profile_images[data.UserData.ProfilePicture],
                    });
                }

                setHebrewWords(data.HebrewWordsDictionary);
                setEnglishWords(data.EnglishWordsDictionary);
                setHebrewUserStatistics(data.HebrewUserStatistics);
                setEnglishUserStatistics(data.EnglishUserStatistics);
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
      if (Object.keys(hebrewNewWords).length > 0 && Object.keys(englishNewWords).length > 0) {
          setStackIndex(2);
      }
    }, [hebrewNewWords, englishNewWords]);

    return(
      <View style={{backgroundColor: "#FAF0E6", flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Image source={IMAGES.logo} />
      </View>
    );
};

export default SplashScreen;
