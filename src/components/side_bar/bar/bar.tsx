import { View, Text, Image, TouchableOpacity } from 'react-native';
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
                    <TouchableOpacity style={barStyle.exitBtn} onPress={() => {closeSideBar()}}>
                        <Image source={IMAGES.side_menu} />
                    </TouchableOpacity>
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
                <SideBarIcon iconPath={IMAGES.unused_home} iconText='בית' isRed={false} />
                <SideBarIcon iconPath={IMAGES.unused_learning} iconText='למידה' isRed={false} />
                <SideBarIcon iconPath={IMAGES.unused_leaderboard} iconText='מובילים' isRed={false} />
                <SideBarIcon iconPath={IMAGES.unused_profile} iconText='משתמש' isRed={false} />
                <SideBarIcon iconPath={IMAGES.settings} iconText='הגדרות' isRed={false} />
                <SideBarIcon iconPath={IMAGES.notification} iconText='הודעות' isRed={false} />
                <SideBarIcon iconPath={IMAGES.problem} iconText='דווח על בעיה' isRed={false} />
            </View>
            <View style={barStyle.lowerPart}>
                <SideBarIcon iconPath={IMAGES.logout} iconText='התנתקות' isRed={true} />
                <Text style={barStyle.versionText}>Version 1.0.0</Text>
            </View>
        </View>
    );
};

export default SideBar;