import { View, Text, TouchableOpacity, Image, Platform, Alert } from 'react-native';
import { FC, useEffect, useState } from 'react';

import { IMAGES } from '../../../image_handler';
import PlanStyle from './plan_style';

import { PaymnetPlanConfig } from '../../../data_objects/components_config/payment_plan_config';
import { finishTransaction, getProducts, initConnection, Product, PurchaseError, requestSubscription, useIAP, validateReceiptIos } from 'react-native-iap';
import { useNavigation } from '@react-navigation/native';
import { Screens } from '../../../data_objects/enums/screens';
import { APP_STORE_SECRET } from "@env";
import AuthenticationHandler from '../../../authentication_handler';
import SubscriptionsRequestHandler from '../../../requests/requests_handlers/subscriptions_request_handler';

const errorLog = ({ message, error }: { message: string, error: any }) => {
    console.error("An error happened", message, error);
};

const Plan: FC<PaymnetPlanConfig> = ({ name, title, description, price, isRecommended, backgroundColor, productId }) => {
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState<Product[]>([]);
    const {
        connected,
        getProducts,
        getSubscriptions, // Gets available subsctiptions for this app.
        currentPurchase, // current purchase for the tranasction
        finishTransaction,
        purchaseHistory, //return the purchase history of the user on the device (sandbox user in dev) - TODO: IDK if needed here
        getPurchaseHistory, //gets users purchase history - TODO: IDK if needed here
    } = useIAP();
    const authInstance = AuthenticationHandler.getInstance();
    const navigation = useNavigation();

    // Initialize IAP when component mounts
    useEffect(() => {
        const initializeIAP = async () => {
            try {
                let attempts = 0;
                const maxAttempts = 10; // 10 seconds timeout
                
                while (!connected && attempts < maxAttempts) {
                    Alert.alert("attempts:" + attempts);
                    await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second
                    attempts++;
                }

                if (connected){
                    Alert.alert("IAP initialized");
                    const availableProducts = await getProducts({ skus: productId });
                    Alert.alert("availableProducts:" + availableProducts);
                }
                else{
                    Alert.alert("IAP not initialized");
                }



            } catch (error) {
                Alert.alert("Failed to initialize IAP:" + error );
            }
        };
        initializeIAP();
    }, []);

    const Subscribe = async () => {
        try {
            if (!connected) {
                Alert.alert('Error', 'Store connection not ready. Please try again.');
                return;
            }

            if (!productId || !productId[0]) {
                Alert.alert('Error', 'Product ID not available');
                return;
            }

            // Verify product is available
            const product = products.find(p => p.productId === productId[0]);
            if (!product) {
                Alert.alert('Error', 'Product not available');
                return;
            }

            setLoading(true);
            await requestSubscription({
                sku: productId[0],
            });
            Alert.alert("Subscription requested");
        } catch (error) {
            setLoading(false);
            Alert.alert(error);

            if (error instanceof PurchaseError) {
                errorLog({ message: `[${error.code}]: ${error.message}`, error });
            } else {
                errorLog({ message: "handleBuySubscription", error });
            }
        }
    }

    useEffect(() => {
        const checkCurrentPurchase = async (purchase: any) => {
          if (purchase) {
            try {
              const receipt = purchase.transactionReceipt;
              const originalTransactionIdentifierIOS = purchase.originalTransactionIdentifierIOS;
              if (receipt) {
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
                    const { status } = appleReceiptResponse;
                    if (status) {
                        const displayName = await authInstance.getName();
                        const token = await authInstance.getAccessToken();
        
                        await SubscriptionsRequestHandler.getInstance().post({
                            DisplayName: displayName,
                            Plan: name,
                            IAPType: "Apple",
                            AppleIAPData: {
                                originalTransactionId: originalTransactionIdentifierIOS,
                                latestReceipt: receipt,
                            },
                            GoogleIAPData: {
                                
                            },
                            token: token,
                        });
                        navigation.navigate(Screens.HOME as never);
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
        checkCurrentPurchase(currentPurchase);
      }, [currentPurchase, finishTransaction]);

    return (
        <View style={[{backgroundColor: backgroundColor}, PlanStyle.Container]}>
            <View style={PlanStyle.TitleContainer}>
                <Text style={PlanStyle.Title} allowFontScaling={false}>תכנית: {title}</Text>
                <Image source={IMAGES.plan} />
            </View>
            <View style={PlanStyle.MainContainer}>
                <Text style={PlanStyle.Description} allowFontScaling={false}>{description}</Text> 
                <Image source={IMAGES.check} />
            </View>
            <View style={PlanStyle.PayBtnContainer}>
                <TouchableOpacity style={PlanStyle.PayBtn} onPress={() => {Subscribe()}}>
                    <Text style={[{color: backgroundColor}, PlanStyle.PayBtnText]} allowFontScaling={false}>שלמו עכשיו</Text>
                </TouchableOpacity>
                <Text style={PlanStyle.Price} allowFontScaling={false}>{price} ₪</Text> 
            </View>
        </View>
    );
};

export default Plan;