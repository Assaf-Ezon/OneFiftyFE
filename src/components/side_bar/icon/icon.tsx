import { Image, Text, ImageSourcePropType, TouchableOpacity } from 'react-native';
import { FC } from 'react';
import { useNavigation } from '@react-navigation/native';
import iconStyle from './icon_style';
import { useSidebarContext } from '../../../context/general_context/sidebar_context';


interface sideBarIconProp {
    iconPath: ImageSourcePropType;
    iconText: string;
    isRed: boolean;
    screenName: string;   
};

const SideBarIcon: FC<sideBarIconProp> = ({ iconPath, iconText, isRed, screenName }) => {
    const navigation = useNavigation();
    const {toggleMenu} = useSidebarContext();

    const navigateToPage = () => {
        toggleMenu();
        navigation.navigate(screenName);
    };

    return (
        <>
            <TouchableOpacity style={[{width: isRed ? 'auto' : '100%'}, iconStyle.container]} onPress={() => navigateToPage()}>
                <Text style={[{color: isRed ? 'red' : '#656565'}, iconStyle.text]}>{iconText}</Text>
                <Image source={iconPath}></Image>
            </TouchableOpacity>   
        </>
    );
};

export default SideBarIcon;