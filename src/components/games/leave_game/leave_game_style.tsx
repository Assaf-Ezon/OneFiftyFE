import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const LeaveGameStyle = StyleSheet.create({
    container: {
        justifyContent: 'space-evenly',
        alignItems: 'center',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -(width * 0.45) }, { translateY: -(height * 0.15) }],
        width: width * 0.9,
        height: height * 0.3,
        backgroundColor: '#FAF0E6',
        borderRadius: 30,
        shadowOpacity: 0.15,
        shadowRadius: 5,
    },
    textContainer: {
        width: '90%',
        height: '50%',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
        textAlign: 'center',
    },
    desc: {
        fontSize: 15,
        fontWeight: '400',
        textAlign: 'center',
    },
    btnsContainer: {
        width: '90%',
        height: '25%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    returnBtn: {
        backgroundColor: '#7F5CA6',
        width: '45%',
        height: '55%',
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        shadowOpacity: 0.15,
        shadowRadius: 5,
    },
    returnBtnText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '500',
    },
    exitBtn: {
        backgroundColor: '#7F5CA6',
        width: '45%',
        height: '55%',
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        shadowOpacity: 0.15,
        shadowRadius: 5,
    },
    exitBtnContainer: {
        color: 'white',
        fontSize: 18,
        fontWeight: '500',
    },
});

export default LeaveGameStyle;