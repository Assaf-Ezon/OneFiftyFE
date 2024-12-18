import { View, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { WebView } from 'react-native-webview';
import Plan from './plan/plan';

import { useNavigation } from '@react-navigation/native';

import PlansContainerStyle from './page_part_style';

import { Plans } from '../../payment_plans';
import { Screens } from '../../screen_names';

import { CONFIG } from '../../config';
import { IMAGES } from '../../image_handler';

import { usePaymentContext } from '../../context/payment/payment_context';
import { useProfile } from '../../context/general_context/profile_context';
import { useWords } from '../../context/general_context/words_context';
import AuthenticationHandler from '../../screens/AuthenticationHandler';

import getProfileData from '../../requests/profile_data_request';
import { getLeaderboardData, getUserRankByName } from '../../requests/top_rated_request';

const PlansContainer = () => {
    const navigation = useNavigation();

    const {isPaymentWebViewOpen, setIsPaymentWebViewOpen, details} = usePaymentContext(); 
        const {setProfile, isWithin3Days} = useProfile();
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

    const authInstance = AuthenticationHandler.getInstance();

    const [canRedirect, setCanRedirect] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);

    const webviewRef = useRef<WebView | null>(null);

    const injectPaymentParams = async () => {
        if (webviewRef.current) {
            const displayName = await authInstance.getName();
            const name = details.name;
            const price = details.price;
        
            const script = `
                window.paymentParams = {
                    displayName: '${displayName}',  
                    plan: '${name}',
                    price: ${price},
                    retries: ${CONFIG.retries},
                };
            `;
        
            webviewRef.current.injectJavaScript(script);
        }
    };
    useEffect(() => {
        updateProfileAfterPurchase();
    }, [])
    const updateProfileAfterPurchase = async () => {
        setLoading(true);

        setIsPaymentWebViewOpen(false);

        const name = await authInstance.getName();
        const token = await authInstance.getAccessToken();

        const data = await getProfileData(name, token);
        
        // the user data is what we need
        if (data && 'UserData' in data) { 
            // the version is latest
            if (!data.UserData.IsActive) {
                setLoading(false);
                Alert.alert("תקלה לא צפויה קרתה, אנא פנה אלינו");
            } 
            // the user is active
            else {
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
                  trial: isWithin3Days(data.UserData.DateJoined, data.UserData.ExpirationDate),
              });

                setHebrewWords(data.HebrewWordsDictionary);
                setEnglishWords(data.EnglishWordsDictionary);
                setHebrewUserStatistics(data.HebrewUserStatistics);
                setEnglishUserStatistics(data.EnglishUserStatistics);
            }
        } else {
            setLoading(false);
            Alert.alert("תקלה לא צפויה קרתה, אנא פנה אלינו");
        }
    }

    // handles calculating new words for hebrew - when full dict and statistics are updated in the context
    useEffect(() => {
        if (Object.keys(hebrewWords).length > 0 && Object.keys(hebrewUserStatistics).length > 0) {
            updateNewHebrewWords();
            setCanRedirect(canRedirect + 1);
        }
    }, [hebrewWords, hebrewUserStatistics]);

    // handles calculating new words for english - when full dict and statistics are updated in the context
    useEffect(() => {
        if (Object.keys(englishWords).length > 0 && Object.keys(englishUserStatistics).length > 0) {
            updateNewEnglishWords();
            setCanRedirect(canRedirect + 1);
        }
    }, [englishWords, englishUserStatistics]);

    // redirection
    useEffect(() => {
        setLoading(false);
        canRedirect == 2 ? navigation.navigate(Screens.HOME) : null;
    }, [canRedirect]);

    return (
        <View style={[{opacity: loading ? 0.2 : 1}, PlansContainerStyle.mainPage]}
        pointerEvents={loading ? 'none' : 'auto'}>
            {loading ? <View><ActivityIndicator size="large" color="black" /></View> : null}
            <ScrollView showsVerticalScrollIndicator={false}>
                <Plan name={Plans.OneMonth.Plan} title={Plans.OneMonth.Title} description={Plans.OneMonth.Description} price={Plans.OneMonth.Price} isRecommended={Plans.OneMonth.isRecommended} backgroundColor={Plans.OneMonth.backgroundColor} />
                <Plan name={Plans.TwoMonths.Plan} title={Plans.TwoMonths.Title} description={Plans.TwoMonths.Description} price={Plans.TwoMonths.Price} isRecommended={Plans.TwoMonths.isRecommended} backgroundColor={Plans.TwoMonths.backgroundColor} />
                <Plan name={Plans.ThreeMonths.Plan} title={Plans.ThreeMonths.Title} description={Plans.ThreeMonths.Description} price={Plans.ThreeMonths.Price} isRecommended={Plans.ThreeMonths.isRecommended} backgroundColor={Plans.ThreeMonths.backgroundColor} />
                <View style={PlansContainerStyle.blank} />
            </ScrollView>
            {
                isPaymentWebViewOpen ? 
                    <View style={PlansContainerStyle.WebviewContainer}>
                        <WebView
                            originWhitelist={['*']}
                            ref={webviewRef}
                            onLoad={() => {
                                injectPaymentParams();  // Inject the script when the WebView has fully loaded
                            }}
                            source={require('../../../assets/html/paypal_form.html')}
                            onMessage={(event) => {
                                if (event.nativeEvent.data == 'remove') {
                                    setIsPaymentWebViewOpen(false);
                                } else if (event.nativeEvent.data == 'success') {
                                    updateProfileAfterPurchase();
                                }
                            }}
                        />
                    </View>
                : null
            }
        </View>
    );
};

export default PlansContainer;