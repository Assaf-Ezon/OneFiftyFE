import { View, ScrollView } from 'react-native';
import { WebView } from 'react-native-webview';
import Plan from './plan/plan';

import PlansContainerStyle from './page_part_style';

import { Plans } from '../../payment_plans';

import { usePaymentContext } from '../../context/payment/payment_context';

const PlansContainer = () => {
    const {isPaymentWebViewOpen} = usePaymentContext(); 

    return (

        <View style={PlansContainerStyle.mainPage}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Plan name={Plans.OneMonth.Name} title={Plans.OneMonth.Title} description={Plans.OneMonth.Description} price={Plans.OneMonth.Price} />
                <Plan name={Plans.TwoMonths.Name} title={Plans.TwoMonths.Title} description={Plans.TwoMonths.Description} price={Plans.TwoMonths.Price} />
                <Plan name={Plans.ThreeMonts.Name} title={Plans.ThreeMonts.Title} description={Plans.ThreeMonts.Description} price={Plans.ThreeMonts.Price} />
                <View style={PlansContainerStyle.blank} />
            </ScrollView>
            {
                isPaymentWebViewOpen ? 
                    <View style={PlansContainerStyle.WebviewContainer}>
                        <WebView
                            originWhitelist={['*']}
                            source={require('../../../assets/html/paypal_form.html')}
                        />
                    </View>
                : null
            }
        </View>
    );
};

export default PlansContainer;