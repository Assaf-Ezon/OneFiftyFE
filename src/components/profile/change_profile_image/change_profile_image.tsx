import { Text, View, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native';
import { useState } from 'react';
import { IMAGES } from '../../../image_handler';
import { CONFIG } from '../../../config';

import ChangeProfileImageStyle from './change_profile_image_style';
import ProfileImageOption from './image/image';

import { useProfile } from '../../../context/general_context/profile_context';
import { useProfileImageMenuContext } from '../../../context/settings_context/profile_image_context';
import { useStackManagerContext } from '../../../context/general_context/stack_manager_context';
import { setProfilePicture } from '../../../requests/change_profile_picture_request';
import AuthenticationHandler from '../../../screens/authentication_handler';
import { ErrorType } from '../../../data_objects/enums/change_profile_image_error_type/change_profile_image_error_type';


const ChangeProfileImagePopup = () => {
    const {profile, updateProfileImage} = useProfile();
    const {handleLogout, handleInactive} = useStackManagerContext();
    const {isProfileImageMenuOpen, toggleProfileImageMenu, imageIndex} = useProfileImageMenuContext();

    const authInstance = AuthenticationHandler.getInstance(); 

    const [errorType, setErrorType] = useState<number>(ErrorType.None);
    const [loading, setLoading] = useState<boolean>(false);

    const update = async () => {
        if (profile.expirationDate <= new Date()) {
            Alert.alert('תוקף המנוי נגמר');
            handleInactive();
        }
        else if (typeof imageIndex === 'number' && imageIndex >= CONFIG.min_profile_image && imageIndex <= CONFIG.max_profile_image) {
            const name = await authInstance.getName();
            const access_token = await authInstance.getAccessToken();

            if (name && access_token) {
                setLoading(true);

                try {
                    await setProfilePicture(name, access_token, imageIndex as keyof typeof IMAGES.profile_images);
                    
                    setErrorType(ErrorType.None);
                    updateProfileImage(IMAGES.profile_images[imageIndex as keyof typeof IMAGES.profile_images]);
                    toggleProfileImageMenu();
                } catch (error) {
                    setErrorType(ErrorType.Error);
                }

                setLoading(false);

            } else {
                Alert.alert('קרתה שגיאה בהזדהות, אנא התחבר מחדש');
                handleLogout();
            }
        } else {
            setErrorType(ErrorType.NoImage);
        }
    }   

    return (
        <View style={[{display: isProfileImageMenuOpen ? 'flex' : 'none'}, ChangeProfileImageStyle.container]}>
            <View style={ChangeProfileImageStyle.titleContainer}>
                <TouchableOpacity onPress={() => {toggleProfileImageMenu()}}>
                    <Image source={IMAGES.back_icon} />
                </TouchableOpacity>
                <Text style={ChangeProfileImageStyle.title}>בחר תמונת פרופיל: </Text>
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
                    <Text style={ChangeProfileImageStyle.submitBtnText}>אישור</Text>
                </TouchableOpacity>
                {
                    errorType == 1 ? 
                    <Text style={ChangeProfileImageStyle.errorText}>תקלה קרתה, נסה שנית מאוחר יותר</Text> :
                    errorType == 2 ?
                    <Text style={ChangeProfileImageStyle.errorText}>בחר תמונת פרופיל</Text> :
                    null
                }
            </View>

            {loading ? <View style={ChangeProfileImageStyle.loadingContainer}><ActivityIndicator size="large" color="black" /></View> : null}
        </View>
    );
};  

export default ChangeProfileImagePopup;
