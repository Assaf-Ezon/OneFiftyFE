import axios from 'axios';
import { CONFIG } from '../config';
import * as SecureStore from 'expo-secure-store';

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
        const token = await SecureStore.getItemAsync('acess_token');
        const name = await SecureStore.getItemAsync('name');

        if (!token) {
            console.error('Token is missing');
            return -1;
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
        return -1;
    }
};

export const getUserRankByName = (leaderboard: Score[], userName: string): number => {
    const sortedLeaderboard = [...leaderboard].sort((a, b) => b.Score - a.Score);
    const userIndex = sortedLeaderboard.findIndex(entry => entry.DisplayName === userName);

    return userIndex !== -1 ? userIndex + 1 : -1;
}

export const getTopUsersByScore = (leaderboard: Score[], x: number): Score[] => {
    const sortedLeaderboard = [...leaderboard].sort((a, b) => b.Score - a.Score);

    return sortedLeaderboard.slice(0, x);
}