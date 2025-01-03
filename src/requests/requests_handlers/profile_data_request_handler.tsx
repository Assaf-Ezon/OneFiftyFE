import { CONFIG } from "../../config";
import RequestsHandler from "../requests_handler";

export default class ProfileDataRequestHandler extends RequestsHandler {
    protected validateParams(params: { DisplayName: string, token: string }): void {
        this._checkNameAndToken(params.DisplayName, params.token);
    }

    protected getEndpoint(): string {
        console.log(`the endpoint is ${CONFIG.endpoints.login}`);
        return CONFIG.endpoints.login;
    }
}
