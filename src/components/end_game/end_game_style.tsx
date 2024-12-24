import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const EndGameStyle = StyleSheet.create({
    container: {
        justifyContent: 'space-evenly',
        alignItems: 'center',
        position: 'absolute',
        top: '75%',
        left: '50%',
        transform: [{ translateX: -(width * 0.45) }, { translateY: -(height * 0.3) }],
        width: width * 0.9,
        height: height * 0.6,
        backgroundColor: '#FAF0E6',
        borderRadius: 30,
        shadowOpacity: 0.15,
        shadowRadius: 5,
    },
    titleContainer: {
         justifyContent: 'center',
         alignItems: 'flex-end',
         width: '90%',
         height: '20%',
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        textAlign: 'right',
    },
    mainContainer: {
        width: '90%',
        height: '50%',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    sumContainer: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        width: '100%',
    },
    sum: {
        fontSize: 16,
        fontWeight: '500',
        textAlign: 'right',
    },
    lang: {
        fontSize: 16,
        fontWeight: '500',
        textAlign: 'right',
    },
    correctContainer: {
        width: '100%',
        alignItems: 'flex-end',
    },
    correct: {
        fontSize: 16,
        fontWeight: '500',
        textAlign: 'right',
    },
    wrongContainer: {
        width: '100%',
        alignItems: 'flex-end',
    },
    wrong: {
        fontSize: 16,
        fontWeight: '500',
        textAlign: 'right',
    },
    btnContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
        height: '20%',
    },
    btn: {
        backgroundColor: '#7F5CA6',
        width: '60%',
        height: '40%',
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '500',
    },
    loadingContainer: {
        position: 'absolute',
        top: '50%', 
        left: '50%', 
        width: 50,
        height: 50,
        transform: [{ translateX: -20 }, { translateY: -20 }],
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default EndGameStyle;