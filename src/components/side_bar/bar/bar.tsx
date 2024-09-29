import { View, Text, Image, TouchableOpacity, Animated, Dimensions  } from 'react-native';
import { useRef, useEffect } from 'react';
import barStyle from './bar_style';
import SideBarIcon from '../icon/icon';
import { IMAGES } from '../../../image_handler';
import { useProfile } from '../../../context/general_context/profile_context';
import { useSidebarContext } from '../../../context/general_context/sidebar_context';

const { width } = Dimensions.get('window');

const SideBar = () => {
    const {profile} = useProfile();
    const {isOpen, toggleMenu} = useSidebarContext();

    const menuWidth = width * 0.75;
    const slideAnim = useRef(new Animated.Value(width)).current;

    useEffect(() => {
        if (isOpen) {
            Animated.timing(slideAnim, {
                toValue: width - menuWidth,
                duration: 200,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(slideAnim, {
                toValue: width,
                duration: 200,
                useNativeDriver: true,
            }).start();
        }
    }, [isOpen]);

    return (
        <Animated.View style={[barStyle.container, { transform: [{ translateX: slideAnim }] }]}>
            <View style={barStyle.upperPart}>
                <View style={barStyle.userBlank}></View>
                <View style={barStyle.upperPartContent}>
                    <TouchableOpacity style={barStyle.exitBtn} onPress={() => {toggleMenu()}}>
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
                <SideBarIcon iconPath={IMAGES.unused_home} iconText='בית' isRed={false} screenName={'home'} />
                <SideBarIcon iconPath={IMAGES.unused_learning} iconText='למידה' isRed={false} screenName={'learning'} />
                <SideBarIcon iconPath={IMAGES.unused_leaderboard} iconText='מובילים' isRed={false} screenName={'leaderboard'} />
                <SideBarIcon iconPath={IMAGES.unused_profile} iconText='משתמש' isRed={false} screenName={'profile'} />
                <SideBarIcon iconPath={IMAGES.settings} iconText='הגדרות' isRed={false} screenName={''} />
                <SideBarIcon iconPath={IMAGES.notification} iconText='הודעות' isRed={false} screenName={''} />
                <SideBarIcon iconPath={IMAGES.problem} iconText='דווח על בעיה' isRed={false} screenName={''} />
            </View>
            <View style={barStyle.lowerPart}>
                <SideBarIcon iconPath={IMAGES.logout} iconText='התנתקות' isRed={true} screenName={''} />
                <Text style={barStyle.versionText}>Version 1.0.0</Text>
            </View>
        </Animated.View>
    );
};

export default SideBar;