import { View, Image, Text, Pressable, ActivityIndicator, Modal, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import StartScreenStyle from './start_style';
import { IMAGES } from '../../image_handler';
import { useProfile } from '../../context/general_context/profile_context';

import * as SecureStore from 'expo-secure-store';
import * as AuthSession from "expo-auth-session";
import getProfileData from './get_profile_data';

const tenantName = 'OneFiftyApp'; 
const clientId = 'e448e103-0d00-4b1f-842e-96da9d017f11';
const policyName = 'B2C_1_OneFiftyApp';
const redirectUri = 'com.OneFifty.App://auth';

const StartScreen = ({ navigation, toggleLoginPage }: {navigation: any, toggleLoginPage: () => void}) => {
    const {setProfile} = useProfile();
    const [loading, setLoading] = useState<boolean>(false);
    const [errorPage, setErrorPage] = useState<boolean>(false);

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

    useEffect(() => { 
        // I will try and find a solution for the pop-up issue + will start relying on the token as well to get the Display name and will update the Endpoints later.
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
            setProfile({
                name: data.UserData.DisplayName,
                email: data.UserData.Email,
                rank: 1,
                score: data.UserData.Score,
                dateJoined: new Date(data.UserData.DateJoined), 
                expirationDate: new Date(data.UserData.ExpirationDate), 
                profileImage: IMAGES.profile_images[data.UserData.ProfilePicture],
                hebrewWords: data.HebrewWordsDictionary.Words,
                englishWords: data.EnglishWordsDictionary.Words,
            });
            toggleLoginPage();
            setLoading(false);
        } else {
            setLoading(false);
            setErrorPage(true);
        }
    };

    return(
      <View style={StartScreenStyle.container}>
        <View style={[{opacity: loading || errorPage ? 0.2 : 1}, StartScreenStyle.image]} pointerEvents={ loading || errorPage ? 'none' : 'auto' }>
            <Image source={IMAGES.start_screen} />       
        </View>

        {loading ? <View style={StartScreenStyle.loadingContainer}><ActivityIndicator size="large" color="#0000ff" style={StartScreenStyle.loading} /></View> : null}   

        <Modal animationType="fade"
        transparent={true}
        visible={errorPage}>
            <View style={StartScreenStyle.errorPopup}>
                <View style={StartScreenStyle.errorPopupTitleContainer}>
                    <TouchableOpacity onPress={() => {setErrorPage(false)}}>
                        <Image source={IMAGES.back_icon} />
                    </TouchableOpacity>
                    <Text style={StartScreenStyle.popupTitle}>תקלה</Text>
                </View>
                <View style={StartScreenStyle.errorPopupMainContainer}>
                    <Text style={StartScreenStyle.popupText}>
                        אירוע לא צפוי קרה{'\n'}
                        אנא נסה שנית מאוחר יותר.{'\n'}{'\n'}{'\n'}{'\n'}
                        פנה אלינו: OneFifty.customers@gmail.com
                    </Text>
                </View>
            </View>
        </Modal>

        <View style={[{opacity: loading || errorPage ? 0.2 : 1}, StartScreenStyle.textContainer]} pointerEvents={ loading || errorPage ? 'none' : 'auto' }>
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