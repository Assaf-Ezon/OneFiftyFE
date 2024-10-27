import { Text, View, TouchableOpacity, Image } from 'react-native';
import { IMAGES } from '../../../image_handler';

import ChangeProfileImageStyle from './change_profile_image_style';
import ProfileImageOption from './image/image';

import { useProfile } from '../../../context/general_context/profile_context';
import { useProfileImageMenuContext } from '../../../context/settings_context/profile_image_context';


const ChangeProfileImagePopup = () => {
    const {profile, updateProfileImage} = useProfile();
    const {isProfileImageMenuOpen, toggleProfileImageMenu, imageIndex, setImageIndex} = useProfileImageMenuContext();

    const update = () => {
        updateProfileImage(IMAGES.profile_images[imageIndex as keyof typeof IMAGES.profile_images]);
        toggleProfileImageMenu();
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
            </View>
        </View>
    );
};  

export default ChangeProfileImagePopup;
