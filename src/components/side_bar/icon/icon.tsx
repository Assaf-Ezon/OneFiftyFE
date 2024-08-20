import { View, Image, Text, ImageSourcePropType, TouchableOpacity } from 'react-native';
import { FC } from 'react';
import iconStyle from './icon_style';

interface sideBarIconProp {
    iconPath: ImageSourcePropType;
    iconText: string;
    isRed: boolean;   
};

const SideBarIcon: FC<sideBarIconProp> = ({ iconPath, iconText, isRed }) => {
    return (
        <>
            <TouchableOpacity style={[{width: isRed ? 'auto' : '100%'}, iconStyle.container]}>
                <Text style={[{color: isRed ? 'red' : '#656565'}, iconStyle.text]}>{iconText}</Text>
                <Image source={iconPath}></Image>
            </TouchableOpacity>
        </>
    );
};

export default SideBarIcon;