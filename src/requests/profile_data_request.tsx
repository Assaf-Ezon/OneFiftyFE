import axios from 'axios';
import { CONFIG } from '../config';
import authenticationHandler from '../screens/authentication';

// dictionaries interfaces
interface Meaning {
    Meaning: string;
    Source: string;
}

interface WordDetails {
    FullWord: string;
    Meanings: Meaning[];
    Group: number;
}

interface WordsDictionary {
    [key: string]: {
        [word: string]: WordDetails;
    };
}

// statistics interfaces
interface WordStatisticsData {
    Word: WordDetails;                 
    ConsecutiveSuccesses: number; 
    LastSeen: string;           
    Successes: number;          
    Failures: number;            
}

interface WordsStatistics {
    WordCount: number;
    Words: { [groupId: number]: { [word: string]: WordStatisticsData } };
}

interface UserStatistics {
    WordsStatistics: WordsStatistics; 
}

interface UserData {
    AuthProvider: number;
    DateJoined: string;
    DisplayName: string;
    ETag: string;
    Email: string;
    ExpirationDate: string;
    IsActive: boolean;
    OrderId: string;
    PartitionKey: string;
    ProfilePicture: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;
    RowKey: string;
    Score: number;
    Timestamp: string;
}

interface ApiResponse {
    EnglishUserStatistics: UserStatistics,
    EnglishWordsDictionary: {
        WordCount: number;
        Words: WordsDictionary;
    };
    HebrewUserStatistics: UserStatistics,
    HebrewWordsDictionary: {
        WordCount: number;
        Words: WordsDictionary;
    };
    UserData: UserData;
    Version: string;
}

const getProfileData = async (): Promise<ApiResponse | number> => {
    try {
        const token = await authenticationHandler.getInstance().getAccessToken();
        const name = await authenticationHandler.getInstance().getName();

        if (!token) {
            console.error('Token is missing');
            return -1;
        }

        const response = await axios.post(CONFIG.endpoints.login, {
            DisplayName: name,
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

export default getProfileData;