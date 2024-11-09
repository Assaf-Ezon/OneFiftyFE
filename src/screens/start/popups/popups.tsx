import { View, Text, Modal, TouchableOpacity, Image } from 'react-native';

import PopupsStyle from './popups_style';
import { IMAGES } from '../../../image_handler';

import { useStackManagerContext } from '../../../context/general_context/stack_manager_context';

const ErrorPopup = ({setPopupOpen} : {setPopupOpen: React.Dispatch<React.SetStateAction<boolean>>}) => {
    return(
        <Modal animationType="fade"
        transparent={true}
        visible={true}>
            <View style={PopupsStyle.errorPopup}>
                <View style={PopupsStyle.errorPopupTitleContainer}>
                    <TouchableOpacity onPress={() => {setPopupOpen(false)}}>
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
    const {setStackIndex} = useStackManagerContext();
    
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
                <TouchableOpacity style={PopupsStyle.inactivePopupBtn} onPress={() => setStackIndex(3)}>
                        <Text style={PopupsStyle.inactivePopupBtnText}>מעבר לתשלום</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
};

const Popup = ({index, setPopupOpen}: {index: number, setPopupOpen: React.Dispatch<React.SetStateAction<boolean>>}) => {
    const popupsHandler: { [key: number]: JSX.Element | null } = {
        1: <ErrorPopup setPopupOpen={setPopupOpen} />,
        2: <InactivePopup />,
    }

    return(
        <>
            {popupsHandler[index]}
        </>
    );
};

export default Popup;