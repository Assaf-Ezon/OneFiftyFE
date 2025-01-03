import { CONFIG } from "../../config";
import RequestsHandler from "../requests_handler";

export default class ProfileDataRequestHandler extends RequestsHandler {
    validateParams(params: { DisplayName: string, token: string }): void {
        this._checkNameAndToken(params.DisplayName, params.token);
        this._checkInternetCoonection();
    }

    getEndpoint(): string {
        return CONFIG.endpoints.login;
    }
}
