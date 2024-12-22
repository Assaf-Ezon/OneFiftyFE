import axios from 'axios';
import retry from 'p-retry';
import { CONFIG } from '../config';

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

interface ApiResponse {
    UserStatistics: UserStatistics,
}

const updateUserStatistics = async (name: string, token: string, WordsSuccess: WordDetails[], WordsFailure: WordDetails[], LanguageOption: string): Promise<ApiResponse> => {
    const updateUserStatisticsRequest = async () => {
        try {
            const response = await axios.post(CONFIG.endpoints.update_words, {
                DisplayName: name,
                WordsSuccess: WordsSuccess,
                WordsFailure: WordsFailure,
                Language: LanguageOption,
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
        const result = await retry(updateUserStatisticsRequest, {
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

export default updateUserStatistics;