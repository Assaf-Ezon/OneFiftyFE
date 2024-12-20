import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const PlanStyle = StyleSheet.create({
    Container: {
        marginTop: 20,
        width: width * 0.9,
        height: height * 0.22,
        borderRadius: 30,
        shadowOpacity: 0.1,
        shadowRadius: 5,
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    TitleContainer: {
        width: '90%',
        height: '20%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    Title: {
        textAlign: 'right',
        color: 'white',
        fontSize: 24,
        fontWeight: '700',
        marginRight: 10,
    },
    MainContainer: {
        width: '90%',
        height: '35%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    Description: {
        textAlign: 'right',
        color: 'white',
        fontSize: 18,
        fontWeight: '400',
        marginRight: 10,
    },
    Price: {
        textAlign: 'right',
        color: 'white',
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
        backgroundColor: 'white',
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
        fontSize: 15,
    },
});

export default PlanStyle;