import retry from 'p-retry';
import { CONFIG } from '../config';
import axios, { AxiosResponse } from "axios";

export default abstract class RequestsHandler {
    protected abstract validateParams(params: any): void;

    protected abstract getEndpoint(): string;

    public async get(params: any): Promise<any> {
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

    public async post(params: any): Promise<any> {
        this.validateParams(params); 

        const { token, ...paramsWithoutToken } = params;

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

    private async handleResponse(response: AxiosResponse): Promise<any> {
        if (response.status >= 200 && response.status < 300) {
            return response.data;
        } else {
            throw new Error(`Request failed with status code: ${response.status}`);
        }
    }   

    _checkNameAndToken (name: string, token: string) {
        if (!name && !token) {
            throw new Error();
        }
    }
}