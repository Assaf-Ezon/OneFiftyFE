import axios from 'axios';
import { CONFIG } from '../../config';
import * as SecureStore from 'expo-secure-store';

interface UserData {
    RowKey: string;
    Email: string;
    Score: number;
    DateJoined: string; // Assuming this is a string, you can change it to Date if needed
    ExpirationDate: string; // Adjust as necessary
    ProfilePicture: number; // Assuming this is an index for your images
}

interface ApiResponse {
    UserData: UserData;
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

        console.log(response.data);
        return response.data;

    } catch (error) {
        console.error('Error fetching profile data: ', error);
    }
};

export default getProfileData;