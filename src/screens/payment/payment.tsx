import { Text, TouchableOpacity, View, Image } from 'react-native';
import { useEffect } from 'react';
import PlansContainer from '../../components/payment/page_part';

import { IMAGES } from '../../image_handler';

import PaymentScreenStyle from './payment_style';
import { Screens } from '../../screen_names';

import { useStackManagerContext, StackNames } from '../../context/general_context/stack_manager_context';
import { PaymentProvider } from '../../context/payment/payment_context';
import { useProfile } from '../../context/general_context/profile_context';

const PaymentPage = ({ navigation }: {navigation: any}) => {
    const {stackIndex, setStackIndexByName} = useStackManagerContext();
    const {profile} = useProfile();
    const isActive = (stackIndex === 2);

    useEffect(() => {
        if (stackIndex == StackNames.Main && !profile.trial) {
            navigation.navigate(Screens.HOME);
        } 
    }, []);

    return (
        <PaymentProvider>
            <View style={PaymentScreenStyle.Container}>
                <View style={PaymentScreenStyle.topPart}>
                    <View style={PaymentScreenStyle.topPartText}>
                        <TouchableOpacity onPress={() => {isActive ? navigation.replace(Screens.HOME) : setStackIndexByName(StackNames.Auth)}}>
                            <Image source={IMAGES.back_icon} />
                        </TouchableOpacity>
                        <Text style={PaymentScreenStyle.pageTitle}>תשלום</Text>
                    </View>
                </View>
                <PlansContainer />
            </View>
        </PaymentProvider>
    );
};

export default PaymentPage;