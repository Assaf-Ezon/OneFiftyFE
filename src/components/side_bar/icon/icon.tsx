import { View, Image, Text, ImageSourcePropType, TouchableOpacity } from 'react-native';
import { FC } from 'react';
import iconStyle from './icon_style';

interface sideBarIconProp {
    iconPath: ImageSourcePropType;
    iconText: string;
    activeScreen: boolean;
};

const SideBarIcon: FC<sideBarIconProp> = ({ iconPath, iconText, activeScreen }) => {
    return (
        <View style={iconStyle.container}>

        </View>
    );
};

export default SideBarIcon;