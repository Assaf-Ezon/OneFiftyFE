import retry from 'p-retry';

import * as SecureStore from 'expo-secure-store';
import * as AuthSession from 'expo-auth-session';

import { CONFIG } from '../config';

const tenantName = 'OneFiftyApp'; 
const clientId = 'e448e103-0d00-4b1f-842e-96da9d017f11';
const policyName = 'B2C_1_OneFiftyApp';
const redirectUri = 'com.OneFifty.App://auth';

const discovery = {
    authorizationEndpoint: `https://${tenantName}.b2clogin.com/${tenantName}.onmicrosoft.com/${policyName}/oauth2/v2.0/authorize`,
    tokenEndpoint: `https://${tenantName}.b2clogin.com/${tenantName}.onmicrosoft.com/${policyName}/oauth2/v2.0/token`,
};

export default class authenticationHandler {
    private static instance: authenticationHandler;

    constructor() {

    }

    // singleton instance
    public static getInstance(): authenticationHandler {
        if (!authenticationHandler.instance) {
            authenticationHandler.instance = new authenticationHandler();
        }

        return authenticationHandler.instance;
    }

    // get the name
    public async getName(): Promise<string> {
        const name = await SecureStore.getItemAsync(CONFIG.name);
        return typeof name == 'string' ? name : '';
    }

    // get access token
    public async getAccessToken(): Promise<string> {
        const access = await SecureStore.getItemAsync(CONFIG.access_token);
        return typeof access == 'string' ? access : '';
    }

    // get access token expiration
    public async getAccessTokenExpiration(): Promise<string> {
        const access_exp = await SecureStore.getItemAsync(CONFIG.access_token_exp);
        return typeof access_exp == 'string' ? access_exp : '';
    }

    // get refresh token
    public async getRefreshToken(): Promise<string> {
        const refresh = await SecureStore.getItemAsync(CONFIG.refresh_token);
        return typeof refresh == 'string' ? refresh : '';
    }

    // get refresh token expiration
    public async getRefreshTokenExpiration(): Promise<string> {
        const refresh_exp = await SecureStore.getItemAsync(CONFIG.refresh_token_exp);
        return typeof refresh_exp == 'string' ? refresh_exp : '';
    }

    // sets the expiration date of the refresh token to yesterday
    public async setRefreshTokenToExpired() {
        var oldDate = new Date();
        oldDate.setUTCHours(oldDate.getUTCHours() - 24);
        
        await SecureStore.setItemAsync(CONFIG.refresh_token_exp, oldDate.toISOString());
    }

    // responsible of the first code and the login popup
    public getAuthCode (): [
        AuthSession.AuthRequest | null,
        AuthSession.AuthSessionResult | null,
        (options?: AuthSession.AuthRequestPromptOptions) => Promise<AuthSession.AuthSessionResult>
      ] {
        const [request, response, promptAsync] = AuthSession.useAuthRequest(
            {
                clientId,
                redirectUri,
                scopes: ["https://onefiftyapp.onmicrosoft.com/e448e103-0d00-4b1f-842e-96da9d017f11/offline_access", "offline_access"],
                responseType: AuthSession.ResponseType.Code,
                extraParams: {
                    nonce: 'defaultNonce', 
                },
            },
            discovery
        );
        return [request, response, promptAsync];
    }

    // get tokens after login
    public async getAuthToken (request: any, response: any): Promise<boolean> {
        if (response && response.type == 'success') {
            const getTokens = async (): Promise<boolean> => {
                try {
                    const tokenResponse = await AuthSession.exchangeCodeAsync(
                        {
                            clientId: clientId,
                            scopes: ["openid", "offline_access", "profile"],
                            redirectUri: redirectUri,
                            code: response.params.code,
                            extraParams: request?.codeVerifier ? {
                                code_verifier: request?.codeVerifier,
                            } : undefined
                        },
                        discovery
                    );
    
                    const success = await this._saveTokens(tokenResponse);

                    if (!success) {
                        throw new Error('Missing token');
                    }

                    return true;
                } catch (err){
                    throw new Error('Missing token');
                }   
            }

            try {
                const result = await retry(getTokens, {
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
        }

        return false;  
    };

    // refresh the tokens
    public async refresh (): Promise<boolean> {
        const refresh_token = await SecureStore.getItemAsync(CONFIG.refresh_token);
        
        if (refresh_token && typeof refresh_token == 'string') {
            const getUpdatedTokens = async (): Promise<boolean> => {
                try {
                    const refreshedTokenResponse = await AuthSession.refreshAsync({
                        clientId: clientId,
                        scopes: ["openid", "offline_access", "profile"],
                        refreshToken: refresh_token,
                    },
                        discovery
                    );
    
                    const success = await this._saveTokens(refreshedTokenResponse);
                    if (!success) {
                        throw new Error('token and name are missing');
                    }

                    return true;
                }  catch (err) {
                    throw new Error('token and name are missing');
                }
            }

            try {
                const result = await retry(getUpdatedTokens, {
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
        }

        return false;
    }

    // updates the name, idToken and the refreshToken (and its expiration date) in the secure store
    private async _saveTokens (tokenResponse: any): Promise<boolean> {
        const idToken = tokenResponse.idToken;
        const refreshToken = tokenResponse.refreshToken;
        const name = this._getNameFromDecodedJWT(idToken)
        
        if (idToken && refreshToken && name) {
            let access_token_exp = new Date();
            access_token_exp.setUTCMinutes(access_token_exp.getUTCMinutes() + 30);

            await SecureStore.setItemAsync(CONFIG.access_token, idToken);
            await SecureStore.setItemAsync(CONFIG.access_token_exp, access_token_exp.toISOString());

            let refresh_token_exp = new Date();
            refresh_token_exp.setUTCDate(refresh_token_exp.getUTCDate() + 13);

            await SecureStore.setItemAsync(CONFIG.refresh_token, refreshToken);
            await SecureStore.setItemAsync(CONFIG.refresh_token_exp, refresh_token_exp.toISOString());

            await SecureStore.setItemAsync(CONFIG.name, name);

            return true;
        }
        
        return false;
    }

    // is the refresh token a string and exist
    public async isRefreshTokenValid(): Promise<boolean> {
        const refresh_token = await SecureStore.getItemAsync(CONFIG.refresh_token);
        const refresh_token_exp = await SecureStore.getItemAsync(CONFIG.refresh_token_exp);

        if (refresh_token && refresh_token_exp && typeof refresh_token_exp == 'string' && typeof refresh_token == 'string') {
            return true;
        }
        return false;
    }

    // is the refresh token not expired
    public async IsRefreshTokenExpired(): Promise<boolean> {
        const refresh_token_exp = await SecureStore.getItemAsync(CONFIG.refresh_token_exp);

        if (refresh_token_exp && typeof refresh_token_exp == 'string') {
            return new Date(refresh_token_exp) <= (new Date());
        } else {
            return true;
        }
    }

    // releases the name from the JWT token
    private _getNameFromDecodedJWT(token: string) {
        const [header, payload, signature] = token.split(".");
        
        const decodedPayload = JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/")));
        return decodedPayload.name;
    };
}