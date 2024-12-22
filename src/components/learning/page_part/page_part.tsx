import { Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useEffect } from 'react';
import { IMAGES } from '../../../image_handler';

import PagePartStyle from './page_part_style';

import ContinueLearningPart from '../continue_learning/continue_learning';
import AllGamesPart from '../all_games/all_games';

import { useSidebarContext } from '../../../context/general_context/sidebar_context';
import { useLearningSettingsContext } from '../../../context/settings_context/learning_context';
import { useContactUsFormContext } from '../../../context/general_context/contact_form_context';
import { useNavigation } from '@react-navigation/native';

const PagePart = () => {
    const navigation = useNavigation();

    const {isOpen, toggleMenu} = useSidebarContext();
    const {isLearningSettingOpen, toggleLearningSettings} = useLearningSettingsContext();
    const {isContactFormOpen} = useContactUsFormContext()

    useEffect(() => {
        navigation.setOptions({
            gestureEnabled: !isLearningSettingOpen,
          });
    }, [isLearningSettingOpen])

    return (
        <View style={{ opacity: isOpen || isLearningSettingOpen || isContactFormOpen ? 0.2 : 1 }}
            pointerEvents={ isOpen || isLearningSettingOpen || isContactFormOpen ? 'none' : 'auto' }>
            <View style={PagePartStyle.topPart}>
                <View style={PagePartStyle.topPartText}>
                    <TouchableOpacity onPress={() => {toggleMenu()}}>
                        <Image source={IMAGES.side_menu} />
                    </TouchableOpacity>
                    <Text style={PagePartStyle.pageTitle}>הלמידה שלי</Text>
                </View>
            </View>
            <View style={PagePartStyle.ScrollviewContainer}>
                <ScrollView contentContainerStyle={PagePartStyle.mainPart}
                        showsVerticalScrollIndicator={false}>
                    <View style={PagePartStyle.settingBtnContainer}>
                        <TouchableOpacity style={PagePartStyle.settingsBtn} onPress={() => {toggleLearningSettings()}}>
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
