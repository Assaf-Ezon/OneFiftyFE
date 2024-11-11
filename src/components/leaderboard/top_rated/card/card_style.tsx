import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const LeaderboardCardStyle = StyleSheet.create({
    profileScore: {
        width: '100%',
        height: height * 0.1,
        backgroundColor: 'white',
        borderWidth: 0.2,
        borderColor: 'black',
        borderRadius: 30,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 5,
    },
    profileContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: '100%',
        marginRight: 8,
    },
    profileDetailsContainer: {
        marginRight: 8,
    },
    profileNameText: {
        textAlign: 'right',
        fontSize: 18,
        fontWeight: '700',
    },
    profileScoreText: {
        textAlign: 'right',
        color: '#656565',
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        overflow: "hidden",
    },
    rankContainer: {
        flexDirection: 'row',
        marginLeft: 25,
    },
    rankText: {
        fontWeight: '900',
        fontSize: 20,
    },
});

export default LeaderboardCardStyle;