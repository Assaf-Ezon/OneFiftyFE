import { View, Image, Text, Pressable } from 'react-native';
import { FC } from 'react';
import profilePartStyle from './profile_style';
import { IMAGES } from '../../../image_handler';
import { useProfile } from '../../../context/general_context/profile_context';
import { useSidebarContext } from '../../../context/general_context/sidebar_context';

const ProfilePartHome: FC = () => {
    const {profile, setProfile} = useProfile();
    const {isOpen, setIsOpen} = useSidebarContext();

    const openSideBar = () => {
        setIsOpen(true);
      };

    return (
        <View style={profilePartStyle.container}>
            <Pressable onPress={() => {openSideBar()}}>
                <Image source={IMAGES.side_menu} />
            </Pressable>
            <View style={profilePartStyle.profileContainer}>
                <View style={profilePartStyle.profileDetailsContainer}>
                    <Text style={profilePartStyle.profileNameText}>{profile?.name}</Text>
                    <Text style={profilePartStyle.profileEmailText}>{profile?.email}</Text>
                </View>
                <Image style={profilePartStyle.profileImage} source={IMAGES.profile_image} />
            </View>
        </View>
    );
};

export default ProfilePartHome;