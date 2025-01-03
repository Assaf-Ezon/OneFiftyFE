import { CONFIG } from "../../config";
import { WordDetails } from "../../data_objects/words/basic_data_objects/word_details";
import RequestsHandler from "../requests_handler";

export default class UpdateUserStatisticsRequestHandler extends RequestsHandler {
    validateParams(params: { DisplayName: string, token: string, WordsSuccess: WordDetails[], WordsFailure: WordDetails[], Language: string }): void {
        this._checkNameAndToken(params.DisplayName, params.token);
        this._checkInternetCoonection();
    }

    getEndpoint(): string {
        return CONFIG.endpoints.update_words;
    }
}
