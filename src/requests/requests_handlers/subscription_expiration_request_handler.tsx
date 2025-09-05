import { CONFIG } from "../../config";
import RequestsHandler from "../requests_handler";

export default class SubscriptionExpirationRequestHandler extends RequestsHandler {
    private static instance: SubscriptionExpirationRequestHandler;

    // singleton instance
    public static getInstance(): SubscriptionExpirationRequestHandler {
        if (!SubscriptionExpirationRequestHandler.instance) {
            SubscriptionExpirationRequestHandler.instance = new SubscriptionExpirationRequestHandler();
        }

        return SubscriptionExpirationRequestHandler.instance;
    }

    async validateParams(params: { 
        IAPType: string, 
        AppleIAPData: { transactionId: string, originalTransactionId: string, productId: string } | null,
        GoogleIAPData: { purchaseToken: string, productId: string, packageName: string } | null 
    }): Promise<void> {
        await this._isInternetConnection();
    }

    getEndpoint(): string {
        return CONFIG.endpoints.expirationDate;
    }
}