import { StyleSheet, Dimensions } from 'react-native';
import calculateFontSize from '../../../calculated_font_size';

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
        fontSize: calculateFontSize(22),
        fontWeight: 'bold',
    },
    selfStatsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '35%',
        marginTop: 10,
    },
    scoreText: {
        fontSize: calculateFontSize(18),
        fontWeight: '400',
        textAlign: 'center',
    },
    loadingContainer: {
        position: 'absolute',
        top: '50%', 
        left: '50%', 
        width: 50,
        height: 50,
        transform: [{ translateX: -20 }, { translateY: -20 }],
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default TopRatedStyle;