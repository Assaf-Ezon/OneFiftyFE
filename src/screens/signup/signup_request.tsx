import { ENDPOINTS } from '../../endpoint_handler';
import * as Crypto from 'expo-crypto';

async function _hashPassword(password: string): Promise<string> {
    return await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        password
      );
};

async function signup_request(navigation: any, setSignupFailed: React.Dispatch<React.SetStateAction<boolean>>, email: string, password: string, name: string){
    try {
      const response = await fetch(ENDPOINTS.signup, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({'Email': email, 'hashedPwd': _hashPassword(password), 'displayName': name}),
      });

      if (!response.ok) {
        throw new Error('Error');
      }

      const data = await response.json();

      if (data['status'] == 'Success'){
        navigation.replace('home');
      } else if (data['status'] == 'Failure'){
        setSignupFailed(true);
      }

    } catch (error) {
      console.error('Error: ', error);
    };
};

export default signup_request;
