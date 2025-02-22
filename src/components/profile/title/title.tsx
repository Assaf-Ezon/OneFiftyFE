import { Text, View, TouchableOpacity, Image, ImageSourcePropType } from 'react-native';
import { IMAGES } from '../../../image_handler';

import TitleStyle from './title_style';

import { useProfile } from '../../../context/general_context/profile_context';
import { useSidebarContext } from '../../../context/general_context/sidebar_context';
import { useProfileImageMenuContext } from '../../../context/settings_context/profile_image_context';
import { useEffect, useRef, useState } from 'react';


const Title = () => {
    const {profile} = useProfile();
    const {toggleMenu} = useSidebarContext();
    const {toggleProfileImageMenu} = useProfileImageMenuContext();
    
    const [profileImage, setProfileImage] = useState<ImageSourcePropType>(profile.profileImage);

    useEffect(() => {
        setProfileImage(profile.profileImage);
    }, [profile.profileImage]);

    return (
        <View style={TitleStyle.container}>
            <View style={TitleStyle.topPartText}>
                <TouchableOpacity onPress={() => {toggleMenu()}}>
                    <Image source={IMAGES.side_menu} />
                </TouchableOpacity>  
            </View>
            <View style={TitleStyle.profileContainer}>
                <View style={TitleStyle.profileImageContainer}>
                    <Image style={TitleStyle.profileImage} source={profileImage} />
                    <TouchableOpacity style={TitleStyle.changeImageIconContainer} onPress={() => {toggleProfileImageMenu()}}>
                        <Image style={TitleStyle.changeImageIcon} source={IMAGES.change_profile_image} />
                    </TouchableOpacity>
                </View>
                <View style={TitleStyle.profileTitle}>
                    <Text style={TitleStyle.name} allowFontScaling={false}>{profile.name}</Text>
                    <Text style={TitleStyle.email} allowFontScaling={false}>{profile.email}</Text>
                    <Text style={TitleStyle.expiration} allowFontScaling={false}>
                        תום תוקף משתמש: {profile.expirationDate.getDate()}/{profile.expirationDate.getMonth() + 1}/{profile.expirationDate.getFullYear()}
                    </Text>
                </View>
            </View>
        </View>
    );
};  

export default Title;
