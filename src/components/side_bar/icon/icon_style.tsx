import { StyleSheet, Dimensions } from 'react-native';
import calculateFontSize from '../../../calculated_font_size';

const { width, height } = Dimensions.get('window');

const iconStyle = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    text: {
        paddingRight: 10,
        fontSize: calculateFontSize(20),
        fontWeight: '500',
    },
    line: {
        height: 1,
        backgroundColor: '#C0C0C0',
        width: width * 0.9,
    },
    iconImage: {
        width: width * 0.05,
        aspectRatio: 1,
    },
});

export default iconStyle;