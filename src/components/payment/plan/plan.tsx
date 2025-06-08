import { View, Text, TouchableOpacity, Image } from 'react-native';
import { FC } from 'react';

import { IMAGES } from '../../../image_handler';
import PlanStyle from './plan_style';

import { PaymnetPlanConfig } from '../../../data_objects/components_config/payment_plan_config';


const Plan: FC<PaymnetPlanConfig> = ({ name, title, description, price, backgroundColor, onPress }) => {

    return (
        <View style={[{backgroundColor: backgroundColor}, PlanStyle.Container]}>
            <View style={PlanStyle.TitleContainer}>
                <Text style={PlanStyle.Title} allowFontScaling={false}>תכנית: {title}</Text>
                <Image source={IMAGES.plan} />
            </View>
            <View style={PlanStyle.MainContainer}>
                <Text style={PlanStyle.Description} allowFontScaling={false}>{description}</Text> 
                <Image source={IMAGES.check} />
            </View>
            <View style={PlanStyle.PayBtnContainer}>
                <TouchableOpacity style={PlanStyle.PayBtn} onPress={() => onPress()}>
                    <Text style={[{color: backgroundColor}, PlanStyle.PayBtnText]} allowFontScaling={false}>שלמו עכשיו</Text>
                </TouchableOpacity>
                <Text style={PlanStyle.Price} allowFontScaling={false}>{price} ₪</Text> 
            </View>
        </View>
    );
};

export default Plan;