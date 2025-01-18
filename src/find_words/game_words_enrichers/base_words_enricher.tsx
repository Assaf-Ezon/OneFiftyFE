import { Words } from "../../data_objects/words/basic_data_objects/words";
import { GameWords } from "../../data_objects/words/game_data_objects/game_words";
import { UserStatistics } from "../../data_objects/words/statistics/user_statistics";

export default abstract class BaseWordsEnricher {    
    abstract enrich(gameWords: GameWords, newWords: Words, statistics: UserStatistics): void;
}