import axios from 'axios';
import retry from 'p-retry';
import { CONFIG } from '../config';

import { ProfileDataResponse } from '../data_objects/requests/profile_data/profile_data_response';

const getProfileData = async (name: string, token: string): Promise<ProfileDataResponse> => {
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