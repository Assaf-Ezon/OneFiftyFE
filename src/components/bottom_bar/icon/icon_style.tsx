import { StyleSheet } from 'react-native';

const iconStyle = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    inactiveText: {
        marginTop: 5,
        color: '#656565',
    },
    activeText: {
        marginTop: 5,
        color: '#FF7518',
    },
});

export default iconStyle;