import { View, ScrollView, ActivityIndicator } from 'react-native';
import { useRef, useState } from 'react';
import { WebView } from 'react-native-webview';
import Plan from './plan/plan';

import { useNavigation } from '@react-navigation/native';

import PlansContainerStyle from './plans_container_style';

import { Plans } from '../../payment_plans';

import { CONFIG } from '../../config';

import { usePaymentContext } from '../../context/payment/payment_context';
import AuthenticationHandler from '../../screens/AuthenticationHandler';

import { useStackManagerContext, StackNames } from '../../context/general_context/stack_manager_context';

const PlansContainer = () => {
    // navigation handler
    const navigation = useNavigation();

    // contexts
    const {isPaymentWebViewOpen, setIsPaymentWebViewOpen, details} = usePaymentContext(); 
    const {setStackIndexByName} = useStackManagerContext();

    //auth instance
    const authInstance = AuthenticationHandler.getInstance();

    // loading flag
    const [loading, setLoading] = useState<boolean>(false);

    // reference to the webview
    const webviewRef = useRef<WebView | null>(null);

    // parameters passed to the webview
    const injectPaymentParams = async () => {
        if (webviewRef.current) {
            const token = await authInstance.getAccessToken();
            const displayName = await authInstance.getName();
            const name = details.name;
            const price = details.price;
        
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
        }
    };

    return (
        <View style={[{opacity: loading ? 0.2 : 1}, PlansContainerStyle.mainPage]}
        pointerEvents={loading ? 'none' : 'auto'}>
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
                                } else if (event.nativeEvent.data == 'success') {
                                    setStackIndexByName(StackNames.Auth);
                                }
                            }}
                        />
                    </View>
                : null
            }
            {loading ? <View style={PlansContainerStyle.loadingContainer}><ActivityIndicator size="large" color="black" /></View> : null}
        </View>
    );
};

export default PlansContainer;