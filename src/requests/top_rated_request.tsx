import axios from 'axios';
import { CONFIG } from '../config';
import authenticationHandler from '../screens/authentication';

interface Score {
    DisplayName: string;
    Score: number;
    ProfilePicture: number;
}

interface ApiResponse {
    PlayerScore: number;
    Scores: Score[];
}

export const getLeaderboardData = async (type: string, partial: boolean): Promise<ApiResponse | number> => {
    try {
        const token = await authenticationHandler.getInstance().getAccessToken();
        const name = await authenticationHandler.getInstance().getName();

        if (!token) {
            console.error('Token is missing');

            if (!await authenticationHandler.getInstance().refresh()) {
                return -1;
            }
            const token = await authenticationHandler.getInstance().getAccessToken();
        }

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
        console.error('Error fetching profile data: ', error);
        return 0;
    }
};

export const getUserRankByName = (leaderboard: Score[], userName: string): number => {
    const sortedLeaderboard = [...leaderboard].sort((a, b) => b.Score - a.Score);
    const userIndex = sortedLeaderboard.findIndex(entry => entry.DisplayName === userName);

    return userIndex !== -1 ? userIndex + 1 : 0;
}

export const getTopUsersByScore = (leaderboard: Score[], x: number): Score[] => {
    const sortedLeaderboard = [...leaderboard].sort((a, b) => b.Score - a.Score);

    return sortedLeaderboard.slice(0, x);
}