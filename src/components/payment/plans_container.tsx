import { View, ScrollView, ActivityIndicator, Alert, Platform } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { WebView } from 'react-native-webview';
import Plan from './plan/plan';

import PlansContainerStyle from './plans_container_style';

import { Plans } from '../../data_objects/enums/payment_plans';

import { CONFIG } from '../../config';

import { usePaymentContext } from '../../context/payment_context/payment_context';
import AuthenticationHandler from '../../authentication_handler';

import { useStackManagerContext, StackNames } from '../../context/general_context/stack_manager_context';
import { getProducts, requestSubscription, useIAP, validateReceiptIos } from 'react-native-iap';
import { Screens } from '../../data_objects/enums/screens';
import SubscriptionsRequestHandler from '../../requests/requests_handlers/subscriptions_request_handler';
import { useNavigation } from '@react-navigation/native';
import { APP_STORE_SECRET } from "@env";

const PlansContainer = () => {
    // contexts
    const {isPaymentWebViewOpen, setIsPaymentWebViewOpen, details} = usePaymentContext(); 
    const {setStackIndexByName, handleLogout} = useStackManagerContext();

    //auth instance
    const authInstance = AuthenticationHandler.getInstance();

    // reference to the webview
    const webviewRef = useRef<WebView | null>(null);

    // IAP
    const {
        connected,
        currentPurchase, // current purchase for the tranasction
        finishTransaction,
    } = useIAP();

    // Redirection
    const navigation = useNavigation();

    const [Loading, setLoading] = useState<boolean>(false);

    // Initialize IAP when component mounts
    useEffect(() => {
        const WaitForConnection = async () => {
            try {
                setLoading(true);
                let attempts = 0;
                const maxAttempts = 10; // 10 seconds timeout
                while (!connected && attempts < maxAttempts) {
                    await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second
                    attempts++;
                }
            } catch (error) {
                Alert.alert("Failed to connect to store");
            }

            setLoading(false);
        };
        WaitForConnection();
    }, []);

    const Subscribe = async (productId: string, planName: string) => {
        try {
            if (!connected) {
                Alert.alert('Error', 'Store connection not ready. Please try again.');
                return;
            }
            
            const subscription = await getProducts({ skus: [productId] });
            await requestSubscription({
                sku: productId,
            });
            setLoading(true);
            console.log("test");
            // After requestSubscription, check for the purchase and handle the receipt
            // You may need to wait for currentPurchase to update, so you can poll or use a callback if your IAP library supports it
            // Here's a simple polling approach:
            let attempts = 0;
            const maxAttempts = 10;
            while (!currentPurchase && attempts < maxAttempts) {
                await new Promise(resolve => setTimeout(resolve, 500));
                attempts++;
            }
            if (currentPurchase) {
                console.log("testtest");
                await handleReceipt(currentPurchase, planName);
            }
        } catch (error) {
            Alert.alert("תשלום נכשל, אנא וודא חיבור נאות לחנות האפליקציות. אם בעיה זו נמשכת, אנא פנה אלינו.");
        }

        setLoading(false);
    }

    const handleReceipt = async (purchase: any, planName: string) => {
        if (purchase) {
            try {
                console.log("In checkCurrentPurchase");
                const receipt = purchase.transactionReceipt;
                const originalTransactionIdentifierIOS = purchase.originalTransactionIdentifierIOS;
                if (receipt) {
                    console.log("In checkCurrentPurchase - receipt");
                    if (Platform.OS === "ios") {
                        const isTestEnvironment = __DEV__;
            
                        //send receipt body to apple server to validete
                        const appleReceiptResponse = await validateReceiptIos(
                            {
                                "receiptBody":{
                                    "receipt-data": receipt,
                                    password: APP_STORE_SECRET,
                                },
                                "isTest": isTestEnvironment,
                            }
                        );
            
                        //if receipt is valid
                        if (appleReceiptResponse) {
                            console.log("In checkCurrentPurchase - sending to server: " + JSON.stringify(receipt) + "HEHEEHE" + JSON.stringify(originalTransactionIdentifierIOS));
                            const { status } = appleReceiptResponse;
                            if (status == 0) {
                                const displayName = await authInstance.getName();
                                const token = await authInstance.getAccessToken();
                                console.log("In checkCurrentPurchase - sending to server - 2");
                                await SubscriptionsRequestHandler.getInstance().post({
                                    DisplayName: displayName,
                                    Plan: planName,
                                    IAPType: "Apple",
                                    AppleIAPData: {
                                        originalTransactionId: originalTransactionIdentifierIOS,
                                        latestReceipt: receipt,
                                    },
                                    GoogleIAPData: {
                                        
                                    },
                                    token: token,
                                });
                                console.log("In checkCurrentPurchase - sent to server");
                                setLoading(false);
                                setStackIndexByName(StackNames.Auth);
                            }
                        }
            
                        return;
                    }
                }
            } catch (error) {
                console.log("error", error);
            }
        }
    };

    // parameters passed to the webview
    const injectPaymentParams = async () => {
        if (webviewRef.current) {
            const token = await authInstance.getAccessToken();
            const displayName = await authInstance.getName();
            const name = details.name;
            const price = details.price;

            if (name && token) {
                const script = `
                    window.paymentParams = {
                        token: '${token}',
                        displayName: '${displayName}',  
                        plan: '${name}',
                        price: ${price},
                        retries: ${CONFIG.retries},
                    };
                `;
        
                webviewRef.current.injectJavaScript(script);
            } else {
                Alert.alert('קרתה שגיאה בהזדהות, אנא התחברו מחדש');
                handleLogout();
            }
        }
    };

    return (
        <View style={[{opacity: Loading? 0.6 : 1}, PlansContainerStyle.mainPage]}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Plan name={Plans.OneMonth.Plan} title={Plans.OneMonth.Title} description={Plans.OneMonth.Description} price={Plans.OneMonth.Price} backgroundColor={Plans.OneMonth.backgroundColor} onPress={() => Subscribe(Plans.OneMonth.productId[0], Plans.OneMonth.Plan)} />
                <Plan name={Plans.TwoMonths.Plan} title={Plans.TwoMonths.Title} description={Plans.TwoMonths.Description} price={Plans.TwoMonths.Price} backgroundColor={Plans.TwoMonths.backgroundColor} onPress={() => Subscribe(Plans.TwoMonths.productId[0], Plans.TwoMonths.Plan)} />
                <Plan name={Plans.ThreeMonths.Plan} title={Plans.ThreeMonths.Title} description={Plans.ThreeMonths.Description} price={Plans.ThreeMonths.Price} backgroundColor={Plans.ThreeMonths.backgroundColor} onPress={() => Subscribe(Plans.ThreeMonths.productId[0], Plans.ThreeMonths.Plan)} />
                <Plan name={Plans.SixMonths.Plan} title={Plans.SixMonths.Title} description={Plans.SixMonths.Description} price={Plans.SixMonths.Price} backgroundColor={Plans.SixMonths.backgroundColor} onPress={() => Subscribe(Plans.SixMonths.productId[0], Plans.SixMonths.Plan)} />
                <View style={PlansContainerStyle.blank} />
            </ScrollView>
            { Loading ? <View style={PlansContainerStyle.loadingContainer}><ActivityIndicator size="large" color="black" /></View> : null}
        </View>
    );
};

export default PlansContainer;