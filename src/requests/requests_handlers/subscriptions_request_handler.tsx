import { CONFIG } from "../../config";
import RequestsHandler from "../requests_handler";

export default class SubscriptionsRequestHandler extends RequestsHandler {
    private static instance: SubscriptionsRequestHandler;

    // singleton instance
    public static getInstance(): SubscriptionsRequestHandler {
        if (!SubscriptionsRequestHandler.instance) {
            SubscriptionsRequestHandler.instance = new SubscriptionsRequestHandler();
        }

        return SubscriptionsRequestHandler.instance;
    }

    async validateParams(params: { DisplayName: string, token: string, Plan: string, IAPType: string, AppleIAPData: any, GoogleIAPData: any }): Promise<void> {
        this._isNameAndToken(params.DisplayName, params.token);
        await this._isInternetConnection();
    }

    getEndpoint(): string {
        return CONFIG.endpoints.subscriptions;
    }
}
