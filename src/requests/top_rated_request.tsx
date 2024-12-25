import axios from 'axios';
import retry from 'p-retry';
import { CONFIG } from '../config';

import { LeaderboardDataResponse } from '../Data objects/Requests/LeaderboardData/LeaderboardDataResponse';
import { Score } from '../Data objects/Requests/LeaderboardData/Score';

export const getLeaderboardData = async (name: string, token: string, type: string, partial: boolean): Promise<LeaderboardDataResponse | null> => {
    const leaderboardDataRequest = async () => {
        try {
            const response = await axios.post(CONFIG.endpoints.leaderboard, {
                DisplayName: name,
                LeaderboardType: type,
                PartialList: partial,
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });
    
            return response.data;
            
        } catch (error) {
            throw new Error();
        }
    }

    try {
        const result = await retry(leaderboardDataRequest, {
          retries: CONFIG.retries, 
          onFailedAttempt: (error) => {
            console.warn(`Attempt ${error.attemptNumber} failed. Retrying...`);
          },
        });

        return result; 

    } catch (finalError) {
        console.error('All retry attempts failed:', finalError);
        return null;
    }
};

export const getUserRankByName = (leaderboard: Score[], userName: string): number => {
    const sortedLeaderboard = [...leaderboard].sort((a, b) => b.Score - a.Score);
    const userIndex = sortedLeaderboard.findIndex(entry => entry.DisplayName === userName);

    return userIndex !== -1 ? userIndex + 1 : 0;
}

export const getTopUsersByScore = (leaderboard: Score[], places: number): Score[] => {
    const sortedLeaderboard = [...leaderboard].sort((a, b) => b.Score - a.Score);

    return sortedLeaderboard.slice(0, places);
}