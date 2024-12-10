import axios from 'axios';
import { CONFIG } from '../config';
import AuthenticationHandler from '../screens/AuthenticationHandler';

export const setProfilePicture = async (index: number | null) => {

    const authInstance = AuthenticationHandler.getInstance();

    try {
        const token = await authInstance.getAccessToken();
        const name = await authInstance.getName();
        
        if (!token) {
            console.error('Token is missing');

            if (!await authInstance.refresh()) {
                return -1;
            }
            const token = await authInstance.getAccessToken();
        }
        if (index === null) {
            console.error('index does not exist');
            return 0;
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
        
        if (response.status === 200) {
            return 1;
        } else {
            console.error('Request failed with status: ', response.status);
            return 0;
        }
        
    } catch (error) {
        console.error('Error fetching profile data: ', error);
        return 0;
    }
};