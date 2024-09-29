import { View, Image, Text, ImageSourcePropType, TouchableOpacity } from 'react-native';
import { FC } from 'react';

import iconStyle from './icon_style';

import { useNavigation } from '@react-navigation/native';

interface bottomBarIconProp {
    iconPath: ImageSourcePropType;
    iconText: string;
    activeScreen: boolean;
    screenName: string;
};

const BottomBarIcon: FC<bottomBarIconProp> = ({ iconPath, iconText, activeScreen, screenName }) => {
    const navigation = useNavigation();

    return (
        <View style={iconStyle.container}>
            <TouchableOpacity onPress={() => {navigation.navigate(screenName)}}>
                <Image source={iconPath} />
            </TouchableOpacity>
            <Text style={activeScreen ? iconStyle.activeText : iconStyle.inactiveText}>{iconText}</Text>
        </View>
    );
};

export default BottomBarIcon;