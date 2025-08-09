import { View, Image, Text, TouchableOpacity } from 'react-native';
import { FC } from 'react';

import iconStyle from './icon_style';

import { useNavigation } from '@react-navigation/native';
import { BottomBarIconConfig } from '../../../data_objects/components_config/general/bottom_bar_icon_config';

const BottomBarIcon: FC<BottomBarIconConfig> = ({ iconPath, iconText, activeScreen, screenName }) => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity style={iconStyle.container} onPress={() => {navigation.navigate(screenName as never)}} activeOpacity={0.7}>
            <Image source={iconPath} style={iconStyle.iconImage} />
            <Text style={activeScreen ? iconStyle.activeText : iconStyle.inactiveText} allowFontScaling={false}>{iconText}</Text>
        </TouchableOpacity>
    );
};

export default BottomBarIcon;