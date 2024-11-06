import { Text, TouchableOpacity, View, Image } from 'react-native';

import { IMAGES } from '../../image_handler';

import PaymentScreenStyle from './payment_style';

import { SidebarProvider } from '../../context/general_context/sidebar_context';
import { ProfileImageProvider } from '../../context/settings_context/profile_image_context';
import { ContactUsFormProvider } from '../../context/general_context/contact_form_context';

const PaymentPage = ({ navigation, stackIndex, setStackIndex }: {navigation: any, stackIndex: number, setStackIndex: React.Dispatch<React.SetStateAction<number>>}) => {
    // const isActive = (stackIndex === 2);
    const isActive = false;
    return (
        <View style={PaymentScreenStyle.Container}>
            <View style={PaymentScreenStyle.topPart}>
                <View style={PaymentScreenStyle.topPartText}>
                    <TouchableOpacity onPress={() => {isActive ? navigation.replace('home') : setStackIndex(1)}}>
                        <Image source={IMAGES.back_icon} />
                    </TouchableOpacity>
                    <Text style={PaymentScreenStyle.pageTitle}>תשלום</Text>
                </View>
            </View>
            <View style={PaymentScreenStyle.mainPage}>
                {
                    isActive ? null :
                    <Text style={PaymentScreenStyle.explanationText}>
                        חשבונך הינו פג תוקף מאחד מהסיבות הבאות: {'\n'}
                            1. תקופת המנוי של המשתמש נגמרה{'\n'}
                            2. תקופת הניסיון של המשתמש נגמרה{'\n'}
                        {'\n'}{'\n'}
                        על מנת להמשיך את השימוש באפליקציה, עליך לרכוש מנוי:{'\n'}
                        (במידה וחלה טעות, פנה אלינו במייל שלנו: OneFifty.customers.com)
                    </Text>
                }
            </View>
        </View>
    );
};

export default PaymentPage;