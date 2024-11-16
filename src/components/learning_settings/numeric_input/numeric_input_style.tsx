import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const NumbericInputStyle = StyleSheet.create({
    container: {
        borderWidth: 1,
        width: width * 0.15,
        height: height * 0.03,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    inputField: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    btn: {
        backgroundColor: '#c0c0c0',
        height: '100%',
        width: '35%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 12,
    },
});

export default NumbericInputStyle;