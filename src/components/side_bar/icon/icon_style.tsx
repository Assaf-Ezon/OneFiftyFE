import { StyleSheet, Dimensions } from 'react-native';

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
        fontSize: 20,
        fontWeight: '500',
    },
    line: {
        height: 1,
        backgroundColor: '#C0C0C0',
        width: width * 0.9,
    },
});

export default iconStyle;