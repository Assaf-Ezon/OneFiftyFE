import { View, Image, Text, ImageSourcePropType, TouchableOpacity } from 'react-native';
import { FC } from 'react';
import iconStyle from './icon_style';

interface bottomBarIconProp {
    iconPath: ImageSourcePropType;
    iconText: string;
    activeScreen: boolean;
};

const BottomBarIcon: FC<bottomBarIconProp> = ({ iconPath, iconText, activeScreen }) => {
    return (
        <View style={iconStyle.container}>
            <TouchableOpacity>
                <Image source={iconPath} />
            </TouchableOpacity>
            <Text style={activeScreen ? iconStyle.activeText : iconStyle.inactiveText}>{iconText}</Text>
        </View>
    );
};

export default BottomBarIcon;