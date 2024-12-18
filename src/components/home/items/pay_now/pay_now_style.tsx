import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const PayNowStyle = StyleSheet.create({
    Container: {
        backgroundColor: 'white',
        width: '90%',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        height: height * 0.21,
        borderWidth: 1,
        borderRadius: 20,
        shadowOpacity: 0.02,
        marginBottom: 15,
    },
    titles: {
        width: '95%',
        height: '20%',
        flexDirection: 'row-reverse',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    planBtn: {
        width: '30%',
        height: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        borderWidth: 0.3,
    },
    planBtnText: {
        fontWeight: '600',
        fontSize: 13,
    },
    titleContainer: {
        width: '95%',
        height: '25%',
    },
    Title: {
        textAlign: 'right',
        fontSize: 24,
        fontWeight: '700',
        marginRight: 10,
    },
    Price: {
        textAlign: 'right',
        fontSize: 24,
        fontWeight: '700',
    },
    PayBtnContainer: {
        width: '90%',
        height: '20%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    PayBtn: {
        backgroundColor: '#7F5CA6',
        width: '40%',
        height: '100%',
        borderRadius: 60,
        shadowOpacity: 0.1,
        shadowRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    PayBtnText: {
        textAlign: 'center',
        fontWeight: '700',
        color: 'white',
        fontSize: 15,
    },
});

export default PayNowStyle;