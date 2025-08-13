import { CONFIG } from "../../config";
import RequestsHandler from "../requests_handler";

export default class DeleteUserRequestHandler extends RequestsHandler {
    private static instance: DeleteUserRequestHandler;

    // singleton instance
    public static getInstance(): DeleteUserRequestHandler {
        if (!DeleteUserRequestHandler.instance) {
            DeleteUserRequestHandler.instance = new DeleteUserRequestHandler();
        }

        return DeleteUserRequestHandler.instance;
    }

    async validateParams(params: { DisplayName: string, token: string }): Promise<void> {
        this._isNameAndToken(params.DisplayName, params.token);
        await this._isInternetConnection();
    }

    getEndpoint(): string {
        return CONFIG.endpoints.delete_user;
    }
}