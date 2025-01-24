import { Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import { IMAGES } from '../../../image_handler';

import LeaderboardLayoutStyle from './leaderboard_layout_style';

import TopRated from '../top_rated/top_rated';

import { useProfile } from '../../../context/general_context/profile_context';
import { useSidebarContext } from '../../../context/general_context/sidebar_context';
import { useContactUsFormContext } from '../../../context/general_context/contact_form_context';


const LeaderboardLayout = () => {
    const {profile} = useProfile();
    const {isOpen, toggleMenu} = useSidebarContext();
    const {isContactFormOpen} = useContactUsFormContext();

    return (
        <View pointerEvents={ isOpen || isContactFormOpen ? 'none' : 'auto' } style={{opacity: isOpen || isContactFormOpen ? 0.2 : 1}}>
            <View style={LeaderboardLayoutStyle.topPart}>
                <View style={LeaderboardLayoutStyle.topPartText}>
                    <TouchableOpacity onPress={() => {toggleMenu()}}>
                        <Image source={IMAGES.side_menu} />
                    </TouchableOpacity>
                    <Text style={LeaderboardLayoutStyle.pageTitle} allowFontScaling={false}>מובילים</Text>
                </View>
            </View>
            <View style={LeaderboardLayoutStyle.ScrollviewContainer}>
                <ScrollView contentContainerStyle={LeaderboardLayoutStyle.mainPart}
                            showsVerticalScrollIndicator={false}>
                    <TopRated />
                    <View style={LeaderboardLayoutStyle.blank}></View>
                </ScrollView>
            </View>
        </View>
    );
};  

export default LeaderboardLayout;
