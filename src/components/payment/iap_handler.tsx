import { Platform } from "react-native";
import { CONFIG } from "../../config";
// @ts-ignore: Expo module may not have type declarations in some setups
import * as IAP from 'expo-iap';
import AuthenticationHandler from "../../authentication_handler";
import Constants from "expo-constants";
import SubscriptionExpirationRequestHandler from "../../requests/requests_handlers/subscription_expiration_request_handler";
import AndroidIAPHandler from "./android_iap_handler";
import IOSIAPHandler from "./ios_iap_handler";

export default class IAPHandler {
    products: IAP.Product[]
    productIds: string[]
    isConnected: boolean
    isInitialized: boolean
    conflictExists: boolean
    authInstance: AuthenticationHandler

    constructor(productIds: string[]) {
        this.productIds = productIds;
        this.products = []
        this.isConnected = false;
        this.isInitialized = false;
        this.conflictExists = false;
        this.authInstance = AuthenticationHandler.getInstance();
    }

    public static CreateIAPHandler(productIds: string[]): IAPHandler {
        if (Platform.OS == "android"){
            return new AndroidIAPHandler(productIds);
        }
        
        return new IOSIAPHandler(productIds);
    } 

    public async initialize(): Promise<void> {
        await this.setupIAPConnection();
        await this.checkForConflicts();
        try {
            await this.loadProducts();
            this.isInitialized = true;
        }
        catch (error) { }
    } 

    protected async loadProducts(): Promise<void> {
        throw new Error('Method not implemented');
    }
    
    private async setupIAPConnection(): Promise<void> {
        // Initialize IAP connection before fetching products if not already connected
        if (!this.isConnected) {
            await IAP.initConnection();
            this.isConnected = true;
        }
    }

    private async checkForConflicts(): Promise<void> {
        // Check for existing subscriptions on page load
        const existingPurchases = await this.checkExistingPurchases();
        this.conflictExists = (existingPurchases.length > 0);
    }

    // Check for existing purchases on the device
    private async checkExistingPurchases(): Promise<IAP.Product[]> {
        try {
            const purchases = await IAP.getAvailablePurchases();
            // Filter for active subscriptions only
            const activePurchases = [];
            
            for (const purchase of purchases) {
                // Check if it's an active subscription
                const isActive = await this.isSubscriptionActive(purchase);
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
    protected async isSubscriptionActive(purchase: IAP.Purchase): Promise<boolean> {
        throw new Error('Method not implemented');
    };

    async Subscribe(productId: string) {
        throw new Error('Method not implemented');
    }

    async handlePurchase(purchase: IAP.Purchase, planName: string): Promise<boolean> {
        throw new Error('Method not implemented');
    };
}