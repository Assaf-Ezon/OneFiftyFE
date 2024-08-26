import { StyleSheet } from 'react-native';

const allGamesCardStyle = StyleSheet.create({
    card: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: '100%',
        height: '20%',
    },
    icon: {
        width: 50,
        height: 50,
        borderRadius: 50,
        borderWidth: 0.5,
    },
    cardTitle: {
        marginRight: 10,
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'right',
        width: '53%',
    },
    cardBtn: {
        width: '30%',
        height: '50%',
        backgroundColor: '#7F5CA6',
        borderRadius: 60,
        alignItems: 'center',
        justifyContent: 'center',
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    cardBtnText: {
        color: 'white',
        fontSize: 15,
        fontWeight: '500',
    },
});

export default allGamesCardStyle;