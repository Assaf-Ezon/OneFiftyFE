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

    async validateParams(params: { DisplayName: string, token: string, ProfilePicture: number | null, expirationDate: Date }): Promise<void> {
        this._isNameAndToken(params.DisplayName, params.token);
        await this._isInternetConnection();
        this._isUserExpired(params.expirationDate);

        if (params.ProfilePicture == null ||
            !(typeof params.ProfilePicture === 'number' && params.ProfilePicture >= CONFIG.min_profile_image && params.ProfilePicture <= CONFIG.max_profile_image)) 
        {
            const indexDoesntExistError = new Error("picture index doesn't exist");
            indexDoesntExistError.name = 'IndexError';
            throw indexDoesntExistError;
        }

    }

    getEndpoint(): string {
        return CONFIG.endpoints.profile_picture;
    }
}
