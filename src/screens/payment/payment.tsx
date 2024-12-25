import { Text, TouchableOpacity, View, Image } from 'react-native';
import { useEffect } from 'react';
import PlansContainer from '../../components/payment/plans_container';

import { IMAGES } from '../../image_handler';
import { Screens } from '../../data_objects/enums/screens/screens';

import PaymentScreenStyle from './payment_style';

import { useStackManagerContext, StackNames } from '../../context/general_context/stack_manager_context';
import { PaymentProvider } from '../../context/payment_context/payment_context';
import { useProfile } from '../../context/general_context/profile_context';

const PaymentPage = ({ navigation }: {navigation: any}) => {
    const {stackIndex, setStackIndexByName} = useStackManagerContext();
    const {profile} = useProfile();
    const isActive = (stackIndex == StackNames.Main);

    useEffect(() => {
        if (isActive && !profile.isTrial) {
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