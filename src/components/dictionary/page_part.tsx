import { Text, View, TouchableOpacity, Image } from 'react-native';
import { IMAGES } from '../../image_handler';

import PagePartStyle from './page_part_style';
import Settings from './settings/setting';
import Words from './words/words';

import { useSidebarContext } from '../../context/general_context/sidebar_context';
import { SettingsProvider } from '../../context/dictionary_context/settings_context';

const PagePart = () => {
    const {isOpen, toggleMenu} = useSidebarContext();

    return (
        <SettingsProvider>
            <View style={[PagePartStyle.container, {opacity: isOpen ? 0.2 : 1}]}>
                <View style={PagePartStyle.topPart}>
                    <View style={PagePartStyle.topPartText}>
                        <TouchableOpacity onPress={() => {toggleMenu()}}>
                            <Image source={IMAGES.side_menu} />
                        </TouchableOpacity>
                        <Text style={PagePartStyle.pageTitle}>מילון</Text>
                    </View>
                </View>
                <View style={{zIndex: 2}}>
                    <Settings />
                </View>
                <View style={{zIndex:1}}>
                    <Words />
                </View>
            </View>
        </SettingsProvider>
    );
};  

export default PagePart;
