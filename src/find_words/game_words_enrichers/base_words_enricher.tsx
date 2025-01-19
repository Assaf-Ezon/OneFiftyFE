import { WordStatisticsData } from "../../data_objects/words/basic_data_objects/word_statistics_data";
import { Words } from "../../data_objects/words/basic_data_objects/words";
import { GameWords } from "../../data_objects/words/game_data_objects/game_words";
export default abstract class BaseWordsEnricher {    
    abstract enrich(gameWords: GameWords, newWords: Words, statistics: { [groupId: number]: { [word: string]: WordStatisticsData; } }): void;
}