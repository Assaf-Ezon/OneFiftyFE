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
import * as IAP from 'expo-iap';
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
    const [isIAPConnected, setIsIAPConnected] = useState<boolean>(false);

    // Fetch products on mount
    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                // Initialize IAP connection before fetching products if not already connected
                if (!isIAPConnected) {
                    await IAP.initConnection();
                    setIsIAPConnected(true);
                }
                
                const productIds = [
                    Plans.OneMonth.productId[0],
                    Plans.TwoMonths.productId[0],
                    Plans.ThreeMonths.productId[0],
                    Plans.SixMonths.productId[0],
                ];
                const results = await IAP.getProducts(productIds);
                setProducts(results);
            } catch (error) {
                Alert.alert('Error fetching products from store.');
                setIsIAPConnected(false); // Reset connection state on error
            }
            setLoading(false);
        };
        fetchProducts();
    }, []);

    // Set up purchase listener
    useEffect(() => {
        const purchaseUpdateSubscription = IAP.purchaseUpdatedListener(async (purchase) => {
            const isAndroid = Platform.OS === 'android';
            let isPurchased = false;
            if (isAndroid) {
                const androidPurchase = purchase as any;
                isPurchased = androidPurchase && androidPurchase.purchaseStateAndroid === 1 && !androidPurchase.isAcknowledgedAndroid;
            } else {
                isPurchased = !!(purchase && purchase.transactionReceipt);
            }
            if (isPurchased) {
                await IAP.finishTransaction({ purchase });
                if (pendingPlanName) {
                    await handleReceipt(purchase, pendingPlanName);
                }
            } else if (isAndroid && (purchase as any)?.purchaseStateAndroid === 2) {
                Alert.alert('רכישה בוטלה על ידי המשתמש.');
            } else {
                Alert.alert('שגיאה בתשלום, אנא נסה שוב.');
            }
        });
        
        // Cleanup function to close IAP connection when component unmounts
        return () => {
            purchaseUpdateSubscription.remove();
            IAP.endConnection().catch(error => {
                console.log('Error ending IAP connection:', error);
            });
        };
    }, [pendingPlanName]);

    const Subscribe = async (productId: string, planName: string) => {
        try {
            setLoading(true);
            
            const isAndroid = Platform.OS === 'android';
            
            // Ensure IAP connection is established
            if (!isIAPConnected) {
                await IAP.initConnection();
                setIsIAPConnected(true);
            }
            
            // Check if product exists in products list
            const productExists = products.find(p => p.productId === productId);
            if (!productExists) {
                throw new Error(`Product ${productId} not found in store`);
            }
            
            if (isAndroid) {
                await IAP.requestPurchase({ request: { skus: [productId] } });
            } else {
                await IAP.requestPurchase({ request: { sku: productId } });
            }
            setPendingPlanName(planName);
        } catch (error) {
            Alert.alert('Subscribe error:', error);
            
            // More specific error handling
            const errorMessage = error instanceof Error ? error.message : String(error);
            
            if (errorMessage.includes('User canceled') || errorMessage.includes('cancelled')) {
                Alert.alert("הרכישה בוטלה על ידי המשתמש.");
            } else if (errorMessage.includes('not found') || errorMessage.includes('Product')) {
                Alert.alert("המוצר לא זמין כעת. אנא נסה שוב מאוחר יותר.");
            } else if (errorMessage.includes('network') || errorMessage.includes('connection')) {
                Alert.alert("בעיית חיבור לרשת. אנא בדוק את החיבור שלך ונסה שוב.");
            } else {
                Alert.alert("תשלום נכשל, אנא וודא חיבור נאות לחנות האפליקציות. אם בעיה זו נמשכת, אנא פנה אלינו.");
            }
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