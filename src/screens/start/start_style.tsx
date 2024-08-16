import { StyleSheet } from 'react-native';

const StartScreenStyle = StyleSheet.create({
    container: {
        flexDirection: 'column',
        flex: 1,
        alignItems: 'center',
    },
    image : {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bgImage: {
        width: '80%',
        backgroundColor: 'red',
    },
    textContainer: {
        flex: 2,
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    title: {
        flex: 1,
        fontSize: 30,
        lineHeight: 45,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    paragraph: {
        flex: 1,
        fontSize: 14,
        lineHeight: 25,
        textAlign: 'center',
        color: '#656565',
    },
    btnContainer: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
    },
    btn: {
        width: '80%',
        height: '60%',
        backgroundColor: '#7F5CA6',
        borderRadius: 60,
        alignItems: 'center',
        justifyContent: 'center',
        shadowOpacity: 0.2,
        shadowRadius: 5,
    },
    btnText: {
        color: 'white',
        fontSize: 25,
        fontWeight: '500',
    },
});

export default StartScreenStyle;