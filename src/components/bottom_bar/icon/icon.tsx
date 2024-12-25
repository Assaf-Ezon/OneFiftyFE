import { View, Image, Text, TouchableOpacity } from 'react-native';
import { FC } from 'react';

import iconStyle from './icon_style';

import { useNavigation } from '@react-navigation/native';
import { BottomBarIconProp } from '../../../Data objects/ComponentsProp/General/bottomBarIconProp';

const BottomBarIcon: FC<BottomBarIconProp> = ({ iconPath, iconText, activeScreen, screenName }) => {
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