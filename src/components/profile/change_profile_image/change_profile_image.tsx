import { Text, View, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native';
import { useState } from 'react';
import { IMAGES } from '../../../image_handler';
import { CONFIG } from '../../../config';

import ChangeProfileImageStyle from './change_profile_image_style';
import ProfileImageOption from './image/image';

import { useProfile } from '../../../context/general_context/profile_context';
import { useProfileImageMenuContext } from '../../../context/settings_context/profile_image_context';
import { useStackManagerContext } from '../../../context/general_context/stack_manager_context';

import SetProfilePictureRequestHandler from '../../../requests/requests_handlers/set_profile_picture_request_handler';
import AuthenticationHandler from '../../../authentication_handler';

import { ErrorType } from '../../../data_objects/enums/change_profile_image_error_type';
import { RequestsError } from '../../../data_objects/enums/requests_error_type';
import AppRequestsErrors from '../../../requests/components_requests_errors/app_requests_errors';

const ChangeProfileImagePopup = () => {
    const {profile, updateProfileImage} = useProfile();
    const {handleLogout, handleInactive} = useStackManagerContext();
    const {isProfileImageMenuOpen, toggleProfileImageMenu, imageIndex} = useProfileImageMenuContext();

    const authInstance = AuthenticationHandler.getInstance(); 

    const [errorType, setErrorType] = useState<number>(ErrorType.None);
    const [loading, setLoading] = useState<boolean>(false);

    const update = async () => {
        setLoading(true);

        try {
            const name = await authInstance.getName();
            const token = await authInstance.getAccessToken();

            await SetProfilePictureRequestHandler.getInstance().post({
                DisplayName: name, 
                token: token, 
                ProfilePicture: imageIndex as keyof typeof IMAGES.profile_images,
                expirationDate: profile.expirationDate,
            });
            
            setErrorType(ErrorType.None);
            updateProfileImage(IMAGES.profile_images[imageIndex as keyof typeof IMAGES.profile_images]);
            toggleProfileImageMenu();

        } catch (err) {
            if (err instanceof Error) {
                if (err.name == RequestsError.IndexError) {
                    setErrorType(ErrorType.NoImage);
                }

                AppRequestsErrors(err, handleLogout, handleInactive);
            } else {
                setErrorType(ErrorType.Error);
            }
        }

        setLoading(false);
    }   

    return (
        <View style={[{display: isProfileImageMenuOpen ? 'flex' : 'none'}, ChangeProfileImageStyle.container]}>
            <View style={ChangeProfileImageStyle.titleContainer}>
                <TouchableOpacity onPress={() => {toggleProfileImageMenu()}}>
                    <Image source={IMAGES.back_icon} />
                </TouchableOpacity>
                <Text style={ChangeProfileImageStyle.title} allowFontScaling={false}>בחרו תמונת פרופיל: </Text>
            </View>
            <View style={[ChangeProfileImageStyle.imagesContainer, {opacity: loading ? 0.5 : 1}]}
                pointerEvents={loading ? "none" : "auto"}>
                {
                    Object.entries(IMAGES.profile_images).map(([key, image]) => {
                        return (
                            <ProfileImageOption key={key} id={Number(key)} image={image} />
                        )   
                    })
                }
            </View>
            <View style={ChangeProfileImageStyle.submitContainer}>
                <TouchableOpacity style={ChangeProfileImageStyle.submitBtn} onPress={update}>
                    <Text style={ChangeProfileImageStyle.submitBtnText} allowFontScaling={false}>אישור</Text>
                </TouchableOpacity>
                {
                    errorType == ErrorType.Error ? 
                    <Text style={ChangeProfileImageStyle.errorText} allowFontScaling={false}>תקלה קרתה, נסו שנית מאוחר יותר</Text> :
                    errorType == ErrorType.NoImage ?
                    <Text style={ChangeProfileImageStyle.errorText} allowFontScaling={false}>בחרו תמונת פרופיל</Text> :
                    null
                }
            </View>

            {loading ? <View style={ChangeProfileImageStyle.loadingContainer}><ActivityIndicator size="large" color="black" /></View> : null}
        </View>
    );
};  

export default ChangeProfileImagePopup;
