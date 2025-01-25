import { StyleSheet } from 'react-native';
import calculateFontSize from '../../../../calculated_font_size';

const WordStyle = StyleSheet.create({
    container: {
        marginTop: 15,
        width: '100%',
        flexDirection: 'column',
        borderWidth: 1,
        borderRadius: 10,
        padding: 4,
        backgroundColor: 'white',
    },
    wordContainer: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    word: {
        textAlign: 'right',
        fontSize: calculateFontSize(20),
        marginRight: 5,
    },
    meaningConatiner: {
        flex: 3,
        width: '92%',
        justifyContent: 'center',
    },
    meaning: {
        textAlign: 'right',
    },
});

export default WordStyle;