
// @ts-ignore: Expo module may not have type declarations in some setups
import * as IAP from 'expo-iap';
import Constants from "expo-constants";
import SubscriptionExpirationRequestHandler from "../../requests/requests_handlers/subscription_expiration_request_handler";
import IAPHandler from "./iap_handler";
import { Alert } from 'react-native';
import SubscriptionsRequestHandler from '../../requests/requests_handlers/subscriptions_request_handler';

export default class IOSIAPHandler extends IAPHandler {
    constructor(productIds: string[]) {
        super(productIds);
    }

    protected async loadProducts(): Promise<void> {
        this.products = await IAP.requestProducts({ skus: this.productIds, type: "inapp" }); 
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
            if(!!(purchase && purchase.transactionReceipt)){
                await IAP.finishTransaction({ purchase });
                return await this.handleReceiptIOS(purchase, planName);
            }
        } catch (error) {
            Alert.alert("שגיאה בהפעלת המנוי, אנא פנה לתמיכה");
        }
        return false;
    };

    private async handleReceiptIOS(purchase: IAP.ProductPurchaseAndroid, planName: string): Promise<boolean> {
        if (!purchase?.transactionReceipt) {
            Alert.alert("שגיאה בקבלת פרטי הרכישה");
            return false;
        }

        let transactionReceipt;
        try {
            // Parse the transactionReceipt string to JSON
            transactionReceipt = typeof purchase.transactionReceipt === 'string' 
                ? JSON.parse(purchase.transactionReceipt) 
                : purchase.transactionReceipt;
        } catch (error) {
            Alert.alert("שגיאה בעיבוד פרטי הרכישה");
            return false;
        }

        if (!transactionReceipt?.transactionId || !transactionReceipt?.originalTransactionId) {
            Alert.alert("שגיאה בקבלת פרטי הרכישה");
            return false;
        }

        const displayName = await this.authInstance.getName();
        const token = await this.authInstance.getAccessToken();
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
        return false;
    }

    async Subscribe(productId: string) {
        const product = this.products.find(p => p.id === productId);
        if (!product) {
            throw new Error(`Product ${productId} not found in store`);
        }

        await IAP.requestPurchase({ request: { sku: productId } });
    }
}