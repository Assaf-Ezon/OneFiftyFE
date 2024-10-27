import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

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
        width: 40,
        height: 40,
        borderRadius: 25,
        overflow: "hidden",
    },
});

export default profilePartStyle;