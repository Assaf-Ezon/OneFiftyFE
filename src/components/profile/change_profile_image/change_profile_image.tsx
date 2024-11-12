import { Text, View, TouchableOpacity, Image } from 'react-native';
import { useState } from 'react';
import { IMAGES } from '../../../image_handler';

import ChangeProfileImageStyle from './change_profile_image_style';
import ProfileImageOption from './image/image';

import { useProfile } from '../../../context/general_context/profile_context';
import { useProfileImageMenuContext } from '../../../context/settings_context/profile_image_context';
import { setProfilePicture } from '../../../requests/change_profile_picture_request';

const ChangeProfileImagePopup = () => {
    const {updateProfileImage} = useProfile();
    const {isProfileImageMenuOpen, toggleProfileImageMenu, imageIndex} = useProfileImageMenuContext();

    const [errorType, setErrorType] = useState<number>(0);

    const update = async () => {
        if (typeof imageIndex === 'number') {
            if (await setProfilePicture(imageIndex as keyof typeof IMAGES.profile_images)) {
                setErrorType(0);
                updateProfileImage(IMAGES.profile_images[imageIndex as keyof typeof IMAGES.profile_images]);
                toggleProfileImageMenu();
            } else {
                setErrorType(1);
            }
        } else {
            setErrorType(2);
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
            <View style={ChangeProfileImageStyle.imagesContainer}>
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
        </View>
    );
};  

export default ChangeProfileImagePopup;
