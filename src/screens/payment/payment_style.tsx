import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const PaymentScreenStyle = StyleSheet.create({
    Container: {
        alignItems: 'center',
    },
    topPart: {
        width: '100%',
        height: height * 0.18,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: '#FAF0E6',
        borderRadius: 30,
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },
    topPartText: {
        width: '90%',
        height: '50%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    pageTitle: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    mainPage: {
        marginTop: 20,
        width: width * 0.9,
        alignItems: 'center',
        height: height * 0.8,
    },
    blank: {
        height: 80, 
        width: '100%',
    },
});

export default PaymentScreenStyle;