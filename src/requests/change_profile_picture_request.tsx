import axios from 'axios';
import retry from 'p-retry';
import { CONFIG } from '../config';

export const setProfilePicture = async (name: string, token: string, index: number | null): Promise<boolean> => {

    const setProfilePictureRequest = async () => {
        try {
            if (index === null) {
                throw new Error('index does not exist');
            }
            
            const response = await axios.post(CONFIG.endpoints.profile_picture, {
                DisplayName: name,
                ProfilePicture: index,
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });
            
            return true;
            
        } catch (error) {
            throw new Error();
        }
    }

    try {
        const result = await retry(setProfilePictureRequest, {
          retries: CONFIG.retries, 
          onFailedAttempt: (error) => {
            console.warn(`Attempt ${error.attemptNumber} failed. Retrying...`);
          },
        });

        return result; 

    } catch (finalError) {
        console.error('All retry attempts failed:', finalError);
        return false;
    }
};