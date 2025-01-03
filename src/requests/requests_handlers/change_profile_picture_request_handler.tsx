import { CONFIG } from "../../config";
import RequestsHandler from "../requests_handler";

export default class ChangeProfilePictureRequestHandler extends RequestsHandler {
    protected validateParams(params: { DisplayName: string, token: string, ProfilePicture: number | null }): void {
        this._checkNameAndToken(params.DisplayName, params.token);

        if (params.ProfilePicture === null) {
            throw new Error('index does not exist');
        }
    }

    protected getEndpoint(params: { DisplayName: string, token: string, ProfilePicture: number | null }): string {
        return CONFIG.endpoints.profile_picture;
    }
}
