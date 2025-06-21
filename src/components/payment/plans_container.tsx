import { View, ScrollView, ActivityIndicator, Alert, Platform } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { WebView } from 'react-native-webview';
import Plan from './plan/plan';
import Constants from 'expo-constants';
import PlansContainerStyle from './plans_container_style';

import { Plans } from '../../data_objects/enums/payment_plans';

import { CONFIG } from '../../config';

import { usePaymentContext } from '../../context/payment_context/payment_context';
import AuthenticationHandler from '../../authentication_handler';

import { useStackManagerContext, StackNames } from '../../context/general_context/stack_manager_context';
// @ts-ignore: Expo module may not have type declarations in some setups
import * as InAppPurchases from 'expo-in-app-purchases';
import { Screens } from '../../data_objects/enums/screens';
import SubscriptionsRequestHandler from '../../requests/requests_handlers/subscriptions_request_handler';
import { useNavigation } from '@react-navigation/native';


const PlansContainer = () => {
    // contexts
    const {isPaymentWebViewOpen, setIsPaymentWebViewOpen, details} = usePaymentContext(); 
    const {setStackIndexByName, handleLogout} = useStackManagerContext();

    //auth instance
    const authInstance = AuthenticationHandler.getInstance();

    // reference to the webview
    const webviewRef = useRef<WebView | null>(null);

    // Redirection
    const navigation = useNavigation();

    const [Loading, setLoading] = useState<boolean>(false);
    const [products, setProducts] = useState<any[]>([]);
    const [pendingPlanName, setPendingPlanName] = useState<string | null>(null);

    // Fetch products on mount
    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const productIds = [
                    Plans.OneMonth.productId[0],
                    Plans.TwoMonths.productId[0],
                    Plans.ThreeMonths.productId[0],
                    Plans.SixMonths.productId[0],
                ];
                const { responseCode, results } = await InAppPurchases.getProductsAsync(productIds);
                if (responseCode === InAppPurchases.IAPResponseCode.OK) {
                    setProducts(results);
                } else {
                    Alert.alert('Failed to fetch products from store.');
                }
            } catch (error) {
                Alert.alert('Error fetching products from store.');
            }
            setLoading(false);
        };
        fetchProducts();
    }, []);

    // Set up purchase listener
    useEffect(() => {
        const subscription = InAppPurchases.setPurchaseListener(async ({ responseCode, results, errorCode }) => {
            if (responseCode === InAppPurchases.IAPResponseCode.OK) {
                for (const purchase of results) {
                    if (!purchase.acknowledged) {
                        // handle receipt
                        if (pendingPlanName) {
                            await handleReceipt(purchase, pendingPlanName);
                        }
                        await InAppPurchases.finishTransactionAsync(purchase, false);
                    }
                }
            } else if (responseCode === InAppPurchases.IAPResponseCode.USER_CANCELED) {
                Alert.alert('רכישה בוטלה על ידי המשתמש.');
            } else if (responseCode === InAppPurchases.IAPResponseCode.DEFERRED) {
                Alert.alert('הרכישה ממתינה לאישור.');
            } else {
                Alert.alert('שגיאה בתשלום, אנא נסה שוב.');
            }
        });
        return () => {
            InAppPurchases.setPurchaseListener(() => {});
        };
    }, [pendingPlanName]);

    const Subscribe = async (productId: string, planName: string) => {
        try {
            setLoading(true);
            setPendingPlanName(planName);
            // Optionally, check if product exists in products
            await InAppPurchases.purchaseItemAsync(productId);
        } catch (error) {
            Alert.alert("תשלום נכשל, אנא וודא חיבור נאות לחנות האפליקציות. אם בעיה זו נמשכת, אנא פנה אלינו.");
            setLoading(false);
        }
    }

    const handleReceipt = async (purchase: any, planName: string) => {
        if (purchase) {
            try {
                if (Platform.OS === "ios") {
                    return handleReceiptIOS(purchase, planName);    
                } else if (Platform.OS === "android"){
                    return handleReceiptAndroid(purchase, planName);
                }
            } catch (error) {
                Alert.alert("שגיאה בהפעלת המנוי, אנא פנה לתמיכה");
                console.log("error", error);
            }
        }
    };

    const handleReceiptIOS = async (purchase: any, planName: string) => {
        console.log("handleReceiptIOS - started - purchase: " + JSON.stringify(purchase, null, 2));
        const receipt = purchase.transactionReceipt;
        if (receipt) {
            console.log("handleReceiptIOS - receipt");

            const isTestEnvironment = __DEV__;
            //send receipt body to apple server to validete
            // You may need to implement this on your server, as expo-iap does not provide validateReceiptIos
            // The following is a placeholder for your server validation logic
            // const appleReceiptResponse = await validateReceiptIos(...)
            // Instead, send the receipt to your backend for validation
            const displayName = await authInstance.getName();
            const token = await authInstance.getAccessToken();
            await SubscriptionsRequestHandler.getInstance().post({
                DisplayName: displayName,
                Plan: planName,
                IAPType: "Apple",
                AppleIAPData: {
                    latestReceipt: receipt,
                },
                GoogleIAPData: {},
                token: token,
            });
            setLoading(false);
            setStackIndexByName(StackNames.Auth);
        }
    }

    const handleReceiptAndroid = async (purchase: any, planName: string) => {
        console.log("handleReceiptAndroid - started");
        // For Android, we need to verify the purchase with Google Play
        const purchaseToken = purchase.purchaseToken;
        const productId = purchase.productId;
        // Get the package name safely for both classic and EAS Expo
        const packageName = (Constants.expoConfig?.android?.package || (Constants.manifest as any)?.android?.package || 'com.onefifty.app');
        if (purchaseToken && productId) {
            const displayName = await authInstance.getName();
            const token = await authInstance.getAccessToken();
            await SubscriptionsRequestHandler.getInstance().post({
                DisplayName: displayName,
                Plan: planName,
                IAPType: "Google",
                AppleIAPData: {},
                GoogleIAPData: {
                    purchaseToken: purchaseToken,
                    productId: productId,
                    packageName: packageName,
                },
                token: token,
            });
            setLoading(false);
            setStackIndexByName(StackNames.Auth);
        }
    }

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
                <Plan name={Plans.OneMonth.Plan} title={Plans.OneMonth.Title} description={Plans.OneMonth.Description} price={Plans.OneMonth.Price} backgroundColor={Plans.OneMonth.backgroundColor} onPress={Loading ? null : () => Subscribe(Plans.OneMonth.productId[0], Plans.OneMonth.Plan)} />
                <Plan name={Plans.TwoMonths.Plan} title={Plans.TwoMonths.Title} description={Plans.TwoMonths.Description} price={Plans.TwoMonths.Price} backgroundColor={Plans.TwoMonths.backgroundColor} onPress={Loading ? null : () => Subscribe(Plans.TwoMonths.productId[0], Plans.TwoMonths.Plan)} />
                <Plan name={Plans.ThreeMonths.Plan} title={Plans.ThreeMonths.Title} description={Plans.ThreeMonths.Description} price={Plans.ThreeMonths.Price} backgroundColor={Plans.ThreeMonths.backgroundColor} onPress={Loading ? null : () => Subscribe(Plans.ThreeMonths.productId[0], Plans.ThreeMonths.Plan)} />
                <Plan name={Plans.SixMonths.Plan} title={Plans.SixMonths.Title} description={Plans.SixMonths.Description} price={Plans.SixMonths.Price} backgroundColor={Plans.SixMonths.backgroundColor} onPress={Loading ? null : () => Subscribe(Plans.SixMonths.productId[0], Plans.SixMonths.Plan)} />
                <View style={PlansContainerStyle.blank} />
            </ScrollView>
            { Loading ? <View style={PlansContainerStyle.loadingContainer}><ActivityIndicator size="large" color="black" /></View> : null}
        </View>
    );
};

export default PlansContainer;