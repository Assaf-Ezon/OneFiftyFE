import { View, Image, Text, ImageSourcePropType, Pressable } from 'react-native';
import { FC } from 'react';
import profilePartStyle from './profile_style';
import { IMAGES } from '../../../iamge_handler';

interface profilePartHomeProp {
    profileImage: ImageSourcePropType;
    profileName: string;
    profileEmail: string;
};

const ProfilePartHome: FC<profilePartHomeProp> = ({ profileImage, profileName, profileEmail }) => {
    return (
        <View style={profilePartStyle.container}>
            <Pressable>
                <Image source={IMAGES.side_menu} />
            </Pressable>
            <View style={profilePartStyle.profileContainer}>
                <View style={profilePartStyle.profileDetailsContainer}>
                    <Text style={profilePartStyle.profileNameText}>{profileName}</Text>
                    <Text style={profilePartStyle.profileEmailText}>{profileEmail}</Text>
                </View>
                <Image style={profilePartStyle.profileImage} source={profileImage} />
            </View>
        </View>
    );
};

export default ProfilePartHome;