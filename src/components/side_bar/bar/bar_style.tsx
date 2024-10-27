import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const barStyle = StyleSheet.create({
    container: {
        flex: 1,
        position: 'absolute',
        left: '0%',
        flexDirection: 'column',
        alignItems: 'center',
        width: '75%',
        height: '100%',
        backgroundColor: 'white',
        borderRadius: 40,
        shadowOpacity: 0.3,
        shadowRadius: 20,
    },
    upperPart: {
        flex: 2,
        width: '100%',
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
        width: 40,
        height: 40,
        borderRadius: 25,
        overflow: "hidden",
    },
    middlePart: {
        flex: 8,
        width: '80%',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    lowerPart: {
        flex: 1.5,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    versionText: {
        paddingBottom: 5,
        color: '#656565',
    },
    line: {
        height: 1,
        backgroundColor: '#C0C0C0',
        width: width * 0.65,
    },
});

export default barStyle;