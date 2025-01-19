import { EnrichersParamName } from "../../data_objects/enums/enrichers_param_name";
import { Meaning } from "../../data_objects/words/basic_data_objects/meaning";
import { WordDetails } from "../../data_objects/words/basic_data_objects/word_details";
import { WordStatisticsData } from "../../data_objects/words/basic_data_objects/word_statistics_data";
import { Words } from "../../data_objects/words/basic_data_objects/words";
import { GameWords } from "../../data_objects/words/game_data_objects/game_words";
import { UserStatistics } from "../../data_objects/words/statistics/user_statistics";

import BaseWordsEnricher from "./base_words_enricher";

export default class DummyWordsEnricher extends BaseWordsEnricher {    
    enrich(wordsDictToEnrich: GameWords, newWords: Words, statistics: UserStatistics) {
        return;
    }
}