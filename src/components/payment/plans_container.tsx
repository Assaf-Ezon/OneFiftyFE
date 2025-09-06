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


const PlansContainer = () => {
    // contexts
    const {setStackIndexByName} = useStackManagerContext();

    //auth instance
    const authInstance = AuthenticationHandler.getInstance();

    const [Loading, setLoading] = useState<boolean>(false);
    const [products, setProducts] = useState<any[]>([]);
    const [isIAPConnected, setIsIAPConnected] = useState<boolean>(false);

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

    // Check for existing purchases on the device
    const checkExistingPurchases = async () => {
        try {
            const purchases = await IAP.getAvailablePurchases();
            // Filter for active subscriptions only
            const activePurchases = [];
            
            for (const purchase of purchases) {
                // Check if it's an active subscription
                const isActive = await isSubscriptionActive(purchase);
                if (isActive) {
                    activePurchases.push(purchase);
                }
            }
            
            return activePurchases;
        } catch (error) {
            console.log('Error checking existing purchases:', error);
            return [];
        }
    };

    // Check if a subscription is currently active by validating with backend
    const isSubscriptionActive = async (purchase: any) => {
        if (!purchase) return false;
        
        try {
            let requestData: any = {
                IAPType: Platform.OS === 'android' ? 'Google' : 'Apple',
                AppleIAPData: null,
                GoogleIAPData: null,
                token: await authInstance.getAccessToken(),
            };

            if (Platform.OS === 'android') {
                // Android: prepare Google IAP data
                let purchaseToken = purchase.purchaseTokenAndroid;
                const productId = purchase.id;
                // Get the package name safely for both classic and EAS Expo
                const packageName = (Constants.expoConfig?.android?.package || (Constants.manifest as any)?.android?.package || 'com.onefifty.app');

                if (!purchaseToken || !productId || !packageName) {
                    console.log('Missing Android purchase data');
                    return false;
                }

                requestData.GoogleIAPData = {
                    purchaseToken: purchaseToken,
                    productId: productId,
                    packageName: packageName
                };
            } else {
                // iOS: prepare Apple IAP data
                if (!purchase.transactionReceipt) {
                    console.log('Missing iOS transaction receipt');
                    return false;
                }

                let receipt;
                try {
                    receipt = typeof purchase.transactionReceipt === 'string' 
                        ? JSON.parse(purchase.transactionReceipt) 
                        : purchase.transactionReceipt;
                } catch (error) {
                    console.log('Error parsing iOS receipt:', error);
                    return false;
                }

                if (!receipt.transactionId || !receipt.originalTransactionId) {
                    console.log('Missing iOS transaction data');
                    return false;
                }
                
                requestData.AppleIAPData = {
                    transactionId: receipt.transactionId,
                    originalTransactionId: receipt.originalTransactionId,
                    productId: purchase.id
                };
            }

            // Call backend to check expiration
            const response = await SubscriptionExpirationRequestHandler.getInstance().post(requestData);
            
            if (response && response.ExpirationDate) {
                const expirationDate = new Date(response.ExpirationDate);
                const now = new Date();
                return expirationDate > now;
            }

            // If no expiration date in response, assume inactive
            return false;
        } catch (error) {
            console.log('Error checking subscription expiration with backend:', error);
            // In case of error, assume inactive to allow new purchase attempts
            return false;
        }
    };

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
                
                // Check for existing subscriptions on page load
                const existingPurchases = await checkExistingPurchases();
                if (existingPurchases.length > 0) {
                    console.log('Found existing subscription on page load');
                    // Show alert immediately when page loads
                    await handleExistingSubscriptionConflict();
                }

                const productIds = [
                    Plans.OneMonth.productId[0],
                    Plans.TwoMonths.productId[0],
                    Plans.ThreeMonths.productId[0],
                    Plans.SixMonths.productId[0],
                ];
                
                var results = [];
                if (Platform.OS === 'android'){
                    results = await IAP.requestProducts({ skus: productIds, type: 'subs' });
                }
                else {
                    results = await IAP.requestProducts({ skus: productIds, type: "inapp" });                    
                }

                if (results.length == 0){
                    throw new Error(`Products list is empty`);
                }
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
        // TODO: If products.length == 0 don't set. change to only init when products var changes.
        if(products.length == 0){
            return;
        }

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
                await handleReceipt(purchase, getPlanByProductId(purchase.id));
            } else if (isAndroid && (purchase as any)?.purchaseStateAndroid === 2) {
                handleGeneralErrs('רכישה בוטלה על ידי המשתמש.');
            } else{
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
    }, [products]);

    const Subscribe = async (productId: string) => {
        try {
            setLoading(true);
            
            // Ensure IAP connection is established
            if (!isIAPConnected) {
                await IAP.initConnection();
                setIsIAPConnected(true);
            }

            // Check for existing purchases first
            const existingPurchases = await checkExistingPurchases();
            if (existingPurchases.length > 0) {
                // Handle existing subscription conflict
                await handleExistingSubscriptionConflict();
                return;
            }

            const isAndroid = Platform.OS === 'android';
            if (isAndroid){
                await SubscribeAndroid(productId);
            }
            else{
                await SubscribeApple(productId);
            }
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

    const SubscribeApple = async (productId: string) => {
        const product = products.find(p => p.id === productId);
        if (!product) {
            throw new Error(`Product ${productId} not found in store`);
        }

        await IAP.requestPurchase({ request: { sku: productId } });
        
    }


    const SubscribeAndroid = async (productId: string) => {
        const product = products.find(p => p.id === productId);
        if (!product) {
            throw new Error(`Product ${productId} not found in store`);
        }
        
        await IAP.requestPurchase({ 
            request: {
                skus: [product.id],
                subscriptionOffers: [{
                    sku: product.id,
                    offerToken: product.subscriptionOfferDetails[0].offerToken,
                }],
            },
            type: 'subs',
        });
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