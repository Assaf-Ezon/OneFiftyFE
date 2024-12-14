import { Text, TouchableOpacity, View, Image, ScrollView } from 'react-native';
import Plan from '../../components/payment/plan';

import { IMAGES } from '../../image_handler';

import PaymentScreenStyle from './payment_style';
import { Screens } from '../../screen_names';

import { useStackManagerContext, StackNames } from '../../context/general_context/stack_manager_context';
import { Plans } from '../../payment_plans';

const PaymentPage = ({ navigation }: {navigation: any}) => {
    const {stackIndex, setStackIndexByName} = useStackManagerContext();
    const isActive = (stackIndex === 2);

    return (
        <View style={PaymentScreenStyle.Container}>
            <View style={PaymentScreenStyle.topPart}>
                <View style={PaymentScreenStyle.topPartText}>
                    <TouchableOpacity onPress={() => {isActive ? navigation.replace(Screens.HOME) : setStackIndexByName(StackNames.Auth)}}>
                        <Image source={IMAGES.back_icon} />
                    </TouchableOpacity>
                    <Text style={PaymentScreenStyle.pageTitle}>תשלום</Text>
                </View>
            </View>
            <View style={PaymentScreenStyle.mainPage}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Plan name={Plans.OneMonth.Name} title={Plans.OneMonth.Title} description={Plans.OneMonth.Description} price={Plans.OneMonth.Price} />
                    <Plan name={Plans.TwoMonths.Name} title={Plans.TwoMonths.Title} description={Plans.TwoMonths.Description} price={Plans.TwoMonths.Price} />
                    <Plan name={Plans.ThreeMonts.Name} title={Plans.ThreeMonts.Title} description={Plans.ThreeMonts.Description} price={Plans.ThreeMonts.Price} />
                    <View style={PaymentScreenStyle.blank} />
                </ScrollView>
            </View>
        </View>
    );
};

export default PaymentPage;