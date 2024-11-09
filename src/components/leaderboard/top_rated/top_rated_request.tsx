import axios from 'axios';
import { CONFIG } from '../../../config';
import * as SecureStore from 'expo-secure-store';

interface Score {
    DisplayName: string;
    Score: number;
}

interface ApiResponse {
    PlayerScore: number;
    Scores: Score[];
}

const getLeaderboardData = async (type: string, partial: boolean): Promise<ApiResponse | number> => {
    try {
        const token = await SecureStore.getItemAsync('token');
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

        console.log(JSON.stringify(response.data));
        return response.data;
        
    } catch (error) {
        console.error('Error fetching profile data: ', error);
        return -1;
    }
};

export default getLeaderboardData;