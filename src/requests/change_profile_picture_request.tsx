import axios from 'axios';
import { CONFIG } from '../config';
import * as SecureStore from 'expo-secure-store';

export const setProfilePicture = async (index: number | null) => {
    try {
        const token = await SecureStore.getItemAsync(CONFIG.access_token);
        const name = await SecureStore.getItemAsync(CONFIG.name);
        
        if (!token) {
            console.error('Token is missing');
            return 0;
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