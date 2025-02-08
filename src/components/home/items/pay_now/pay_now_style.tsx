import { StyleSheet, Dimensions } from 'react-native';
import calculateFontSize from '../../../../calculated_font_size';

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
    titlesContainer: {
        width: '95%',
        height: '25%',
        direction: 'rtl',
    },
    titles: {
        width: '150%',
        height: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    planBtn: {
        width: width * 0.3,
        height: height * 0.03,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        borderWidth: 0.3,
        marginLeft: 5,
    },
    planBtnText: {
        fontWeight: '600',
        fontSize: calculateFontSize(13),
    },
    titleContainer: {
        width: '95%',
        height: '30%',
        justifyContent: 'space-around',
    },
    Title: {
        textAlign: 'right',
        fontSize: calculateFontSize(24),
        fontWeight: '700',
        marginRight: 10,
    },
    expiration: {
        textAlign: 'right',
        marginRight: 10,
    },
    Price: {
        textAlign: 'right',
        fontSize: calculateFontSize(24),
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
        fontSize: calculateFontSize(15),
    },
});

export default PayNowStyle;