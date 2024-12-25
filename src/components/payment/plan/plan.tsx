import { View, Text, TouchableOpacity, Image } from 'react-native';
import { FC } from 'react';

import { IMAGES } from '../../../image_handler';
import PlanStyle from './plan_style';

import { usePaymentContext } from '../../../context/payment_context/payment_context';
import { PaymnetPlanProp } from '../../../Dataobjects/ComponentsProp/PaymentPage/PaymentPlanProp';

const Plan: FC<PaymnetPlanProp> = ({ name, title, description, price, isRecommended, backgroundColor }) => {
    const {setDetails, setIsPaymentWebViewOpen} = usePaymentContext(); 

    const openWebView = () => {     
        setDetails({
            name: name,
            price: price,
        });

        setIsPaymentWebViewOpen(true);
    };

    return (
        <View style={[{backgroundColor: backgroundColor}, PlanStyle.Container]}>
            <View style={PlanStyle.TitleContainer}>
                <Text style={PlanStyle.Title}>תכנית: {title}</Text>
                <Image source={IMAGES.plan} />
            </View>
            <View style={PlanStyle.MainContainer}>
                <Text style={PlanStyle.Description}>{description}</Text> 
                <Image source={IMAGES.check} />
            </View>
            <View style={PlanStyle.PayBtnContainer}>
                <TouchableOpacity style={PlanStyle.PayBtn} onPress={() => {openWebView()}}>
                    <Text style={[{color: backgroundColor}, PlanStyle.PayBtnText]}>שלם עכשיו</Text>
                </TouchableOpacity>
                <Text style={PlanStyle.Price}>{price} ₪</Text> 
            </View>
        </View>
    );
};

export default Plan;