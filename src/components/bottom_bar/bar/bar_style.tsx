import { StyleSheet } from 'react-native';

const barStyle = StyleSheet.create({
    container: {
        position: 'absolute',
        top: '86%',
        left: '5%',
        width: '90%',
        height: '9%',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        borderRadius: 80,
        shadowOpacity: 0.02,
        shadowRadius: 1,
        backgroundColor: 'white',
    },
});

export default barStyle;