import { View, ScrollView } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { WebView } from 'react-native-webview';
import Plan from './plan/plan';

import PlansContainerStyle from './page_part_style';

import { Plans } from '../../payment_plans';

import { usePaymentContext } from '../../context/payment/payment_context';
import AuthenticationHandler from '../../screens/AuthenticationHandler';

const PlansContainer = () => {
    const {isPaymentWebViewOpen, setIsPaymentWebViewOpen, details} = usePaymentContext(); 
    const authInstance = AuthenticationHandler.getInstance();

    const webviewRef = useRef<WebView | null>(null);

    const injectPaymentParams = async () => {
        if (webviewRef.current) {
            const displayName = await authInstance.getName();
            const name = details.name;
            const price = details.price;
        
            const script = `
                window.paymentParams = {
                    displayName: '${displayName}',  
                    plan: '${name}',
                    price: ${price}
                };
            `;
        
            webviewRef.current.injectJavaScript(script);
        }
    };

    return (

        <View style={PlansContainerStyle.mainPage}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Plan name={Plans.OneMonth.Plan} title={Plans.OneMonth.Title} description={Plans.OneMonth.Description} price={Plans.OneMonth.Price} isRecommended={Plans.OneMonth.isRecommended} backgroundColor={Plans.OneMonth.backgroundColor} />
                <Plan name={Plans.TwoMonths.Plan} title={Plans.TwoMonths.Title} description={Plans.TwoMonths.Description} price={Plans.TwoMonths.Price} isRecommended={Plans.TwoMonths.isRecommended} backgroundColor={Plans.TwoMonths.backgroundColor} />
                <Plan name={Plans.ThreeMonths.Plan} title={Plans.ThreeMonths.Title} description={Plans.ThreeMonths.Description} price={Plans.ThreeMonths.Price} isRecommended={Plans.ThreeMonths.isRecommended} backgroundColor={Plans.ThreeMonths.backgroundColor} />
                <View style={PlansContainerStyle.blank} />
            </ScrollView>
            {
                isPaymentWebViewOpen ? 
                    <View style={PlansContainerStyle.WebviewContainer}>
                        <WebView
                            originWhitelist={['*']}
                            ref={webviewRef}
                            onLoad={() => {
                                injectPaymentParams();  // Inject the script when the WebView has fully loaded
                            }}
                            source={require('../../../assets/html/paypal_form.html')}
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