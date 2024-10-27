import { Text, View, TouchableOpacity, Image } from 'react-native';
import { IMAGES } from '../../../image_handler';

import ChangeProfileImageStyle from './change_profile_image_style';
import ProfileImageOption from './image/image';

import { useProfile } from '../../../context/general_context/profile_context';
import { useProfileImageMenuContext } from '../../../context/settings_context/profile_image_context';


const ChangeProfileImagePopup = () => {
    const {profile, setProfile} = useProfile();
    const {isProfileImageMenuOpen, toggleProfileImageMenu} = useProfileImageMenuContext();

    return (
        <View style={[{display: isProfileImageMenuOpen ? 'flex' : 'none'}, ChangeProfileImageStyle.container]}>
            <View style={ChangeProfileImageStyle.titleContainer}>
                <TouchableOpacity onPress={() => {toggleProfileImageMenu()}}>
                    <Image source={IMAGES.back_icon} />
                </TouchableOpacity>
                <Text style={ChangeProfileImageStyle.title}>בחר תמונת פרופיל: </Text>
            </View>
            <View style={ChangeProfileImageStyle.imagesContainer}>
                <ProfileImageOption image={IMAGES.profile_images[1]} />
            </View>
            <View style={ChangeProfileImageStyle.submitContainer}>
                <TouchableOpacity>
                    <Text>בחר</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};  

export default ChangeProfileImagePopup;
