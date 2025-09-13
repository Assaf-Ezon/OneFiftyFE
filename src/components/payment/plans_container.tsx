import { View, ScrollView, ActivityIndicator, Alert, Platform } from 'react-native';
import { useEffect, useState } from 'react';
import Plan from './plan/plan';
import Constants from 'expo-constants';
import PlansContainerStyle from './plans_container_style';

import { Plans } from '../../data_objects/enums/payment_plans';

import AuthenticationHandler from '../../authentication_handler';

import { useStackManagerContext, StackNames } from '../../context/general_context/stack_manager_context';
// @ts-ignore: Expo module may not have type declarations in some setups
import * as IAP from 'expo-iap';
import SubscriptionsRequestHandler from '../../requests/requests_handlers/subscriptions_request_handler';
import SubscriptionExpirationRequestHandler from '../../requests/requests_handlers/subscription_expiration_request_handler';
import IAPHandler from './iap_handler';
import { findPlanByName } from '../home/items/pay_now/find_payment_plans_by_name';


const PlansContainer = () => {
    // contexts
    const {setStackIndexByName} = useStackManagerContext();

    //auth instance
    const authInstance = AuthenticationHandler.getInstance();

    // Page loading animation flag
    const [Loading, setLoading] = useState<boolean>(false);

    // Page setup completion flag
    const [setupComplete, setsetupComplete] = useState<boolean>(false);

    // Store products
    const [products, setProducts] = useState<any[]>([]);

    // IAP handler
    const [iapHandler, setIAPHandler] = useState<IAPHandler>();

    // Create once, reuse many times
    const createProductIdToPlanMap = () => {
        const map = new Map<string, string>();
        Object.values(Plans).forEach(plan => {
            map.set(plan.productId[0], plan.Plan);
        });
        return map;
    };

    const productIdToPlanMap = createProductIdToPlanMap();

    const getPlanByProductId = (targetProductId: string) => {
        return productIdToPlanMap.get(targetProductId) || null;
    };

    // Page setup
    useEffect(() => {
        const setupPage = async () => {
            setLoading(true);
            try {
                const productIds = [
                    Plans.OneMonth.productId[0],
                    Plans.TwoMonths.productId[0],
                    Plans.ThreeMonths.productId[0],
                    Plans.SixMonths.productId[0],
                ];
                var handler = IAPHandler.CreateIAPHandler(productIds);
                setIAPHandler(handler);
                await handler.initialize();

                if (handler.conflictExists){
                    handleExistingSubscriptionConflict();
                }

                if (handler.products.length == 0){
                    Alert.alert("תקלה בחיפוש המנויים בחנות, אנא נסה שנית מאוחר יותר.")
                    setStackIndexByName(StackNames.Auth);
                }
            } catch (error) {
                Alert.alert("תקלה בחיפוש המנויים בחנות, אנא נסה שנית מאוחר יותר.")
                setStackIndexByName(StackNames.Auth);
            }

            setLoading(false);
        };
        
        setupPage();
    }, [])

    // Handle conflict when user has existing subscription from another account
    const handleExistingSubscriptionConflict = async () => {
        setLoading(false);
        
        Alert.alert(
            'לא ניתן להשתמש במנוי',
            'קיים מנוי פעיל במכשיר זה עבור חשבון אחר. כדי להשתמש בחשבון הנוכחי, יש לבטל תחילה את המנוי הקיים דרך חנות האפליקציות (App Store או Google Play).',
            [
                {
                    text: 'הבנתי',
                    style: 'destructive',
                    onPress: async () => {
                        // Logout and return to auth screen
                        await authInstance.logout();
                        setStackIndexByName(StackNames.Auth);
                    }
                }
            ],
            { cancelable: false }
        );
    };

    const handleGeneralErrs = async (errorStr: string) => {
        setLoading(false);
        
        Alert.alert(
            "קרתה תקלה",
            errorStr,
            [
                {
                    text: 'הבנתי',
                    style: 'cancel',
                    onPress: () => {
                        setStackIndexByName(StackNames.Auth);
                    }
                }
            ],
            { cancelable: false }
        );
    };

    // Set up purchase listener
    useEffect(() => {
        if(!setupComplete){
            return;
        }

        const purchaseUpdateSubscription = IAP.purchaseUpdatedListener(async (purchase) => {
            var isPurchaseHandled = iapHandler.handlePurchase(purchase, getPlanByProductId(purchase?.id))

            if (isPurchaseHandled) {
                
            } else if (Platform.OS === 'android' && (purchase as any)?.purchaseStateAndroid === 2) {
                handleGeneralErrs('רכישה בוטלה על ידי המשתמש.');
            } else {
                console.log(purchase);
                handleGeneralErrs('שגיאה בתשלום, אנא נסה שוב.');
            }

            setLoading(false);
        });
        
        // Cleanup function to close IAP connection when component unmounts
        return () => {
            purchaseUpdateSubscription.remove();
            IAP.endConnection().catch(error => {
                console.log('Error ending IAP connection:', error);
            });
        };
    }, [setupComplete]);


    const Subscribe = async (productId: string) => {
        try {
            setLoading(true);
            
            // Ensure IAP connection is established
            if (!iapHandler.isInitialized) {
                Alert.alert("תקלה באיתחול הגישה לחנות האפליקציות")
                setLoading(false);
            }

            iapHandler.Subscribe(productId);
        } catch (error) {
            // More specific error handling
            const errorMessage = error instanceof Error ? error.message.toLowerCase() : String(error).toLowerCase();
            console.log('Subscribe error:', errorMessage);

            if (errorMessage.includes('user canceled') || errorMessage.includes('cancelled')) {
                Alert.alert("הרכישה בוטלה על ידי המשתמש.");
            } else if (errorMessage.includes('not found') || errorMessage.includes('product')) {
                Alert.alert("המוצר לא זמין כעת. אנא נסה שוב מאוחר יותר.");
            } else if (errorMessage.includes('network') || errorMessage.includes('connection')) {
                Alert.alert("בעיית חיבור לרשת. אנא בדוק את החיבור שלך ונסה שוב.");
            } else if (errorMessage.includes('own') && errorMessage.includes('item')) {

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
                setLoading(false);
            }
        }
    };

    const handleReceiptIOS = async (purchase: any, planName: string) => {
        if (!purchase?.transactionReceipt) {
            Alert.alert("שגיאה בקבלת פרטי הרכישה");
            setLoading(false);
            return;
        }

        let transactionReceipt;
        try {
            // Parse the transactionReceipt string to JSON
            transactionReceipt = typeof purchase.transactionReceipt === 'string' 
                ? JSON.parse(purchase.transactionReceipt) 
                : purchase.transactionReceipt;
        } catch (error) {
            Alert.alert("שגיאה בעיבוד פרטי הרכישה");
            setLoading(false);
            return;
        }

        if (!transactionReceipt?.transactionId || !transactionReceipt?.originalTransactionId) {
            Alert.alert("שגיאה בקבלת פרטי הרכישה");
            setLoading(false);
            return;
        }

        const displayName = await authInstance.getName();
        const token = await authInstance.getAccessToken();
        await SubscriptionsRequestHandler.getInstance().post({
            DisplayName: displayName,
            Plan: planName,
            IAPType: "Apple",
            AppleIAPData: {
                transactionId: transactionReceipt.transactionId, 
                originalTransactionId: transactionReceipt.originalTransactionId, 
                productId: purchase.id, 
            },
            GoogleIAPData: {},
            token: token,
        });
        // Reset pending plan name after successful processing
        setLoading(false);
        setStackIndexByName(StackNames.Auth);
    }

    const handleReceiptAndroid = async (purchase: any, planName: string) => {
        if (!purchase?.dataAndroid) {
            Alert.alert("שגיאה בקבלת פרטי הרכישה");
            setLoading(false);
            return;
        }

        // For Android, we need to verify the purchase with Google Play
        var purchaseToken = purchase.dataAndroid.purchaseToken;
        if (typeof purchase.dataAndroid === "string"){
            purchaseToken = JSON.parse(purchase.dataAndroid).purchaseToken;
        }

        const productId = purchase.id;
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
            // Reset pending plan name after successful processing
            setLoading(false);
            setStackIndexByName(StackNames.Auth);
        } else {
            Alert.alert("שגיאה בקבלת נתוני הרכישה");
            setLoading(false);
        }
    }

    return (
        <View style={[{opacity: Loading? 0.6 : 1}, PlansContainerStyle.mainPage]}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Plan name={Plans.OneMonth.Plan} title={Plans.OneMonth.Title} description={Plans.OneMonth.Description} price={Plans.OneMonth.Price} backgroundColor={Plans.OneMonth.backgroundColor} onPress={Loading ? () => "" : () => Subscribe(Plans.OneMonth.productId[0])} />
                <Plan name={Plans.TwoMonths.Plan} title={Plans.TwoMonths.Title} description={Plans.TwoMonths.Description} price={Plans.TwoMonths.Price} backgroundColor={Plans.TwoMonths.backgroundColor} onPress={Loading ? () => "" : () => Subscribe(Plans.TwoMonths.productId[0])} />
                <Plan name={Plans.ThreeMonths.Plan} title={Plans.ThreeMonths.Title} description={Plans.ThreeMonths.Description} price={Plans.ThreeMonths.Price} backgroundColor={Plans.ThreeMonths.backgroundColor} onPress={Loading ? () => "" : () => Subscribe(Plans.ThreeMonths.productId[0])} />
                <Plan name={Plans.SixMonths.Plan} title={Plans.SixMonths.Title} description={Plans.SixMonths.Description} price={Plans.SixMonths.Price} backgroundColor={Plans.SixMonths.backgroundColor} onPress={Loading ? () => "" : () => Subscribe(Plans.SixMonths.productId[0])} />
                <View style={PlansContainerStyle.blank} />
            </ScrollView>
            { Loading ? <View style={PlansContainerStyle.loadingContainer}><ActivityIndicator size="large" color="black" /></View> : null}
        </View>
    );
};

export default PlansContainer;