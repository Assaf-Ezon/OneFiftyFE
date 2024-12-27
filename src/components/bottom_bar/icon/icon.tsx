import { View, Image, Text, TouchableOpacity } from 'react-native';
import { FC } from 'react';

import iconStyle from './icon_style';

import { useNavigation } from '@react-navigation/native';
import { BottomBarIconConfig } from '../../../data_objects/components_config/general/bottom_bar_icon_config';

const BottomBarIcon: FC<BottomBarIconConfig> = ({ iconPath, iconText, activeScreen, screenName }) => {
    const navigation = useNavigation();

    return (
        <View style={iconStyle.container}>
            <TouchableOpacity onPress={() => {navigation.navigate(screenName as never)}}>
                <Image source={iconPath} />
            </TouchableOpacity>
            <Text style={activeScreen ? iconStyle.activeText : iconStyle.inactiveText}>{iconText}</Text>
        </View>
    );
};

export default BottomBarIcon;