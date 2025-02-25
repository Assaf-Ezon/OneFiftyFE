import { CONFIG } from "../../config";
import RequestsHandler from "../requests_handler";

export default class TermsApprovalRequestHandler extends RequestsHandler {
    private static instance: TermsApprovalRequestHandler;

    // singleton instance
    public static getInstance(): TermsApprovalRequestHandler {
        if (!TermsApprovalRequestHandler.instance) {
            TermsApprovalRequestHandler.instance = new TermsApprovalRequestHandler();
        }

        return TermsApprovalRequestHandler.instance;
    }

    async validateParams(params: { DisplayName: string, token: string, LeaderboardType: string, PartialList: boolean, expirationDate: Date }): Promise<void> {
        this._isNameAndToken(params.DisplayName, params.token);
        await this._isInternetConnection();
        this._isUserExpired(params.expirationDate);
    }

    getEndpoint(): string {
        return CONFIG.endpoints.terms_approval;
    }
}