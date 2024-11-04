import axios from 'axios';
import { CONFIG } from '../../config';
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
    ProfilePicture: number;
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

const getProfileData = async (): Promise<ApiResponse | void> => {
    try {
        const token = await SecureStore.getItemAsync('token');
        const name = await SecureStore.getItemAsync('name');

        if (!token) {
            console.error('Token is missing');
            return;
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
    }
};

export default getProfileData;