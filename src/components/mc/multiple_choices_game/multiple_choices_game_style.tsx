import { StyleSheet, Dimensions } from 'react-native';
import calculateFontSize from '../../../calculated_font_size';

const { width, height } = Dimensions.get('window');

const MultipleChoicesGameStyle = StyleSheet.create({
    question: {
        top: width * 0.1,
        width: width * 0.9,
        height: height * 0.5,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    wordSection: {
        marginTop: 10,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    wordCounter: {
        fontSize: calculateFontSize(15),
        shadowOpacity: 0.1,
        shadowRadius: 1,
    },
    word: {
        fontSize: calculateFontSize(25),
        fontWeight: '600',
        shadowOpacity: 0.05,
        shadowRadius: 1,
    },
    texts: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    pirushim: {
        height: height * 0.4,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
    },
    option: {
        width: '100%',
        height: height * 0.07,
        borderRadius: 20,
        borderWidth: 0.2,
        borderColor: '#5F5F5F',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    optionText: {
        width: '80%',
        textAlign: 'right',
        fontSize: calculateFontSize(12),
        marginRight: 15,
    },
    optionImage: {
        marginRight: 10,
    },
    btnText: {
        textAlign: 'center',
        color: 'white',
        fontSize: calculateFontSize(16),
        fontWeight: '500',
    },
    nextBtn: {
        top: height * 0.1,
        width: width * 0.9,
        height: height * 0.05,
        borderRadius: 60,
        backgroundColor: '#7F5CA6',
        justifyContent: 'center',
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
});

export default MultipleChoicesGameStyle;