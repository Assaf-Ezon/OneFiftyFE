import { View, Image, Text, Pressable } from 'react-native';
import { useEffect, useState } from 'react';
import StartScreenStyle from './start_style';
import { IMAGES } from '../../image_handler';

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
            extraParams: {
                nonce: 'defaultNonce', 
            }
        },
        discovery
    );

    useEffect(() => { 
        
        console.log(response);
    }, [response]); 

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