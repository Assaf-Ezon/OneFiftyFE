
// @ts-ignore: Expo module may not have type declarations in some setups
import * as IAP from 'expo-iap';
import Constants from "expo-constants";
import SubscriptionExpirationRequestHandler from "../../requests/requests_handlers/subscription_expiration_request_handler";
import IAPHandler from "./iap_handler";
import { Alert } from 'react-native';
import SubscriptionsRequestHandler from '../../requests/requests_handlers/subscriptions_request_handler';

export default class AndroidIAPHandler extends IAPHandler {
    constructor(productIds: string[]) {
        super(productIds);
    }

    protected async loadProducts(): Promise<void> {
        this.products = await IAP.requestProducts({ skus: this.productIds, type: 'subs' });
    }

    // Check if a subscription is currently active by validating with backend
    async isSubscriptionActive(purchase: IAP.ProductPurchaseAndroid) {
        if (!purchase) return false;
        
        try {
            // Get the package name safely for both classic and EAS Expo
            const packageName = (Constants.expoConfig?.android?.package || (Constants.manifest as any)?.android?.package || 'com.onefifty.app');

            if (!purchase.purchaseTokenAndroid || !purchase.id || !packageName) {
                console.log('Missing Android purchase data');
                return false;
            }
            let requestData: any = {
                IAPType: 'Google',
                AppleIAPData: null,
                GoogleIAPData: {
                    purchaseToken: purchase.purchaseTokenAndroid,
                    productId: purchase.id,
                    packageName: packageName
                },
                token: await this.authInstance.getAccessToken(),
            };

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

    async handlePurchase(purchase: IAP.Purchase, planName: string): Promise<boolean> {
        try {
            const androidPurchase = purchase as any;
            if(androidPurchase && androidPurchase.purchaseStateAndroid === 1 && !androidPurchase.isAcknowledgedAndroid){
                await IAP.finishTransaction({ purchase });
                return await this.handleReceiptAndroid(purchase, planName);
            }
        } catch (error) {
            Alert.alert("שגיאה בהפעלת המנוי, אנא פנה לתמיכה");
        }
        return false;
    };

    private async handleReceiptAndroid(purchase: IAP.ProductPurchaseAndroid, planName: string): Promise<boolean> {
        if (!purchase?.dataAndroid) {
            Alert.alert("שגיאה בקבלת פרטי הרכישה");
            return false;
        }

        // For Android, we need to verify the purchase with Google Play
        var purchaseToken = purchase.purchaseTokenAndroid;
        if (typeof purchase.dataAndroid === "string"){
            purchaseToken = JSON.parse(purchase.dataAndroid).purchaseToken;
        }

        const productId = purchase.id;
        // Get the package name safely for both classic and EAS Expo
        const packageName = (Constants.expoConfig?.android?.package || (Constants.manifest as any)?.android?.package || 'com.onefifty.app');
        if (purchaseToken && productId) {
            const displayName = await this.authInstance.getName();
            const token = await this.authInstance.getAccessToken();
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
            return true;
        } else {
            Alert.alert("שגיאה בקבלת נתוני הרכישה");
            return false;
        }
    }

    async Subscribe(productId: string) {
        const product: any = this.products.find(p => p.id === productId);
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
}