import { Text, TouchableOpacity, View, Image } from 'react-native';

import { IMAGES } from '../../image_handler';

import PaymentScreenStyle from './payment_style';

import { ProfileImageProvider } from '../../context/settings_context/profile_image_context';
import { useStackManagerContext } from '../../context/general_context/stack_manager_context';

const PaymentPage = ({ navigation }: {navigation: any}) => {
    const {stackIndex, setStackIndex} = useStackManagerContext();
    const isActive = (stackIndex === 2);

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

            </View>
        </View>
    );
};

export default PaymentPage;