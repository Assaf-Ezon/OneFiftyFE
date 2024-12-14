import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const PlanStyle = StyleSheet.create({
    Container: {
        marginTop: 20,
        width: width * 0.9,
        height: height * 0.22,
        backgroundColor: '#FAF0E6',
        borderRadius: 30,
        borderWidth: 1,
        shadowOpacity: 0.1,
        shadowRadius: 5,
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    TitleContainer: {
        width: '90%',
        height: '20%',
        justifyContent: 'center',
    },
    Title: {
        textAlign: 'right',
        fontSize: 24,
        textDecorationLine: 'underline',
        fontWeight: '600',
    },
    MainContainer: {
        width: '90%',
        height: '35%',
        justifyContent: 'space-evenly',
    },
    Description: {
        textAlign: 'right',
        fontSize: 18,
        fontWeight: '400',
    },
    Price: {
        textAlign: 'right',
        fontSize: 15,
        fontWeight: '400',
    },
    PayBtnContainer: {
        width: '90%',
        height: '20%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    PayBtn: {
        backgroundColor: '#7F5CA6',
        width: '50%',
        height: '80%',
        borderRadius: 60,
        shadowOpacity: 0.1,
        shadowRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    PayBtnText: {
        textAlign: 'center',
        color: 'white',
        fontWeight: '600',
    },
});

export default PlanStyle;