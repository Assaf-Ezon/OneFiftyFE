import { View, Text, Image, TouchableOpacity, Animated, Dimensions  } from 'react-native';
import { useRef, useEffect } from 'react';
import barStyle from './bar_style';
import SideBarIcon from '../icon/icon';
import { IMAGES } from '../../../image_handler';
import { Screens } from '../../../data_objects/enums/screens/screens';
import { useProfile } from '../../../context/general_context/profile_context';
import { useSidebarContext } from '../../../context/general_context/sidebar_context';
import { CONFIG } from '../../../config';

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
                            <Text style={barStyle.profileNameText}>{profile.name}</Text>
                            <Text style={barStyle.profileEmailText}>{profile.email}</Text>
                        </View>
                        <Image style={barStyle.profileImage} source={profile.profileImage} />
                    </View>
                </View>
            </View>
            <View style={barStyle.middlePart}>
                <SideBarIcon iconPath={IMAGES.unused_home} iconText='בית' isRed={false} onPressActionIndex={0} screenName={Screens.HOME} />
                <View style={barStyle.line} />
                <SideBarIcon iconPath={IMAGES.unused_dictionary} iconText='מילון' isRed={false} onPressActionIndex={0} screenName={Screens.DICTIONARY} />
                <View style={barStyle.line} />
                <SideBarIcon iconPath={IMAGES.unused_learning} iconText='למידה' isRed={false} onPressActionIndex={0} screenName={Screens.LEARNING} />
                <View style={barStyle.line} />
                <SideBarIcon iconPath={IMAGES.unused_leaderboard} iconText='מובילים' isRed={false} onPressActionIndex={0} screenName={Screens.LEADERBOARD} />
                <View style={barStyle.line} />
                <SideBarIcon iconPath={IMAGES.unused_profile} iconText='משתמש' isRed={false} onPressActionIndex={0} screenName={Screens.PROFILE} />
                <View style={barStyle.line} />
                <SideBarIcon iconPath={IMAGES.notification} iconText='הודעות' isRed={false} onPressActionIndex={0} screenName={''} />
                <View style={barStyle.line} />
                <SideBarIcon iconPath={IMAGES.problem} iconText='דווח על בעיה' isRed={false} onPressActionIndex={1} screenName={''} />
                <View style={barStyle.line} />
                <SideBarIcon iconPath={IMAGES.information} iconText='תנאי שימוש' isRed={false} onPressActionIndex={0} screenName={Screens.TERMS} />
            </View>
            <View style={barStyle.lowerPart}>
                <SideBarIcon iconPath={IMAGES.logout} iconText='התנתקות' isRed={true} onPressActionIndex={2} screenName={''} />
                <Text style={barStyle.versionText}>Version {CONFIG.Version}</Text>
            </View>
        </Animated.View>
    );
};

export default SideBar;