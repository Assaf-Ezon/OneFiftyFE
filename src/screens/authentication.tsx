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

export default class authentication {
    constructor() {

    }

    // responsible of the first code and the login popup
    getAuthCode (): [
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

    async getAuthToken (request: any, response: any): Promise<boolean> {
        if (response && response.type == 'success') {
            for (let i = 0; i < 2; i++) {
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
                    if (success) {
                        return true;
                    }

                }
                catch (err){
                    console.error(err);
                }   
            } 
        }

        return false;  
    };

    async refresh (refresh_token: any): Promise<boolean> {
        for (let i = 0; i < 2; i++) {
            try {
                const refreshedTokenResponse = await AuthSession.refreshAsync({
                    clientId: clientId,
                    scopes: ["openid", "offline_access", "profile"],
                    refreshToken: refresh_token,
                },
                    discovery
                );

                const success = await this._saveTokens(refreshedTokenResponse);
                if (success) {
                    return true;
                }
            } 
            catch (err) {
                console.error(err);
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

    private _getNameFromDecodedJWT(token: string) {
        const [header, payload, signature] = token.split(".");
        
        const decodedPayload = JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/")));
        return decodedPayload.name;
    };
}