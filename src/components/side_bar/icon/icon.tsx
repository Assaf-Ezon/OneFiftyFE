import { Image, Text, ImageSourcePropType, TouchableOpacity } from 'react-native';
import { FC } from 'react';

import { useNavigation } from '@react-navigation/native';
import { CONFIG } from '../../../config';

import iconStyle from './icon_style';

import { useSidebarContext } from '../../../context/general_context/sidebar_context';
import { useContactUsFormContext } from '../../../context/general_context/contact_form_context';
import { useStackManagerContext } from '../../../context/general_context/stack_manager_context';

import * as SecureStore from 'expo-secure-store';


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
    const {setStackIndex} = useStackManagerContext();

    const navigateToPage = () => {
        toggleMenu();
        navigation.navigate(screenName);
    };

    const openContactUsForm = () => {
        toggleMenu();
        toggleOpenContactUsForm();
    };

    const logout = async () => {
        setStackIndex(1);
        await SecureStore.setItemAsync(CONFIG.refresh_token_exp, (0).toString());
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