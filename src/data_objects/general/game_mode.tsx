import { GAMES } from "../enums/game_objects";

export type GameMode = (typeof GAMES)[keyof typeof GAMES]['id'];