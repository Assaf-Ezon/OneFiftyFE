import { Text, View, TouchableOpacity, Image, ImageSourcePropType } from 'react-native';
import { FC } from 'react';

import ProfileImageOptionStyle from './image_style';

import { useProfile } from '../../../../context/general_context/profile_context';
import { useProfileImageMenuContext } from '../../../../context/settings_context/profile_image_context';


interface ProfileImageOption {
    image: ImageSourcePropType,
}

const ProfileImageOption: FC<ProfileImageOption> = ({ image }) => {
    const {setProfile} = useProfile();

    return (
        <View style={ProfileImageOptionStyle.container}>
            <Text>Hello world</Text>
        </View>
    );
};  

export default ProfileImageOption;
