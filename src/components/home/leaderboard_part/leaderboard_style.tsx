import { StyleSheet } from 'react-native';

const leaderboardPartStyle = StyleSheet.create({
    container: {
        width: '90%',
        height: '20%',    
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center', 
    },
    titleContainer: {
        width: '100%',
        height: '15%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    seeEverything: {
        color: '#656565',
    },
    title: {
        fontSize: 22, 
        fontWeight: 'bold',
    },
    selfScore: {
        width: '100%',
        height: '50%',
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

export default leaderboardPartStyle;