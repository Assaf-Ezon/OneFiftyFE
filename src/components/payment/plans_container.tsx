import { View, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { useRef, useState } from 'react';
import { WebView } from 'react-native-webview';
import Plan from './plan/plan';

import PlansContainerStyle from './plans_container_style';

import { Plans } from '../../data_objects/enums/payment_plans';

import { CONFIG } from '../../config';

import { usePaymentContext } from '../../context/payment_context/payment_context';
import AuthenticationHandler from '../../authentication_handler';

import { useStackManagerContext, StackNames } from '../../context/general_context/stack_manager_context';

const PlansContainer = () => {
    // contexts
    const {isPaymentWebViewOpen, setIsPaymentWebViewOpen, details} = usePaymentContext(); 
    const {setStackIndexByName, handleLogout} = useStackManagerContext();

    //auth instance
    const authInstance = AuthenticationHandler.getInstance();

    // reference to the webview
    const webviewRef = useRef<WebView | null>(null);

    // parameters passed to the webview
    const injectPaymentParams = async () => {
        if (webviewRef.current) {
            const token = await authInstance.getAccessToken();
            const displayName = await authInstance.getName();
            const name = details.name;
            const price = details.price;

            if (name && token) {
                const script = `
                    window.paymentParams = {
                        token: '${token}',
                        displayName: '${displayName}',  
                        plan: '${name}',
                        price: ${price},
                        retries: ${CONFIG.retries},
                    };
                `;
        
                webviewRef.current.injectJavaScript(script);
            } else {
                Alert.alert('קרתה שגיאה בהזדהות, אנא התחברו מחדש');
                handleLogout();
            }
        }
    };

    return (
        <View style={PlansContainerStyle.mainPage}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Plan name={Plans.OneMonth.Plan} title={Plans.OneMonth.Title} description={Plans.OneMonth.Description} price={Plans.OneMonth.Price} isRecommended={Plans.OneMonth.isRecommended} backgroundColor={Plans.OneMonth.backgroundColor} productId={Plans.OneMonth.productId} />
                <Plan name={Plans.TwoMonths.Plan} title={Plans.TwoMonths.Title} description={Plans.TwoMonths.Description} price={Plans.TwoMonths.Price} isRecommended={Plans.TwoMonths.isRecommended} backgroundColor={Plans.TwoMonths.backgroundColor} productId={Plans.TwoMonths.productId} />
                <Plan name={Plans.ThreeMonths.Plan} title={Plans.ThreeMonths.Title} description={Plans.ThreeMonths.Description} price={Plans.ThreeMonths.Price} isRecommended={Plans.ThreeMonths.isRecommended} backgroundColor={Plans.ThreeMonths.backgroundColor} productId={Plans.ThreeMonths.productId} />
                <Plan name={Plans.SixMonths.Plan} title={Plans.SixMonths.Title} description={Plans.SixMonths.Description} price={Plans.SixMonths.Price} isRecommended={Plans.SixMonths.isRecommended} backgroundColor={Plans.SixMonths.backgroundColor} productId={Plans.SixMonths.productId} />
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
                                } else if (event.nativeEvent.data == 'success') {
                                    setStackIndexByName(StackNames.Auth);
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