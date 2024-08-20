import { StyleSheet } from 'react-native';

const barStyle = StyleSheet.create({
    container: {
        flex: 1,
        position: 'absolute',
        right: '0%',
        flexDirection: 'column',
        width: '75%',
        height: '100%',
        backgroundColor: 'white',
        borderRadius: 40,
        shadowOpacity: 0.02,
        shadowRadius: 1,
        borderWidth: 1,
    },
    upperPart: {
        flex: 1,
        backgroundColor: '#FAF0E6',
        borderRadius: 40,
    },
    upperPartContent: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    exitBtn: {
        justifyContent: 'center',
    },
    userBlank: {
        flex: 1,
    },
    userContent: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: '80%',
        paddingRight: 15,
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
    middlePart: {
        flex: 4,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'flex-end',
        borderWidth: 1,
    },
    lowerPart: {
        flex: 1,
    },
});

export default barStyle;