import { AuthErrorType } from "../../data_objects/enums/auth_error_type";
import { RequestsError } from "../../data_objects/enums/requests_error_type";

const AuthenticationRequestsErrors = (err: Error, setPopupIndex: (value: React.SetStateAction<number>) => void) => {
    switch (err.name) {
        case RequestsError.InternetError:
            setPopupIndex(AuthErrorType.InternetConnection);
            break;
        case RequestsError.UserExpiredError:
            setPopupIndex(AuthErrorType.Inactive);
            break;
        default:
            setPopupIndex(AuthErrorType.Error);
    }
}

export default AuthenticationRequestsErrors;