import { View, TouchableOpacity, Image, ImageSourcePropType } from 'react-native';
import { FC } from 'react';

import ProfileImageOptionStyle from './image_style';

import { useProfileImageMenuContext } from '../../../../context/settings_context/profile_image_context';



interface ProfileImageOption {
    id: number,
    image: ImageSourcePropType,
}

const ProfileImageOption: FC<ProfileImageOption> = ({ id, image }) => {
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
