import { CONFIG } from "../../config";
import { WordDetails } from "../../data_objects/words/basic_data_objects/word_details";
import RequestsHandler from "../requests_handler";

export default class UpdateUserStatisticsRequestHandler extends RequestsHandler {
    protected validateParams(params: { DisplayName: string, token: string, WordsSuccess: WordDetails[], WordsFailure: WordDetails[], LanguageOption: string }): void {
        this._checkNameAndToken(params.DisplayName, params.token);
    }

    protected getEndpoint(): string {
        console.log(`the endpoint is ${CONFIG.endpoints.update_words}`);
        return CONFIG.endpoints.update_words;
    }
}
