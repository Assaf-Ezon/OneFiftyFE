import retry from 'p-retry';
import * as Network from 'expo-network';
import { CONFIG } from '../config';
import axios, { AxiosResponse } from "axios";

export default abstract class RequestsHandler {
    abstract validateParams(params: any): void;

    abstract getEndpoint(): string;

    async get(params: any): Promise<any> {
        this.validateParams(params);

        const { token, ...paramsWithoutToken } = params;

        const retryRequest = async () => {
            try {
                const response = await axios.get(this.getEndpoint(), {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                
                return this.handleResponse(response);
            } catch {
                throw new Error();
            }
        }

        try {
            return await retry(retryRequest, {
                retries: CONFIG.retries, 
                onFailedAttempt: (error) => {
                    console.warn(`Attempt ${error.attemptNumber} failed. Retrying...`);
                },
            });

        } catch (finalError) {
            console.error('All retry attempts failed:', finalError);
            throw new Error('All retry attempts failed');
        }
    }

    async post(params: any): Promise<any> {
        await this.validateParams(params); 
        
        const { token, expirationDate, ...paramsWithoutToken } = params;

        const retryRequest = async () => {
            try {
                const response = await axios.post(this.getEndpoint(), JSON.stringify(paramsWithoutToken), 
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    }
                });
                
                return this.handleResponse(response);
                
            } catch {
                throw new Error();
            }
        }

        try {
            return await retry(retryRequest, {
                retries: CONFIG.retries, 
                onFailedAttempt: (error) => {
                    console.warn(`Attempt ${error.attemptNumber} failed. Retrying...`);
                },
            });

        } catch (finalError) {
            console.error('All retry attempts failed:', finalError);
            throw new Error('All retry attempts failed');
        }
    }

    private handleResponse(response: AxiosResponse): any {
        if (response.status >= 200 && response.status < 300) {
            return response.data;
        } else {
            throw new Error(`Request failed with status code: ${response.status}`);
        }
    }   

    _isNameAndToken (name: string, token: string) {
        if (!name || !token) {
            const nameAndTokenError = new Error("name/token don't exist");
            nameAndTokenError.name = 'CredentialsError';
            throw nameAndTokenError;
        }
    }

    async _isInternetConnection () {
        const networkState = await Network.getNetworkStateAsync();
        
        if (!networkState.isConnected) {
            const internetConnectionError = new Error("No internet connection");
            internetConnectionError.name = 'InternetError';
            throw internetConnectionError;
        }
    }

    _isUserExpired (expirationDate: Date) {
        if (expirationDate <= new Date()) {
            const internetConnectionError = new Error("User expired");
            internetConnectionError.name = 'UserExpiredError';
            throw internetConnectionError;
        }
    }
}