import { WordStatisticsData } from "../../data_objects/words/basic_data_objects/word_statistics_data";
import { Words } from "../../data_objects/words/basic_data_objects/words";
import { GameWords } from "../../data_objects/words/game_data_objects/game_words";

import BaseWordsEnricher from "./base_words_enricher";

export default class DummyWordsEnricher extends BaseWordsEnricher {    
    enrich(wordsDictToEnrich: GameWords, newWords: Words, statistics: { [groupId: number]: { [word: string]: WordStatisticsData; } }) {
        return;
    }
}