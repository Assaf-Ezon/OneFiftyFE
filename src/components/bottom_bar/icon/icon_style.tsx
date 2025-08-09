import { Dimensions, StyleSheet } from 'react-native';
import calculateFontSize from '../../../calculated_font_size';

const { width, height } = Dimensions.get('window');

const iconStyle = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 5,
    },
    inactiveText: {
        marginTop: 5,
        color: '#656565',
        fontSize: calculateFontSize(14),
    },
    activeText: {
        marginTop: 5,
        color: '#FF7518',
        fontSize: calculateFontSize(14),
    },
    iconImage: {
        width: width * 0.05,
        aspectRatio: 1,
    },
});

export default iconStyle;