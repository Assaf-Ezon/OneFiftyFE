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
        <ScrollView pointerEvents={ isOpen ? 'none' : 'auto' } 
                    contentContainerStyle={[{opacity: isOpen ? 0.2 : 1}, PagePartStyle.container]}
                    showsVerticalScrollIndicator={false}
                    bounces={false}>
            <View style={PagePartStyle.topPart}>
                <View style={PagePartStyle.topPartText}>
                    <TouchableOpacity onPress={() => {toggleMenu()}}>
                        <Image source={IMAGES.side_menu} />
                    </TouchableOpacity>
                    <Text style={PagePartStyle.pageTitle}>הלמידה שלי</Text>
                </View>
            </View>
            <View style={PagePartStyle.mainPart}>
                <ContinueLearningPart />
                <AllGamesPart />
            </View>
        </ScrollView>
    );
};  

export default PagePart;
