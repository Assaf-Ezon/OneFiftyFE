import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useState } from 'react';
import { findPlanByName } from './find_payment_plans_by_name';
import { Plans } from '../../../../data_objects/enums/payment_plans';
import { PlanType } from '../../../../data_objects/general/plan_type';
import PayNowStyle from './pay_now_style';

import { useNavigation } from '@react-navigation/native';
import { Screens } from '../../../../data_objects/enums/screens';

import { useProfile } from '../../../../context/general_context/profile_context';

const PayNow = () => {
    const navigation = useNavigation();
    const {profile} = useProfile();

    const [currentPlan, setCurrentPlan] = useState<PlanType>(Plans.OneMonth); 

    const changePlan = (planName: string) => {
        setCurrentPlan(findPlanByName(planName));
    }

    return (
        <View style={PayNowStyle.Container}>
            <View style={PayNowStyle.titlesContainer}>
                <ScrollView horizontal contentContainerStyle={PayNowStyle.titles} showsHorizontalScrollIndicator={false}>
                    {
                        Object.values(Plans).map((plan) => {
                            return (
                                <TouchableOpacity style={[{backgroundColor: plan.Plan == currentPlan.Plan ? '#e57c37' : 'white'}, PayNowStyle.planBtn]} onPress={() => {changePlan(plan.Plan)}} key={plan.Plan}>
                                    <Text style={[{color: plan.Plan == currentPlan.Plan ? 'white' : 'black'}, PayNowStyle.planBtnText]} key={plan.Title} allowFontScaling={false}>{plan.Title}</Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                </ScrollView>
            </View>
            <View style={PayNowStyle.titleContainer}>
                <Text style={PayNowStyle.Title} allowFontScaling={false}>מנוי ל{currentPlan.Title}</Text>
                <Text style={PayNowStyle.expiration} allowFontScaling={false}>
                    תום תוקף תקופת ניסיון: {profile.expirationDate.getDate()}/{profile.expirationDate.getMonth() + 1}/{profile.expirationDate.getFullYear()}
                </Text>
            </View>
            <View style={PayNowStyle.PayBtnContainer}>
                <TouchableOpacity style={PayNowStyle.PayBtn} onPress={() => {navigation.navigate(Screens.PAYMENT as never)}}>
                    <Text style={[{color: currentPlan.backgroundColor}, PayNowStyle.PayBtnText]} allowFontScaling={false}>למעבר לתשלום</Text>
                </TouchableOpacity>
                <Text style={PayNowStyle.Price} allowFontScaling={false}>{currentPlan.Price} ₪</Text> 
            </View>
        </View>
    );
};

export default PayNow;