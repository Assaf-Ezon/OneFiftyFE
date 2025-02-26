import { StyleSheet, Dimensions } from 'react-native';
import calculateFontSize from '../../calculated_font_size';

const { width, height } = Dimensions.get('window');

const TermsAndServicesPopupStyle = StyleSheet.create({
    termsValidationPopup: {
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
        shadowOpacity: 0.30,
        shadowRadius: 5,
    },
    termsValidationPopupTitleContainer: {
        width: '90%',
        height: '20%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    termsValidationPopupTitle: {
        fontSize: calculateFontSize(28),
        fontWeight: '600',
        width: '100%',
        textAlign: 'center',
    },
    termsValidationPopupMainContainer: {
        width: '90%',
        height: '45%',
        alignItems: 'center',
    },
    termsValidationExplanationText: {
        width: '100%',
        fontSize: calculateFontSize(15),
        textAlign: 'right',
    },
    termsValidationLink: {
        color: 'blue',
    },
    checkboxContainer: {
        marginTop: 10,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    checkboxText: {
        fontSize: calculateFontSize(15),
        marginRight: 8,
        textAlign: 'right',
    },
    btnsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%',
        height: '10%',
    },
    termsValidationPopupBtn: {
        width: '40%',
        height: '90%',
        backgroundColor: '#7F5CA6',
        borderRadius: 60,
        alignItems: 'center',
        justifyContent: 'center',
        shadowOpacity: 0.2,
        shadowRadius: 5,
    },
    termsValidationPopupBtnText: {
        color: 'white',
        fontSize: calculateFontSize(18),
        fontWeight: '500',
    },
});

export default TermsAndServicesPopupStyle;