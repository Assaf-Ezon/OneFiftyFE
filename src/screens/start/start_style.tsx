import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

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
        shadowOpacity: 0.05,
        shadowRadius: 5,
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
    loading: {

    },
    errorPopup: {
        backgroundColor: '#FAF0E6',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        position: 'absolute',
        top: '50%', 
        left: '50%', 
        transform: [{ translateX: -(width * 0.35) }, { translateY: -(height * 0.15) }],
        width: width * 0.7,
        height: height * 0.3,
        borderRadius: 30,
        shadowOpacity: 0.15,
        shadowRadius: 5,
    },
    errorPopupTitleContainer: {
        width: '90%',
        height: '25%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    popupTitle: {
        fontSize: 25,
        fontWeight: '600',
    },
    errorPopupMainContainer: {
        width: '90%',
        height: '65%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    popupText: {
        fontSize: 15,
        fontWeight: '300',
        textAlign: 'center',
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