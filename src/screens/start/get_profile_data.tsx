import axios from 'axios';
import { CONFIG } from '../../config';
import * as SecureStore from 'expo-secure-store';

interface WordMeaning {
    Meaning: string;
    Source: string;
}

interface HebrewWord {
    FullWord: string;
    Meanings: WordMeaning[];
    Group: number;
}

interface WordsDictionary {
    WordCount: number;                   
    Words: { [key: string]: HebrewWord };  
}

interface UserData {
    DisplayName: string;
    Email: string;
    Score: number;
    DateJoined: string;
    ExpirationDate: string;
    ProfilePicture: number; 
    HebrewWordsDictionary: WordsDictionary;
    EnglishWordsDictionary: WordsDictionary;
}

interface ApiResponse {
    UserData: UserData;
}

const getProfileData = async (): Promise<ApiResponse | void> => {
    try {
        const token = await SecureStore.getItemAsync('token');
        // const name = await SecureStore.getItemAsync('name');
        const name = 'Goatie';

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
        console.log(response.data.HebrewWordsDictionary.Words);
        return response.data;

    } catch (error) {
        console.error('Error fetching profile data: ', error);
    }
};

export default getProfileData;