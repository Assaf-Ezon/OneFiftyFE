import { StyleSheet, Dimensions } from 'react-native';
import calculateFontSize from '../../../calculated_font_size';

const { width, height } = Dimensions.get('window');

const PagePartStyle = StyleSheet.create({
    container: {
        flexGrow: 1,
        width: '100%',
        height: '110%',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    topPart: {
        width: '100%',
        height: height * 0.18,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: '#FAF0E6',
        borderRadius: 30,
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },
    topPartText: {
        width: '90%',
        height: '50%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    pageTitle: {
        fontSize: calculateFontSize(30),
        fontWeight: 'bold',
    },
    ScrollviewContainer: {
        width: '100%',
        height: height * 0.82,
        flexDirection: 'column',
    },
    settingBtnContainer: {
        width: '90%',
        height: '8%',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    settingsBtn: {
        backgroundColor: '#FF7518',
        width: '100%',
        height: height * 0.05,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        shadowOpacity: 0.1,
        shadowRadius: 1,
    },
    settingsBtnText: {
        color: 'white',
        fontSize: calculateFontSize(18),
        fontWeight: '600',
        marginRight: 5,
    },
    mainPart: {
        flexGrow: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
    },
    blank: {
        height: height * 0.2,
    },
});

export default PagePartStyle;