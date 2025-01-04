import { CONFIG } from "../../config";
import { Languages } from "../../data_objects/enums/language";
import { WordDetails } from "../../data_objects/words/basic_data_objects/word_details";
import RequestsHandler from "../requests_handler";

export default class UpdateUserStatisticsRequestHandler extends RequestsHandler {
    private static instance: UpdateUserStatisticsRequestHandler;

    // singleton instance
    public static getInstance(): UpdateUserStatisticsRequestHandler {
        if (!UpdateUserStatisticsRequestHandler.instance) {
            UpdateUserStatisticsRequestHandler.instance = new UpdateUserStatisticsRequestHandler();
        }

        return UpdateUserStatisticsRequestHandler.instance;
    }

    async validateParams(params: { DisplayName: string, token: string, WordsSuccess: WordDetails[], WordsFailure: WordDetails[], Language: string, expirationDate: Date }): Promise<void> {
        this._isNameAndToken(params.DisplayName, params.token);
        await this._isInternetConnection();
        this._isUserExpired(params.expirationDate);

        if (!params.Language || !(params.Language in Languages)) {
            const languageDoesntExistError = new Error("invalid language");
            languageDoesntExistError.name = 'LanguageError';
            throw languageDoesntExistError;
        }
    }

    getEndpoint(): string {
        return CONFIG.endpoints.update_words;
    }
}
