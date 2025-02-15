import { View, Text, Modal, TouchableOpacity, Image } from 'react-native';
import React from 'react';

import PopupsStyle from './authentication_popup_style';
import { IMAGES } from '../../image_handler';
import { CONFIG } from '../../config';

import { useNavigation } from '@react-navigation/native';

import { useStackManagerContext, StackNames } from '../../context/general_context/stack_manager_context';
import { AuthErrorType } from '../../data_objects/enums/auth_error_type';
import { Screens } from '../../data_objects/enums/screens';

const ErrorPopup = ({setPopupIndex} : {setPopupIndex: React.Dispatch<React.SetStateAction<number>>}) => {
    return(
        <Modal animationType="fade"
        transparent={true}
        visible={true}>
            <View style={PopupsStyle.errorPopup}>
                <View style={PopupsStyle.errorPopupTitleContainer}>
                    <TouchableOpacity onPress={() => {setPopupIndex(AuthErrorType.None)}}>
                        <Image source={IMAGES.back_icon} />
                    </TouchableOpacity>
                    <Text style={PopupsStyle.errorPopupTitle} allowFontScaling={false}>תקלה</Text>
                </View>
                <View style={PopupsStyle.errorPopupMainContainer}>
                    <Text style={PopupsStyle.popupText} allowFontScaling={false}>
                        אירוע לא צפוי קרה{'\n'}
                        אנא נסו שנית מאוחר יותר.{'\n'}{'\n'}
                        פנו אלינו: {CONFIG.email}
                    </Text>
                </View>
            </View>
        </Modal>
    );
};

const IncorrectVersionPopup = () => {
    return (
        <Modal animationType="fade"
        transparent={true}
        visible={true}>
            <View style={PopupsStyle.versionPopupContainer}>
                <View style={PopupsStyle.versionPopupTitleContainer}>
                    <Text style={PopupsStyle.versionPopupTitle} allowFontScaling={false}>עדכן גרסה</Text>
                </View>
                <View style={PopupsStyle.versionPopupMainContainer}>
                    <Text style={PopupsStyle.versionExplanationText} allowFontScaling={false}>
                        גרסה המותקנת על מכשירכם אינה העדכנית ביותר. {'\n'}
                        אנא עדכנו את הגרסה על מנת להמשיך להשתמש באפליקציה{'\n'}
                    </Text>
                </View>
            </View>
        </Modal>
    )
}

const InactivePopup = ({setPopupIndex} : {setPopupIndex: React.Dispatch<React.SetStateAction<number>>}) => {
    const navigation = useNavigation();

    const {setStackIndexByName} = useStackManagerContext();
    
    const redirectToStartPage = () => {
        setPopupIndex(AuthErrorType.None);
        navigation.navigate(Screens.START as never);
    }

    return(
        <Modal animationType="fade"
        transparent={true}
        visible={true}>
            <View style={PopupsStyle.inactivePopup}>
                <View style={PopupsStyle.inactivePopupTitleContainer}>
                    <Text style={PopupsStyle.inactivePopupTitle} allowFontScaling={false}>משתמש לא בתוקף</Text>
                </View>
                <View style={PopupsStyle.inactivePopupMainContainer}>
                    <Text style={PopupsStyle.inactiveExplanationText} allowFontScaling={false}>
                        חשבונכם הינו פג תוקף מאחת מהסיבות הבאות: {'\n'}
                            1. תקופת המנוי של המשתמש נגמרה{'\n'}
                            2. תקופת הניסיון של המשתמש נגמרה{'\n'}{'\n'}{'\n'}
                            
                        על מנת להמשיך את השימוש באפליקציה, עליכם לרכוש מנוי. על מנת לרכוש מנוי, לחצו על הכפתור.{'\n'}{'\n'}
                        (במידה וחלה טעות, פנו אלינו במייל שלנו: OneFifty.customers.com)
                    </Text>
                </View>
                <View style={PopupsStyle.btnsContainer}>
                        <TouchableOpacity style={PopupsStyle.inactivePopupBtn} onPress={() => setStackIndexByName(StackNames.Inactive)}>
                                <Text style={PopupsStyle.inactivePopupBtnText} allowFontScaling={false}>מעבר לתשלום</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={PopupsStyle.inactivePopupBtn} onPress={() => redirectToStartPage()}>
                                <Text style={PopupsStyle.inactivePopupBtnText} allowFontScaling={false}>למסך התחברות</Text>
                        </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const InternetConnectionPopup = () => {
    return (
        <Modal animationType="fade"
        transparent={true}
        visible={true}>
            <View style={PopupsStyle.internetPopupContainer}>
                <View style={PopupsStyle.internetPopupTitleContainer}>
                    <Text style={PopupsStyle.internetPopupTitle} allowFontScaling={false}>אינכם מחוברים לאינטרנט</Text>
                </View>
                <View style={PopupsStyle.internetPopupMainContainer}>
                    <Text style={PopupsStyle.internetExplanationText} allowFontScaling={false}>
                        אנא התחברו ונסו שוב{'\n'}
                    </Text>
                </View>
            </View>
        </Modal>
    )
}

const AuthenticationPopup = ({index, setPopupIndex}: {index: number, setPopupIndex: React.Dispatch<React.SetStateAction<number>>}) => {
    const popupsHandler: { [key: number]: JSX.Element | null } = {
        0: null,
        1: <ErrorPopup setPopupIndex={setPopupIndex} />,
        2: <InactivePopup setPopupIndex={setPopupIndex} />,
        3: <IncorrectVersionPopup />,
        4: <InternetConnectionPopup />,
    }

    return(
        <>
            {popupsHandler[index]}
        </>
    );
};

export default AuthenticationPopup;