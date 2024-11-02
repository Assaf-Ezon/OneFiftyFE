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
            prompt: AuthSession.Prompt.None,
            extraParams: {
                nonce: 'defaultNonce', 
            }
        },
        discovery
    );

    //console.log(request);

    useEffect(() => { 
        // check response.type == "success" - if so validate token not null, take it and store it however you want (IN MEMORY)
        // token is base64 encoded JSON. decode it to get your dispaly name and send me the requests there (easy decode is https://jwt.ms - that way you can investigate how the token looks like and work with it).
        // This will enable you to keep on working and intergrating with the BE. keep on building. 
        // I will send you the base URL for our BE server - the other endpoints are elaborated in our drive in the data or BE folder.
        // I will try and find a solution for the pop-up issue + will start relying on the token as well to get the Display name and will update the Endpoints later.
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