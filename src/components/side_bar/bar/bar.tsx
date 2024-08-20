import { View, Text, Image, Pressable } from 'react-native';
import { FC, useState } from 'react';
import barStyle from './bar_style';
import SideBarIcon from '../icon/icon';
import { IMAGES } from '../../../image_handler';
import { useProfile } from '../../../context/general_context/profile_context';
import { useSidebarContext } from '../../../context/general_context/sidebar_context';

const SideBar: FC = ({  }) => {
    const {profile, setProfile} = useProfile();
    const {isOpen, setIsOpen} = useSidebarContext();

    const closeSideBar = () => {
        setIsOpen(false);
    };

    return (
        <View style={[barStyle.container, {display: isOpen ? 'flex' : 'none'}]}>
            <View style={barStyle.upperPart}>
                <View style={barStyle.userBlank}></View>
                <View style={barStyle.upperPartContent}>
                    <Pressable style={barStyle.exitBtn} onPress={() => {closeSideBar()}}>
                        <Image source={IMAGES.side_menu} />
                    </Pressable>
                    <View style={barStyle.userContent}>
                        <View style={barStyle.profileDetailsContainer}>
                            <Text style={barStyle.profileNameText}>{profile?.name}</Text>
                            <Text style={barStyle.profileEmailText}>{profile?.email}</Text>
                        </View>
                        <Image style={barStyle.profileImage} source={IMAGES.profile_image} />
                    </View>
                </View>
            </View>
            <View style={barStyle.middlePart}>
                
            </View>
            <View style={barStyle.lowerPart}>
                
                </View>
        </View>
    );
};

export default SideBar;