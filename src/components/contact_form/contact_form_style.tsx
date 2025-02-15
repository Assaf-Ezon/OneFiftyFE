import { StyleSheet, Dimensions } from 'react-native';
import { CONFIG } from '../../config';
import calculateFontSize from '../../calculated_font_size';

const { width, height } = Dimensions.get('window');

const ContactFormStyle = StyleSheet.create({
    container: {
        position: 'absolute',
        top: height * 0.55,
        width: width,
        height: height * 0.5,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        backgroundColor: '#FAF0E6',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        borderRadius: 30,
        shadowOpacity: 0.15,
        shadowRadius: 5,
        zIndex: CONFIG.zIndexLevels.popups,
    },
    titleContainer: {
        marginTop: 10,
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: calculateFontSize(22),
        fontWeight: '600',
    },
    EmailContact: {
        width: '90%',
        height: '70%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    EmailContactBtn: {
        backgroundColor: '#7F5CA6',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        shadowOpacity: 0.2,
        shadowRadius: 3,
        width: '80%',
        height: height * 0.05,
    },
    EmailContactBtnText: {
        color: 'white',
        fontSize: calculateFontSize(15),
        fontWeight: '500',
        textAlign: 'center',
    },
});

export default ContactFormStyle;