import { CONFIG } from "../../config";
import { Score } from "../../data_objects/requests/leaderboard_data/score";
import RequestsHandler from "../requests_handler";

export default class LeaderboardDataRequestHandler extends RequestsHandler {
    private static instance: LeaderboardDataRequestHandler;

    // singleton instance
    public static getInstance(): LeaderboardDataRequestHandler {
        if (!LeaderboardDataRequestHandler.instance) {
            LeaderboardDataRequestHandler.instance = new LeaderboardDataRequestHandler();
        }

        return LeaderboardDataRequestHandler.instance;
    }

    validateParams(params: { DisplayName: string, token: string, LeaderboardType: string, PartialList: boolean }): void {
        this._checkNameAndToken(params.DisplayName, params.token);
        this._checkInternetCoonection();
    }

    getEndpoint(): string {
        return CONFIG.endpoints.leaderboard;
    }
}

export const getUserRankByName = (leaderboard: Score[], userName: string): number => {
    const sortedLeaderboard = [...leaderboard].sort((a, b) => b.Score - a.Score);
    const userIndex = sortedLeaderboard.findIndex(entry => entry.DisplayName === userName);

    return userIndex !== -1 ? userIndex + 1 : 0;
}

export const getTopUsersByScore = (leaderboard: Score[], places: number): Score[] => {
    const sortedLeaderboard = [...leaderboard].sort((a, b) => b.Score - a.Score);

    return sortedLeaderboard.slice(0, places);
}