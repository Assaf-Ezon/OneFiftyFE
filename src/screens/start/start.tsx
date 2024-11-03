import { View, Image, Text, Pressable } from 'react-native';
import { useEffect, useState } from 'react';
import StartScreenStyle from './start_style';
import { IMAGES } from '../../image_handler';

import { Buffer } from 'buffer';
import * as SecureStore from 'expo-secure-store'
import * as AuthSession from "expo-auth-session";

const tenantName = 'OneFiftyApp'; 
const clientId = 'e448e103-0d00-4b1f-842e-96da9d017f11';
const policyName = 'B2C_1_OneFiftyApp';
const redirectUri = "com.OneFifty.App://auth"

const StartScreen = ({ navigation }: {navigation: any}) => {
    const [userInfo, setUserInfo] = useState(null);

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
        // This will enable you to keep on working and intergrating with the BE. keep on building. 
        // I will send you the base URL for our BE server - the other endpoints are elaborated in our drive in the data or BE folder.
        // I will try and find a solution for the pop-up issue + will start relying on the token as well to get the Display name and will update the Endpoints later.
        console.log(response);
        saveInfo();
    }, [response]); 

    const getNameFromDecodedJWT = (token: string) => {
        const [header, payload, signature] = token.split(".");
      
        // Decode Base64 URL-safe header and payload
        const decodedHeader = JSON.parse(atob(header.replace(/-/g, "+").replace(/_/g, "/")));
        const decodedPayload = JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/")));
        
        return decodedPayload.name;
    };

    const saveInfo = async () => {
        if (response && response.type == 'success') {
            await SecureStore.setItemAsync('token', response.params.id_token);
            await SecureStore.setItemAsync('name', getNameFromDecodedJWT(response.params.id_token));
        }  
    };

    return(
      <View style={StartScreenStyle.container}>
        <View style={StartScreenStyle.image}>
            <Image source={IMAGES.start_screen} />       
        </View>
        <View style={StartScreenStyle.textContainer}>
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