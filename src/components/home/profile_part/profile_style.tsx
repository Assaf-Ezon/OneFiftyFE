import { StyleSheet } from 'react-native';

const profilePartStyle = StyleSheet.create({
    container: {
        paddingTop: '20%',
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    profileContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: '100%',
    },
    profileDetailsContainer: {
        marginRight: 8,
    },
    profileNameText: {
        textAlign: 'right',
        fontSize: 18,
        fontWeight: '700',
    },
    profileEmailText: {
        textAlign: 'right',
        color: '#656565',
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        overflow: "hidden",
    },
});

export default profilePartStyle;