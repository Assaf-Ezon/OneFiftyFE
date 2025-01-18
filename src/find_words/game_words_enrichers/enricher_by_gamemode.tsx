import { GAMES } from "../../data_objects/enums/game_objects";
import { GameMode } from "../../data_objects/general/game_mode";

import RandomMeaningsEnricher from "./random_meanings_enricher";

export const EnricherByGamemode = (gameMode: GameMode) => {
    switch (gameMode) {
        case GAMES.KDK.id:
            return;
        case GAMES.MC.id:
            return new RandomMeaningsEnricher();
    }
}