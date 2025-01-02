import axios from 'axios';
import retry from 'p-retry';
import { CONFIG } from '../config';

export const setProfilePicture = async (name: string, token: string, index: number | null) => {
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
            
            if (response.status !== 200) {
                throw new Error();
            }
            
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

    } catch (finalError) {
        console.error('All retry attempts failed:', finalError);
        throw new Error('All retry attempts failed');
    }
};