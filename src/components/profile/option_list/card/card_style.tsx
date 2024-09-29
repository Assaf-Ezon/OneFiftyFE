import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const cardStyle = StyleSheet.create({
    container: {
        height: height * 0.07,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'blue'
    },
    text: {
        marginRight: 10,
        fontSize: 18,
        color: '#656565',
    },
});

export default cardStyle;