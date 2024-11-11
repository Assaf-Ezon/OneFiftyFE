import { AutoScaling } from 'aws-sdk';
import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const TopRatedStyle = StyleSheet.create({
    container: {
        width: '90%',
        height: height * 0.9,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    self: {
        width: '100%',
        height: height * 0.28,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    profileImage: {
        width: width * 0.35,
        height: width * 0.35,
        borderRadius: 100,
        marginBottom: 10,
    },
    textName: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    selfStatsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '35%',
        marginTop: 10,
    },
    rankText: {
        fontSize: 18,
        fontWeight: '400',
    },
    line: {
        backgroundColor: 'black',
        width: 1,
        height: '90%',
    },
    scoreText: {
        fontSize: 18,
        fontWeight: '400',
    },
});

export default TopRatedStyle;