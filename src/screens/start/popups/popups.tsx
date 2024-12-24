import { View, Text, Modal, TouchableOpacity, Image } from 'react-native';
import React from 'react';

import PopupsStyle from './popups_style';
import { IMAGES } from '../../../image_handler';

import { useStackManagerContext, StackNames } from '../../../context/general_context/stack_manager_context';

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
                    <Text style={PopupsStyle.errorPopupTitle}>תקלה</Text>
                </View>
                <View style={PopupsStyle.errorPopupMainContainer}>
                    <Text style={PopupsStyle.popupText}>
                        אירוע לא צפוי קרה{'\n'}
                        אנא נסה שנית מאוחר יותר.{'\n'}{'\n'}{'\n'}
                        פנה אלינו: OneFifty.customers@gmail.com
                    </Text>
                </View>
            </View>
        </Modal>
    );
};

const InactivePopup = () => {
    const {setStackIndexByName} = useStackManagerContext();
    
    return(
        <Modal animationType="fade"
        transparent={true}
        visible={true}>
            <View style={PopupsStyle.inactivePopup}>
                <View style={PopupsStyle.inactivePopupTitleContainer}>
                    <Text style={PopupsStyle.inactivePopupTitle}>משתמש לא בתוקף</Text>
                </View>
                <View style={PopupsStyle.inactivePopupMainContainer}>
                    <Text style={PopupsStyle.inactiveExplanationText}>
                        חשבונך הינו פג תוקף מאחת מהסיבות הבאות: {'\n'}
                            1. תקופת המנוי של המשתמש נגמרה{'\n'}
                            2. תקופת הניסיון של המשתמש נגמרה{'\n'}{'\n'}{'\n'}
                            
                        על מנת להמשיך את השימוש באפליקציה, עליך לרכוש מנוי. על מנת לרכוש מנוי, לחץ על הכפתור.{'\n'}{'\n'}
                        (במידה וחלה טעות, פנה אלינו במייל שלנו: OneFifty.customers.com)
                    </Text>
                </View>
                <TouchableOpacity style={PopupsStyle.inactivePopupBtn} onPress={() => setStackIndexByName(StackNames.Inactive)}>
                        <Text style={PopupsStyle.inactivePopupBtnText}>מעבר לתשלום</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
};

export enum AuthErrorType {
    None = 0,
    Error = 1,
    Inactive = 2,
}

const Popup = ({index, setPopupIndex}: {index: number, setPopupIndex: React.Dispatch<React.SetStateAction<number>>}) => {
    const popupsHandler: { [key: number]: JSX.Element | null } = {
        0: null,
        1: <ErrorPopup setPopupIndex={setPopupIndex} />,
        2: <InactivePopup />,
    }

    return(
        <>
            {popupsHandler[index]}
        </>
    );
};

export default Popup;