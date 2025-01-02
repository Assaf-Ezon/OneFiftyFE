import { Requests } from "../data_objects/enums/requests";
import retry from 'p-retry';
import { CONFIG } from '../config';

export default class RequestsHandler {
    async callRequest (request: keyof typeof Requests, ...args: Parameters<typeof Requests[keyof typeof Requests]>) {
        try {
            this. _checkNameAndToken(...args);

            const result = await retry(async () => {
                const response = await Requests[request](...args); 

                if (response && response.status < 200 && response.status >= 300) {
                    throw new Error();
                }
                
                return response;
            }, {
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
    }

    _checkNameAndToken (name: string, token: string) {
        if (!name && !token) {
            throw new Error();
        }
    }
}