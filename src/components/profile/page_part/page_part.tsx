import { View } from 'react-native';

import PagePartStyle from './page_part_style';

import Title from '../title/title';
import OptionList from '../option_list/option_list';

import { useSidebarContext } from '../../../context/general_context/sidebar_context';
import { useProfileImageMenuContext } from '../../../context/settings_context/profile_image_context';
import { useContactUsFormContext } from '../../../context/general_context/contact_form_context';

const PagePart = () => {

    const {isOpen} = useSidebarContext();
    const {isProfileImageMenuOpen} = useProfileImageMenuContext();
    const {isContactFormOpen} = useContactUsFormContext();

    return (
        <View pointerEvents={ isOpen || isProfileImageMenuOpen || isContactFormOpen ? 'none' : 'auto' } 
            style={[{opacity: isOpen || isProfileImageMenuOpen || isContactFormOpen ? 0.2 : 1}, PagePartStyle.container]}>
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
