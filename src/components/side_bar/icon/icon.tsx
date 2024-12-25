import { Image, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { FC } from 'react';

import { useNavigation } from '@react-navigation/native';

import iconStyle from './icon_style';

import { useSidebarContext } from '../../../context/general_context/sidebar_context';
import { useContactUsFormContext } from '../../../context/general_context/contact_form_context';
import { useStackManagerContext } from '../../../context/general_context/stack_manager_context';
import { SideBarIconProp } from '../../../Dataobjects/ComponentsProp/General/SideBarIconProp';

const SideBarIcon: FC<SideBarIconProp> = ({ iconPath, iconText, isRed, onPressActionIndex, screenName }) => {
    const navigation = useNavigation();

    const {toggleMenu} = useSidebarContext();
    const {toggleOpenContactUsForm} = useContactUsFormContext();
    const {handleLogout} = useStackManagerContext();

    const navigateToPage = () => {
        toggleMenu();
        navigation.navigate(screenName as never);
    };

    const openContactUsForm = () => {
        toggleMenu();
        toggleOpenContactUsForm();
    };

    const logout = async () => {
        handleLogout();
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