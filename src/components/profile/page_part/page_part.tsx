import { Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import { IMAGES } from '../../../image_handler';

import PagePartStyle from './page_part_style';

import Title from '../title/title';
import OptionList from '../option_list/option_list';

import { useProfile } from '../../../context/general_context/profile_context';
import { useSidebarContext } from '../../../context/general_context/sidebar_context';

const PagePart = () => {
    const {profile} = useProfile();
    const {isOpen} = useSidebarContext();

    return (
        <View pointerEvents={ isOpen ? 'none' : 'auto' } style={[{opacity: isOpen ? 0.2 : 1}, PagePartStyle.container]}>
            <View style={PagePartStyle.title}>
                <Title />
            </View>
            <View style={PagePartStyle.option_list}>
                <OptionList />
            </View>
        </View>
    );
};  

export default PagePart;
