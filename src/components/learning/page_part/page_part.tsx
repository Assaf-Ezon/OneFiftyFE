import { Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import { IMAGES } from '../../../image_handler';

import PagePartStyle from './page_part_style';

import ContinueLearningPart from '../continue_learning/continue_learning';
import AllGamesPart from '../all_games/all_games';

import { useProfile } from '../../../context/general_context/profile_context';
import { useSidebarContext } from '../../../context/general_context/sidebar_context';


const PagePart = () => {
    const {profile} = useProfile();
    const {isOpen, toggleMenu} = useSidebarContext();

    return (
        <View>
            <View style={PagePartStyle.topPart}>
                <View style={PagePartStyle.topPartText}>
                    <TouchableOpacity onPress={() => {toggleMenu()}}>
                        <Image source={IMAGES.side_menu} />
                    </TouchableOpacity>
                    <Text style={PagePartStyle.pageTitle}>הלמידה שלי</Text>
                </View>
            </View>
            <View style={PagePartStyle.ScrollviewContainer}>
                <ScrollView pointerEvents={ isOpen ? 'none' : 'auto' } 
                        contentContainerStyle={[{opacity: isOpen ? 0.2 : 1}, PagePartStyle.mainPart]}
                        showsVerticalScrollIndicator={false}>

                    <View style={PagePartStyle.settingBtnContainer}>
                        <TouchableOpacity style={PagePartStyle.settingsBtn} onPress={() => {}}>
                            <Text style={PagePartStyle.settingsBtnText}>הגדרות</Text>
                            <Image source={IMAGES.settings} />
                        </TouchableOpacity>
                    </View>

                    <ContinueLearningPart />
                    <AllGamesPart />
                    <View style={PagePartStyle.blank}></View>
                </ScrollView>
            </View>
        </View>
    );
};  

export default PagePart;
