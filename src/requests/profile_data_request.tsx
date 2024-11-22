import axios from 'axios';
import { CONFIG } from '../config';
import * as SecureStore from 'expo-secure-store';

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
    EnglishUserStatistics: {
        WordsStatistics: {
            WordCount: number;
            Words: WordsDictionary;
        };
    };
    EnglishWordsDictionary: {
        WordCount: number;
        Words: WordsDictionary;
    };
    HebrewUserStatistics: {
        WordsStatistics: {
            WordCount: number;
            Words: WordsDictionary;
        };
    };
    HebrewWordsDictionary: {
        WordCount: number;
        Words: WordsDictionary;
    };
    UserData: UserData;
    Version: string;
}

const getProfileData = async (): Promise<ApiResponse | number> => {
    try {
        const token = await SecureStore.getItemAsync('token');
        const name = await SecureStore.getItemAsync('name');

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
        console.log(response.data);
        return response.data;
        
    } catch (error) {
        console.error('Error fetching profile data: ', error);
        return -1;
    }
};

export default getProfileData;