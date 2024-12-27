import { View, TouchableOpacity, Image, ImageSourcePropType } from 'react-native';
import { FC } from 'react';

import ProfileImageOptionStyle from './image_style';

import { useProfileImageMenuContext } from '../../../../context/settings_context/profile_image_context';
import { ChangeProfileImagePopupConfig } from '../../../../data_objects/components_config/profile_page/profile_image_popup_option_config';

const ProfileImageOption: FC<ChangeProfileImagePopupConfig> = ({ id, image }) => {
    const {imageIndex, setImageIndex} = useProfileImageMenuContext();

    return (
        <View style={[{backgroundColor: imageIndex == id ? 'green' : 'white'}, ProfileImageOptionStyle.container]}>
            <TouchableOpacity style={ProfileImageOptionStyle.imageContainer} onPress={() => {setImageIndex(id)}}>
                <Image style={ProfileImageOptionStyle.image} source={image} />
            </TouchableOpacity>
        </View>
    );
};  

export default ProfileImageOption;
