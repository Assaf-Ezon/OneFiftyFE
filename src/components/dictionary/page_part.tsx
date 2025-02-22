import { Text, View, TouchableOpacity, Image } from 'react-native';
import { IMAGES } from '../../image_handler';

import PagePartStyle from './page_part_style';
import Settings from './settings/setting';
import Words from './words/words';

import { useSidebarContext } from '../../context/general_context/sidebar_context';
import { SettingsProvider } from '../../context/dictionary_context/settings_context';
import { useContactUsFormContext } from '../../context/general_context/contact_form_context';

const PagePart = () => {
    const {isOpen, toggleMenu} = useSidebarContext();
    const {isContactFormOpen} = useContactUsFormContext();
    
    return (
        <SettingsProvider>
            <View style={[PagePartStyle.container, {opacity: isOpen || isContactFormOpen ? 0.2 : 1}]} 
                pointerEvents={ isOpen || isContactFormOpen ? 'none' : 'auto' }>
                <View style={PagePartStyle.topPart}>
                    <View style={PagePartStyle.topPartText}>
                        <TouchableOpacity onPress={() => {toggleMenu()}}>
                            <Image source={IMAGES.side_menu} />
                        </TouchableOpacity>
                        <Text style={PagePartStyle.pageTitle} allowFontScaling={false}>מילון</Text>
                    </View>
                </View>
                <View style={[{zIndex: 2}, PagePartStyle.settingsContainer]}>
                    <Settings />
                </View>
                <View style={[{zIndex:1}, PagePartStyle.wordsContainer]}>
                    <Words />
                </View>
            </View>
        </SettingsProvider>
    );
};  

export default PagePart;
