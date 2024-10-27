import { View, Image, Text, TouchableOpacity } from 'react-native';
import { FC } from 'react';
import profilePartStyle from './profile_style';
import { IMAGES } from '../../../../image_handler';
import { useProfile } from '../../../../context/general_context/profile_context';
import { useSidebarContext } from '../../../../context/general_context/sidebar_context';


const ProfilePartHome: FC = () => {
    const {profile} = useProfile();
    const {toggleMenu} = useSidebarContext();

    return (
        <View style={profilePartStyle.container}>
            <TouchableOpacity onPress={() => {toggleMenu()}}>
                <Image source={IMAGES.side_menu} />
            </TouchableOpacity>
            <View style={profilePartStyle.profileContainer}>
                <View style={profilePartStyle.profileDetailsContainer}>
                    <Text style={profilePartStyle.profileNameText}>{profile.name}</Text>
                    <Text style={profilePartStyle.profileEmailText}>{profile.email}</Text>
                </View>
                <Image style={profilePartStyle.profileImage} source={profile.profileImage} />
            </View>
        </View>
    );
};

export default ProfilePartHome;