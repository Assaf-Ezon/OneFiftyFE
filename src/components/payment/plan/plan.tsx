import { View, Text, TouchableOpacity } from 'react-native';
import { FC } from 'react';

import PlanStyle from './plan_style';

import { usePaymentContext } from '../../../context/payment/payment_context';

interface PlanProps {
    name: string,
    title: string,
    description: string,
    price: number,
}

const Plan: FC<PlanProps> = ({ name, title, description, price }) => {
    const {setDetails, setIsPaymentWebViewOpen} = usePaymentContext(); 

    const openWebView = () => {     
        setDetails({
            name: name,
            price: price,
        });

        setIsPaymentWebViewOpen(true);
    };

    return (
        <View style={PlanStyle.Container}>
            <View style={PlanStyle.TitleContainer}>
                <Text style={PlanStyle.Title}>תכנית: {title}</Text>
            </View>
            <View style={PlanStyle.MainContainer}>
                <Text style={PlanStyle.Description}>{description}</Text>
                <Text style={PlanStyle.Price}>מחיר: {price} ש"ח</Text>  
            </View>
            <View style={PlanStyle.PayBtnContainer}>
                <TouchableOpacity style={PlanStyle.PayBtn} onPress={() => {openWebView()}}>
                    <Text style={PlanStyle.PayBtnText}>שלם עכשיו</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Plan;