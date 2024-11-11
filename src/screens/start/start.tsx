import { View, Image, Text, Pressable, ActivityIndicator, Modal, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import Popup from './popups/popups';

import StartScreenStyle from './start_style';
import { IMAGES } from '../../image_handler';

import { useProfile } from '../../context/general_context/profile_context';
import { useStackManagerContext } from '../../context/general_context/stack_manager_context';

import * as SecureStore from 'expo-secure-store';
import * as AuthSession from 'expo-auth-session';

import getProfileData from '../../requests/profile_data_request';
import { getLeaderboardData, getUserRankByName } from '../../requests/top_rated_request';

const tenantName = 'OneFiftyApp'; 
const clientId = 'e448e103-0d00-4b1f-842e-96da9d017f11';
const policyName = 'B2C_1_OneFiftyApp';
const redirectUri = 'com.OneFifty.App://auth';

const StartScreen = ({ navigation }: {navigation: any}) => {
    // contexts
    const {setProfile} = useProfile();
    const {setStackIndex} = useStackManagerContext();
    
    // loading flag
    const [loading, setLoading] = useState<boolean>(false);

    // popup flag and index
    const [popupOpen, setPopupOpen] = useState<boolean>(false);
    const [popupIndex, setPopupIndex] = useState<number>(1);

    // login handle
    const discovery = {
        authorizationEndpoint: `https://${tenantName}.b2clogin.com/${tenantName}.onmicrosoft.com/${policyName}/oauth2/v2.0/authorize`,
        tokenEndpoint: `https://${tenantName}.b2clogin.com/${tenantName}.onmicrosoft.com/${policyName}/oauth2/v2.0/token`,
    };


    const [request, response, promptAsync] = AuthSession.useAuthRequest(
        {
            clientId,
            redirectUri,
            scopes: ["openid"],
            responseType: AuthSession.ResponseType.IdToken,
            prompt: AuthSession.Prompt.Login,
            extraParams: {
                nonce: 'defaultNonce', 
            }
        },
        discovery
    );

    // activated when there is a response
    useEffect(() => { 
        const processResponse = async () => {
            if (response && response.type == 'success') {
                setLoading(true);
                await saveInfo();
                await handleUserData();
            }
        };
        processResponse();
    }, [response]); 
    
    // gets the displayName from the token
    const getNameFromDecodedJWT = (token: string) => {
        const [header, payload, signature] = token.split(".");
        
        const decodedPayload = JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/")));
        return decodedPayload.name;
    };

    // saves token and name inside the local storage
    const saveInfo = async () => {
        if (response && response.type == 'success') {
            await SecureStore.setItemAsync('token', response.params.id_token);
            await SecureStore.setItemAsync('name', getNameFromDecodedJWT(response.params.id_token));
        }  
    };

    // sets profile context with fetched data
    const handleUserData = async () => {
        const data = await getProfileData();
        
        if (data && typeof data !== 'number' && 'UserData' in data) { 
            if (!data.UserData.IsActive) {
                setPopupIndex(2);
                setPopupOpen(true);
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
                        hebrewWords: data.HebrewWordsDictionary.Words,
                        englishWords: data.EnglishWordsDictionary.Words,
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
                        hebrewWords: data.HebrewWordsDictionary.Words,
                        englishWords: data.EnglishWordsDictionary.Words,
                    });
                }

                setStackIndex(2);
                setLoading(false);
            }
        } else {
            setLoading(false);

            setPopupIndex(1);
            setPopupOpen(true);
        }
    };

    return(
      <View style={StartScreenStyle.container}>
        <View style={[{opacity: loading || popupOpen ? 0.2 : 1}, StartScreenStyle.image]} pointerEvents={ loading || popupOpen ? 'none' : 'auto' }>
            <Image source={IMAGES.start_screen} />       
        </View>

        {loading ? <View style={StartScreenStyle.loadingContainer}><ActivityIndicator size="large" color="#0000ff" style={StartScreenStyle.loading} /></View> : null}   
        {popupOpen ? <Popup index={popupIndex} setPopupOpen={setPopupOpen} /> : null}

        <View style={[{opacity: loading || popupOpen ? 0.2 : 1}, StartScreenStyle.textContainer]} pointerEvents={ loading || popupOpen ? 'none' : 'auto' }>
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