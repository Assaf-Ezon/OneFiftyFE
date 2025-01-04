import { Alert } from "react-native";
import { RequestsError } from "../../data_objects/enums/requests_error_type";

const AppRequestsErrors = (err: Error, handleLogout: () => void, handleInactive: () => void) => {
    switch (err.name) {
        case RequestsError.CredentialsError: 
            Alert.alert('קרתה שגיאה בהזדהות, אנא התחבר מחדש');
            handleLogout();
            break;
        case RequestsError.InternetError:
            Alert.alert('אינך מחובר לאינטרנט, אנא התחבר ונסה שוב');
            break;
        case RequestsError.UserExpiredError:
            Alert.alert('תוקף המנוי נגמר');
            handleInactive();
            break;
    }
}

export default AppRequestsErrors;