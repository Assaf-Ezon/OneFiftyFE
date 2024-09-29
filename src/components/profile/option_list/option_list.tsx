import { Text, View, TouchableOpacity, Image } from 'react-native';
import { IMAGES } from '../../../image_handler';

import OptionListStyle from './option_list_style';

import { useProfile } from '../../../context/general_context/profile_context';
import { useSidebarContext } from '../../../context/general_context/sidebar_context';


const OptionList = () => {
    return (
        <View style={OptionListStyle.container}>

        </View>
    );
};  

export default OptionList;
