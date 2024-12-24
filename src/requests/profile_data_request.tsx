import axios from 'axios';
import retry from 'p-retry';
import { CONFIG } from '../config';

import { UserStatistics, WordsDictionary } from '../types_and_interfaces/words_types';
import { UserData } from '../types_and_interfaces/requests/profile_data_request';


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

const getProfileData = async (name: string, token: string): Promise<ApiResponse | null> => {
    const getProfileDataRequest = async () => {
        try {
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
            throw new Error();
        }
    }

    try {
        const result = await retry(getProfileDataRequest, {
          retries: CONFIG.retries, 
          onFailedAttempt: (error) => {
            console.warn(`Attempt ${error.attemptNumber} failed. Retrying...`);
          },
        });

        return result; 

    } catch (finalError) {
        console.error('All retry attempts failed:', finalError);
        throw new Error('All retry attempts failed');
    }
};

export default getProfileData;