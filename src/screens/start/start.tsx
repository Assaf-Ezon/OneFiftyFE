import { View, Image, Text, Pressable } from 'react-native';
import { useEffect, useState } from 'react';
import StartScreenStyle from './start_style';
import { IMAGES } from '../../image_handler';

import * as AuthSession from "expo-auth-session";
import { authorize, AuthConfiguration } from 'react-native-app-auth';
import { useAutoDiscovery } from 'expo-auth-session';

const tenantName = 'OneFiftyApp'; 
const clientId = 'e448e103-0d00-4b1f-842e-96da9d017f11';
const policyName = 'B2C_1_OneFiftyApp';
const redirectUri = AuthSession.makeRedirectUri({
    scheme: 'com.OneFifty.App/auth', // Matches the scheme in app.json
    // path: 'auth',
});

const StartScreen = ({ navigation }: {navigation: any}) => {
    const [userInfo, setUserInfo] = useState(null);
    
    const authUrl = `https://${tenantName}.b2clogin.com/${tenantName}.onmicrosoft.com/${policyName}/oauth2/v2.0`;
    
    const authRequest = new AuthSession.AuthRequest({
        clientId,
        redirectUri,
        scopes: ["openid"],
        responseType: "id_token",
    });

    const discovery = {
        authorizationEndpoint: `https://${tenantName}.b2clogin.com/${tenantName}.onmicrosoft.com/${policyName}/oauth2/v2.0/authorize`,
        tokenEndpoint: `https://${tenantName}.b2clogin.com/${tenantName}.onmicrosoft.com/${policyName}/oauth2/v2.0/token`,
    };
    // const discovery = useAutoDiscovery(
    //     `https://login.microsoftonline.com/41281c6b-2583-4939-bd13-866929430e96/v2.0`,
    // );

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
    console.log(request);
    useEffect(() => {
        console.log(response);
    }, [response]); 
    
    const signIn = async () => {

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