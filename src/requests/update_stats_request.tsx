import axios from 'axios';
import retry from 'p-retry';
import { CONFIG } from '../config';

import { WordDetails } from '../data_objects/words/basic_data_objects/word_details';
import { UpdateUserStatsResponse } from '../data_objects/requests/update_user_stats/update_user_stats_response';

const updateUserStatistics = async (name: string, token: string, WordsSuccess: WordDetails[], WordsFailure: WordDetails[], LanguageOption: string): Promise<UpdateUserStatsResponse> => {
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

            if (response.status >= 200 && response.status < 300) {
                return response.data;
            } else {
                throw new Error(`Request failed with status code: ${response.status}`);
            }
            
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