import { View, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import { WebView } from 'react-native-webview';
import Plan from './plan/plan';

import PlansContainerStyle from './page_part_style';

import { Plans } from '../../payment_plans';

import { usePaymentContext } from '../../context/payment/payment_context';
import AuthenticationHandler from '../../screens/AuthenticationHandler';

const PlansContainer = () => {
    const {isPaymentWebViewOpen, setIsPaymentWebViewOpen, details} = usePaymentContext(); 
    const authInstance = AuthenticationHandler.getInstance();

    const [params, setParams] = useState<string>('');
    const [first, setFirst] = useState<boolean>(true);

    useEffect(() => {
        const parametersForWebview = async () => {
            const paymentParams = { 'DisplayName': await authInstance.getName(), 'name': details.name, 'price': details.price };
    
            setParams(`window.postMessage(JSON.stringify(${JSON.stringify(paymentParams)}), '*');`);
            console.log(params);
        }

        parametersForWebview();
    }, [details]);

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
                            injectedJavaScript={params}
                            onMessage={(event) => {
                                if (event.nativeEvent.data == 'remove') {
                                    setIsPaymentWebViewOpen(false);
                                }
                            }}
                        />
                    </View>
                : null
            }
        </View>
    );
};

export default PlansContainer;