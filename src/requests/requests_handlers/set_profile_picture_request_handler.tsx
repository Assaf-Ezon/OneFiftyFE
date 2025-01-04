import { CONFIG } from "../../config";
import RequestsHandler from "../requests_handler";

export default class SetProfilePictureRequestHandler extends RequestsHandler {
    private static instance: SetProfilePictureRequestHandler;

    // singleton instance
    public static getInstance(): SetProfilePictureRequestHandler {
        if (!SetProfilePictureRequestHandler.instance) {
            SetProfilePictureRequestHandler.instance = new SetProfilePictureRequestHandler();
        }

        return SetProfilePictureRequestHandler.instance;
    }

    validateParams(params: { DisplayName: string, token: string, ProfilePicture: number | null }): void {
        this._checkNameAndToken(params.DisplayName, params.token);
        this._checkInternetCoonection();

        if (params.ProfilePicture === null) {
            throw new Error('index does not exist');
        }
    }

    getEndpoint(): string {
        return CONFIG.endpoints.profile_picture;
    }
}
