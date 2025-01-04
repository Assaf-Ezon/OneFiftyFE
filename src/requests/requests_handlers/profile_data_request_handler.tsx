import { CONFIG } from "../../config";
import RequestsHandler from "../requests_handler";

export default class ProfileDataRequestHandler extends RequestsHandler {
    private static instance: ProfileDataRequestHandler;

    // singleton instance
    public static getInstance(): ProfileDataRequestHandler {
        if (!ProfileDataRequestHandler.instance) {
            ProfileDataRequestHandler.instance = new ProfileDataRequestHandler();
        }

        return ProfileDataRequestHandler.instance;
    }

    async validateParams(params: { DisplayName: string, token: string }): Promise<void> {
        this._checkNameAndToken(params.DisplayName, params.token);
        await this._checkInternetConnection();
    }

    getEndpoint(): string {
        return CONFIG.endpoints.login;
    }
}
