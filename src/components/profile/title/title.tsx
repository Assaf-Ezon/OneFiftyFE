import { Text, View, TouchableOpacity, Image } from 'react-native';
import { IMAGES } from '../../../image_handler';

import TitleStyle from './title_style';

import { useProfile } from '../../../context/general_context/profile_context';
import { useSidebarContext } from '../../../context/general_context/sidebar_context';


const Title = () => {
    const {profile} = useProfile();
    const {isOpen, toggleMenu} = useSidebarContext();

    return (
        <View style={TitleStyle.container}>
            <View style={TitleStyle.topPartText}>
                <TouchableOpacity onPress={() => {toggleMenu()}}>
                    <Image source={IMAGES.side_menu} />
                </TouchableOpacity>  
            </View>
            <View style={TitleStyle.profileImageContainer}>
                <Image style={TitleStyle.profileImage} source={profile.profileImage} />
                <TouchableOpacity style={TitleStyle.changeImageIconContainer}>
                    <Image style={TitleStyle.changeImageIcon} source={IMAGES.change_profile_image} />
                </TouchableOpacity>
            </View>
            <View style={TitleStyle.profileTitle}>
                <Text style={TitleStyle.name}>{profile.name}</Text>
                <Text style={TitleStyle.email}>{profile.email}</Text>
            </View>
        </View>
    );
};  

export default Title;
