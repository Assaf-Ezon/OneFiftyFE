import { View, Text, Modal, TouchableOpacity, Linking, Alert } from 'react-native';
import React, { useState } from 'react';

import TermsAndServicesPopupStyle from './terms_and_services_popup_style';

import { CONFIG } from '../../config';

import { useProfile } from '../../context/general_context/profile_context';

import TermsApprovalRequestHandler from '../../requests/requests_handlers/terms_approval_request_handler';
import AuthenticationHandler from '../../authentication_handler';

const TermsAndServicesPopup = () => {
    const { profile, setIsTermsAndServiesValidation } = useProfile();

    const [isRedirectedToTerms, setIsRedirectedToTerms] = useState<boolean>(false);

    const authInstance = AuthenticationHandler.getInstance();
    
    const handleLink = async () => {
        try {
            const supported = await Linking.canOpenURL(CONFIG.terms_and_services_link);

            if (supported) {
                setIsRedirectedToTerms(true);
                await Linking.openURL(CONFIG.terms_and_services_link);
            } else {
                Alert.alert('לא ניתן להיכנס ללינק, אנא פנו אלינו');
            }
        } catch {
            Alert.alert('לא ניתן להיכנס ללינק, אנא פנו אלינו');
        }
    };

    const closePopup = async () => {
        if (isRedirectedToTerms) {
            try {
                const name = await authInstance.getName();
                const token = await authInstance.getAccessToken();

                const leaderboardData: TermsApprovalRequestHandler = await TermsApprovalRequestHandler.getInstance().post({
                    DisplayName: name,
                    token: token,
                    expirationDate: profile.expirationDate,
                });

                setIsTermsAndServiesValidation(false);
            } catch {
                Alert.alert('תקלה קרתה, אנא פנו אלינו');
            }
        } else {
            Alert.alert('נא להיכנס ללינק המצורף לפני שממשיכים');
        }
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
