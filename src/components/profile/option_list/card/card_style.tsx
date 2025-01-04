import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const cardStyle = StyleSheet.create({
    container: {
        width: width * 0.9,
        height: height * 0.07,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    text: {
        marginRight: 10,
        fontSize: 18,
        color: '#656565',
    },
});

export default cardStyle;