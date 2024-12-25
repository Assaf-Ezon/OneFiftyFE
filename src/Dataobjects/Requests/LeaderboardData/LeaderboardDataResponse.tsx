import { Score } from "./Score";

export type LeaderboardDataResponse = {
    PlayerScore: number;
    Scores: Score[];
}
