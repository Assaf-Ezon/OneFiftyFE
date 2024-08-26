import { Text, View, TouchableOpacity, Image } from 'react-native';
import { IMAGES } from '../../../image_handler';

import PagePartStyle from './page_part_style';
import LearningPartLearning from '../../learning/learning_part/learning';

import { useProfile } from '../../../context/general_context/profile_context';
import { useSidebarContext } from '../../../context/general_context/sidebar_context';

const PagePart = () => {
    const {profile} = useProfile();
    const {isOpen, toggleMenu} = useSidebarContext();

    return (
        <View style={PagePartStyle.container}>
            <View style={PagePartStyle.topPart}>
                <View style={PagePartStyle.topPartText}>
                    <TouchableOpacity onPress={() => {toggleMenu()}}>
                        <Image source={IMAGES.side_menu} />
                    </TouchableOpacity>
                    <Text style={PagePartStyle.pageTitle}>הלמידה שלי</Text>
                </View>
            </View>
            <View style={PagePartStyle.mainPart}>
                <LearningPartLearning />
            </View>
        </View>
    );
};  

export default PagePart;
