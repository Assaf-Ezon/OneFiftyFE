import { View, Text, TouchableOpacity, Image } from 'react-native';
import { FC } from 'react';
import cardStyle from './card_style';

import { useNavigation } from '@react-navigation/native';
import { ProfileMenuConfig } from '../../../../data_objects/components_config/profile_page/profile_options_config';
import { useContactUsFormContext } from '../../../../context/general_context/contact_form_context';

const OptionCard: FC<ProfileMenuConfig> = ({ image, title, onPressActionIndex, screenName, isActive }) => {
    const navigation = useNavigation();

    const { toggleOpenContactUsForm } = useContactUsFormContext();

    const navigateToPage = () => {
        navigation.navigate(screenName as never);
    };

    const openContactUsForm = () => {
        toggleOpenContactUsForm();
    };

    const onPressHandler = [navigateToPage, openContactUsForm];

    return (
        <View style={{opacity: isActive ? 1 : 0.6}}
        pointerEvents={isActive ? 'auto' : 'none'}>        
            <TouchableOpacity style={cardStyle.container} onPress={() => {onPressHandler[onPressActionIndex]()}}>
                <Text style={cardStyle.text} allowFontScaling={false}>{title}</Text>
                <Image source={image} />
            </TouchableOpacity>
        </View>

    );
};

export default OptionCard;