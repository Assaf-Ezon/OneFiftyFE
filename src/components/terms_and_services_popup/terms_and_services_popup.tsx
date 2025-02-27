import { View, Text, Modal, TouchableOpacity, Linking, Alert } from 'react-native';
import React, { useState } from 'react';
import CheckBox from 'expo-checkbox';

import TermsAndServicesPopupStyle from './terms_and_services_popup_style';

import { CONFIG } from '../../config';

import { useProfile } from '../../context/general_context/profile_context';

import TermsApprovalRequestHandler from '../../requests/requests_handlers/terms_approval_request_handler';
import AuthenticationHandler from '../../authentication_handler';

import * as WebBrowser from 'expo-web-browser';

const TermsAndServicesPopup = () => {
    const { profile, setIsTermsAndServicesValidation } = useProfile();

    const [isRedirectedToTerms, setIsRedirectedToTerms] = useState<boolean>(false);
    const [isAccepted, setIsAccepted] = useState<boolean>(false);

    const authInstance = AuthenticationHandler.getInstance();
    
    const handleLink = async () => {
        try {
            const supported = await Linking.canOpenURL(CONFIG.terms_and_services_link);

            if (supported) {
                setIsRedirectedToTerms(true);
                await WebBrowser.openBrowserAsync(CONFIG.terms_and_services_link);
            } else {
                Alert.alert('לא ניתן להיכנס ללינק, אנא פנו אלינו');
            }
        } catch {
            Alert.alert('לא ניתן להיכנס ללינק, אנא פנו אלינו');
        }
    };

    const fillAcceptCheckbox = async () => {
        if (isAccepted) {
            setIsAccepted(false);
            return;
        }

        if (isRedirectedToTerms) {
            setIsAccepted(true);
        } else {
            Alert.alert('נא להיכנס ללינק המצורף לפני שממשיכים');
        }
    };

    const closePopup = async () => {
        if (isAccepted) {
            if (isRedirectedToTerms) {
                try {
                    const name = await authInstance.getName();
                    const token = await authInstance.getAccessToken();
    
                    await TermsApprovalRequestHandler.getInstance().post({
                        DisplayName: name,
                        token: token,
                        expirationDate: profile.expirationDate,
                    });
    
                    setIsTermsAndServicesValidation(false);
                } catch {
                    Alert.alert('תקלה קרתה, אנא פנו אלינו');
                }
            } else {
                Alert.alert('נא להיכנס ללינק המצורף לפני שממשיכים');
            }
        } else {
            Alert.alert('נא לאשר את תנאי השימוש ומדיניות הפרטיות');
        };
    };

    return (
        <Modal animationType="fade"
        transparent={true}
        visible={true}>
            <View style={TermsAndServicesPopupStyle.termsValidationPopup}>
                <View style={TermsAndServicesPopupStyle.termsValidationPopupTitleContainer}>
                    <Text style={TermsAndServicesPopupStyle.termsValidationPopupTitle} allowFontScaling={false}>אישור תנאי שימוש ומדיניות פרטיות</Text>
                </View>
                <View style={TermsAndServicesPopupStyle.termsValidationPopupMainContainer}>
                    <Text style={TermsAndServicesPopupStyle.termsValidationExplanationText} allowFontScaling={false}>
                        שימו לב שלא אישרתם את תנאי השימוש ומדיניות הפרטיות העדכנית שלנו. {'\n'}{'\n'}
                        עליכם להיכנס לתנאי השימוש ומדיניות הפרטיות שלנו בלינק הבא: {'\n'}{'\n'}
                        <Text style={TermsAndServicesPopupStyle.termsValidationLink} onPress={() => {handleLink()}}>תנאי שימוש ומדיניות פרטיות </Text> {'\n'}
                    </Text>
                    <View style={TermsAndServicesPopupStyle.checkboxContainer}>
                        <Text style={TermsAndServicesPopupStyle.checkboxText} allowFontScaling={false}>אישור תנאי השימוש ומדיניות הפרטיות</Text>
                        <CheckBox value={isAccepted} onValueChange={() => {fillAcceptCheckbox()}} />
                    </View>
                </View>
                <View style={TermsAndServicesPopupStyle.btnsContainer}>
                        <TouchableOpacity style={TermsAndServicesPopupStyle.termsValidationPopupBtn} onPress={() => {closePopup()}}>
                                <Text style={TermsAndServicesPopupStyle.termsValidationPopupBtnText} allowFontScaling={false}>אישור</Text>
                        </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
};

export default TermsAndServicesPopup;
