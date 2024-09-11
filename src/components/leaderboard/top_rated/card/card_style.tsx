import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const LeaderboardCardStyle = StyleSheet.create({
    selfScore: {
        width: '100%',
        height: height * 0.1,
        backgroundColor: 'white',
        borderWidth: 0.2,
        borderColor: 'black',
        borderRadius: 20,
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
    score: {
        flexDirection: 'row',
        marginLeft: 8,
    },
    scoreText: {
        marginRight: 5,
        fontWeight: '500',
    },
});

export default LeaderboardCardStyle;