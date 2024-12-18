import { View, Text, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { Plans, PlanType, findPlanByName } from '../../../../payment_plans';

import PayNowStyle from './pay_now_style';

import { useNavigation } from '@react-navigation/native';
import { Screens } from '../../../../screen_names';

const PayNow = () => {
    const navigation = useNavigation();
    const [currentPlan, setCurrentPlan] = useState<PlanType>(Plans.OneMonth); 

    const changePlan = (planName: string) => {
        setCurrentPlan(findPlanByName(planName));
    }

    return (
        <View style={PayNowStyle.Container}>
            <View style={PayNowStyle.titles}>
                {
                    Object.values(Plans).map((plan) => {
                        return (
                            <TouchableOpacity style={[{backgroundColor: plan.Plan == currentPlan.Plan ? '#e57c37' : 'white'}, PayNowStyle.planBtn]} onPress={() => {changePlan(plan.Plan)}}>
                                <Text style={[{color: plan.Plan == currentPlan.Plan ? 'white' : 'black'}, PayNowStyle.planBtnText]}>{plan.Title}</Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
            <View style={PayNowStyle.titleContainer}>
                <Text style={PayNowStyle.Title}>מנוי ל{currentPlan.Title}</Text>
            </View>
            <View style={PayNowStyle.PayBtnContainer}>
                <TouchableOpacity style={PayNowStyle.PayBtn} onPress={() => {navigation.navigate(Screens.PAYMENT)}}>
                    <Text style={[{color: currentPlan.backgroundColor}, PayNowStyle.PayBtnText]}>למעבר לתשלום</Text>
                </TouchableOpacity>
                <Text style={PayNowStyle.Price}>{currentPlan.Price} ₪</Text> 
            </View>
        </View>
    );
};

export default PayNow;