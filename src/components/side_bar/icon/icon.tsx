import { Image, Text, ImageSourcePropType, TouchableOpacity } from 'react-native';
import { FC } from 'react';

import { useNavigation } from '@react-navigation/native';
import { CONFIG } from '../../../config';

import iconStyle from './icon_style';

import { useSidebarContext } from '../../../context/general_context/sidebar_context';
import { useContactUsFormContext } from '../../../context/general_context/contact_form_context';
import { useStackManagerContext } from '../../../context/general_context/stack_manager_context';

import authenticationHandler from '../../../screens/authentication';

interface sideBarIconProp {
    iconPath: ImageSourcePropType;
    iconText: string;
    isRed: boolean;
    onPressActionIndex: number;
    screenName: string;   
};

const SideBarIcon: FC<sideBarIconProp> = ({ iconPath, iconText, isRed, onPressActionIndex, screenName }) => {
    const navigation = useNavigation();

    const {toggleMenu} = useSidebarContext();
    const {toggleOpenContactUsForm} = useContactUsFormContext();
    const {setStackIndexByName} = useStackManagerContext();

    const navigateToPage = () => {
        toggleMenu();
        navigation.navigate(screenName);
    };

    const openContactUsForm = () => {
        toggleMenu();
        toggleOpenContactUsForm();
    };

    const logout = async () => {
        setStackIndexByName('auth');
        await authenticationHandler.getInstance().setRefreshTokenToExpired();
    };

    const onPressHandler = [navigateToPage, openContactUsForm, logout];

    return (
        <>
            <TouchableOpacity style={[{width: isRed ? 'auto' : '100%'}, iconStyle.container]} onPress={() => {onPressHandler[onPressActionIndex]()}}>
                <Text style={[{color: isRed ? 'red' : '#656565'}, iconStyle.text]}>{iconText}</Text>
                <Image source={iconPath}></Image>
            </TouchableOpacity>   
        </>
    );
};

export default SideBarIcon;