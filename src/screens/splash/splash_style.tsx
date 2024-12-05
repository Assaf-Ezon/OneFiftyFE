import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const SplashScreenStyle = StyleSheet.create({  
    inactivePopup: {
        backgroundColor: '#FAF0E6',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        position: 'absolute',
        top: '50%', 
        left: '50%', 
        transform: [{ translateX: -(width * 0.45) }, { translateY: -(height * 0.3) }],
        width: width * 0.9,
        height: height * 0.6,
        borderRadius: 30,
        shadowOpacity: 0.15,
        shadowRadius: 5,
    },
    inactivePopupTitleContainer: {
        width: '90%',
        height: '20%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    inactivePopupTitle: {
        fontSize: 28,
        fontWeight: '600',
    },
    inactivePopupMainContainer: {
        width: '90%',
        height: '45%',
        alignItems: 'center',
    },
    inactiveExplanationText: {
        width: '100%',
        fontSize: 15,
        textAlign: 'right',
    },
    btnsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%',
        height: '10%',
    },
    inactivePopupBtn: {
        width: '40%',
        height: '90%',
        backgroundColor: '#7F5CA6',
        borderRadius: 60,
        alignItems: 'center',
        justifyContent: 'center',
        shadowOpacity: 0.2,
        shadowRadius: 5,
    },
    inactivePopupBtnText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '500',
    },
    versionPopupContainer: {
        backgroundColor: '#FAF0E6',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        position: 'absolute',
        top: '50%', 
        left: '50%', 
        transform: [{ translateX: -(width * 0.45) }, { translateY: -(height * 0.15) }],
        width: width * 0.9,
        height: height * 0.3,
        borderRadius: 30,
        shadowOpacity: 0.15,
        shadowRadius: 5,
    },
    versionPopupTitleContainer: {
        width: '90%',
        height: '50%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    versionPopupTitle: {
        width: '100%',
        fontSize: 28,
        fontWeight: '600',
        textAlign: 'center',
    },
    versionPopupMainContainer: {
        width: '90%',
        height: '50%',
        alignItems: 'center',
    },
    versionExplanationText: {
        width: '100%',
        fontSize: 15,
        textAlign: 'center',
    },
});

export default SplashScreenStyle;