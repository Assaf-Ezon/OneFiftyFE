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
            <Image style={TitleStyle.profileImage} source={IMAGES.profile_image} />
            <View style={TitleStyle.profileTitle}>
                <Text style={TitleStyle.name}>{profile?.name}</Text>
                <Text style={TitleStyle.email}>{profile?.email}</Text>
            </View>
        </View>
    );
};  

export default Title;
