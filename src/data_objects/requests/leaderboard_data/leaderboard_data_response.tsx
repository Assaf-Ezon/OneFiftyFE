import { Score } from "./score";

export type LeaderboardDataResponse = {
    PlayerScore: number;
    Scores: Score[];
}
