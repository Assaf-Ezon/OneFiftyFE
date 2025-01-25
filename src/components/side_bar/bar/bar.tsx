import { View, Text, Image, TouchableOpacity, Animated, Dimensions  } from 'react-native';
import { useRef, useEffect } from 'react';
import barStyle from './bar_style';
import SideBarIcon from '../icon/icon';
import { IMAGES } from '../../../image_handler';
import { Screens } from '../../../data_objects/enums/screens';
import { useProfile } from '../../../context/general_context/profile_context';
import { useSidebarContext } from '../../../context/general_context/sidebar_context';
import { CONFIG } from '../../../config';
import { SidebarActionIndex } from '../../../data_objects/enums/sidebar_action_index';
import { SlideIn } from '../../../animations/slide_animation';

const { width } = Dimensions.get('window');

const SideBar = () => {
    const {profile} = useProfile();
    const {isOpen, toggleMenu} = useSidebarContext();

    const menuWidth = width * 0.75;
    const slideAnim = useRef(new Animated.Value(width)).current;

    useEffect(() => {
        if (isOpen) {
            SlideIn(slideAnim, width - menuWidth, 200);
        } else {
            SlideIn(slideAnim, width, 200);
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
                            <Text style={barStyle.profileNameText} allowFontScaling={false}>{profile.name}</Text>
                            <Text style={barStyle.profileEmailText} allowFontScaling={false}>{profile.email}</Text>
                        </View>
                        <Image style={barStyle.profileImage} source={profile.profileImage} />
                    </View>
                </View>
            </View>
            <View style={barStyle.middlePart}>
                <SideBarIcon iconPath={IMAGES.unused_home} iconText='בית' isRed={false} onPressActionIndex={SidebarActionIndex.NavigateToPage} screenName={Screens.HOME} />
                <View style={barStyle.line} />
                <SideBarIcon iconPath={IMAGES.unused_dictionary} iconText='מילון' isRed={false} onPressActionIndex={SidebarActionIndex.NavigateToPage} screenName={Screens.DICTIONARY} />
                <View style={barStyle.line} />
                <SideBarIcon iconPath={IMAGES.unused_learning} iconText='למידה' isRed={false} onPressActionIndex={SidebarActionIndex.NavigateToPage} screenName={Screens.LEARNING} />
                <View style={barStyle.line} />
                <SideBarIcon iconPath={IMAGES.unused_leaderboard} iconText='מובילים' isRed={false} onPressActionIndex={SidebarActionIndex.NavigateToPage} screenName={Screens.LEADERBOARD} />
                <View style={barStyle.line} />
                <SideBarIcon iconPath={IMAGES.unused_profile} iconText='משתמש' isRed={false} onPressActionIndex={SidebarActionIndex.NavigateToPage} screenName={Screens.PROFILE} />
                <View style={barStyle.line} />
                <SideBarIcon iconPath={IMAGES.notification} iconText='הודעות' isRed={false} onPressActionIndex={SidebarActionIndex.NavigateToPage} screenName={''} />
                <View style={barStyle.line} />
                <SideBarIcon iconPath={IMAGES.problem} iconText='דיווח על בעיה' isRed={false} onPressActionIndex={SidebarActionIndex.OpenContactUsForm} screenName={''} />
                <View style={barStyle.line} />
                <SideBarIcon iconPath={IMAGES.terms} iconText='תנאי שימוש' isRed={false} onPressActionIndex={SidebarActionIndex.NavigateToPage} screenName={Screens.TERMS} />
            </View>
            <View style={barStyle.lowerPart}>
                <SideBarIcon iconPath={IMAGES.logout} iconText='התנתקות' isRed={true} onPressActionIndex={SidebarActionIndex.Logout} screenName={''} />
                <Text style={barStyle.versionText} allowFontScaling={false}>Version {CONFIG.Version}</Text>
            </View>
        </Animated.View>
    );
};

export default SideBar;