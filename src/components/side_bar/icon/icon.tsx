import { Image, Text, TouchableOpacity, Linking, Alert } from 'react-native';
import React from 'react';
import { FC, useState } from 'react';

import { useNavigation } from '@react-navigation/native';

import iconStyle from './icon_style';
import * as WebBrowser from 'expo-web-browser';
import { useSidebarContext } from '../../../context/general_context/sidebar_context';
import { useContactUsFormContext } from '../../../context/general_context/contact_form_context';
import { useStackManagerContext } from '../../../context/general_context/stack_manager_context';
import { SideBarIconConfig } from '../../../data_objects/components_config/general/sidebar_icon_config';
import { CONFIG } from '../../../config';

const SideBarIcon: FC<SideBarIconConfig> = ({ iconPath, iconText, isRed, onPressActionIndex, screenName }) => {
    const navigation = useNavigation();
    const [isRedirectedToTerms, setIsRedirectedToTerms] = useState<boolean>(false);
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

    const handleLink = async (link: string) => {
        try {
            const supported = await Linking.canOpenURL(link);

            if (supported) {
                setIsRedirectedToTerms(true);
                await WebBrowser.openBrowserAsync(link); //);
            } else {
                Alert.alert('לא ניתן להיכנס ללינק, אנא פנו אלינו');
            }
        } catch {
            Alert.alert('לא ניתן להיכנס ללינק, אנא פנו אלינו');
        }
    };

    const openTermsOfService = () => {
        handleLink(CONFIG.terms_and_services_link);
    };

    const openPrivacyAgreement = () => {
        handleLink(CONFIG.privacy_agreement_link);
    };

    const logout = async () => {
        handleLogout();
    };

    const onPressHandler = [navigateToPage, openContactUsForm, logout, openTermsOfService, openPrivacyAgreement];

    return (
        <>
            <TouchableOpacity style={[{width: isRed ? 'auto' : '100%'}, iconStyle.container]} onPress={() => {onPressHandler[onPressActionIndex]()}}>
                <Text style={[{color: isRed ? 'red' : '#656565'}, iconStyle.text]} allowFontScaling={false}>{iconText}</Text>
                <Image source={iconPath} style={iconStyle.iconImage}></Image>
            </TouchableOpacity>   
        </>
    );
};

export default SideBarIcon;