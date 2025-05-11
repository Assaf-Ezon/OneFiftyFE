import { View, Text, TouchableOpacity, Image, Platform, Alert } from 'react-native';
import { FC, useEffect, useState } from 'react';

import { IMAGES } from '../../../image_handler';
import PlanStyle from './plan_style';

import { PaymnetPlanConfig } from '../../../data_objects/components_config/payment_plan_config';
import { finishTransaction, getProducts, PurchaseError, requestSubscription, useIAP, validateReceiptIos } from 'react-native-iap';
import { useNavigation } from '@react-navigation/native';
import { Screens } from '../../../data_objects/enums/screens';
import { APP_STORE_SECRET } from "@env";

const errorLog = ({ message, error }: { message: string, error: any }) => {
    console.error("An error happened", message, error);
  };

const Plan: FC<PaymnetPlanConfig> = ({ name, title, description, price, isRecommended, backgroundColor, productId }) => {
    const [loading, setLoading] = useState(false);
    const {
        connected,
        getProducts,
        getSubscriptions, // Gets available subsctiptions for this app.
        currentPurchase, // current purchase for the tranasction
        finishTransaction,
        purchaseHistory, //return the purchase history of the user on the device (sandbox user in dev) - TODO: IDK if needed here
        getPurchaseHistory, //gets users purchase history - TODO: IDK if needed here
      } = useIAP();

    const navigation = useNavigation();

    const Subscribe = async () => {
        try {
            Alert.alert(productId[0]);
            //await requestSubscription({
            //  sku: productId[0],
            //});
            setLoading(false);
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
                        // TODO: Validate that works properly
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