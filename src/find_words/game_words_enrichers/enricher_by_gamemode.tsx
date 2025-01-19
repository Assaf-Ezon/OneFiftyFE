import { GAMES } from "../../data_objects/enums/game_objects";
import { GameMode } from "../../data_objects/general/game_mode";

import DummyWordsEnricher from "./dummy_words_enricher";
import RandomMeaningsWordsEnricher from "./random_meanings_words_enricher";

export const EnricherByGamemode = (gameMode: GameMode) => {
    switch (gameMode) {
        case GAMES.KDK.id:
            return new DummyWordsEnricher();;
        case GAMES.MC.id:
            return new RandomMeaningsWordsEnricher();
    }
}