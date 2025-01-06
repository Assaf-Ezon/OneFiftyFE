import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const LevelProgressStyle = StyleSheet.create({
    container: {
        marginBottom: 20,
        width: width * 0.9,
        borderRadius: 20,
        borderWidth: 1,
        alignItems: 'center',
    },
    levelContainer: {
        marginTop: 5,
        width: width * 0.85,
        flexDirection: 'row-reverse',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
    },
    minimizedContainer: {
        height: height * 0.055,
        justifyContent: 'flex-start',
    },
    minimizedLangContainer: {
        width: width * 0.75,
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
    },
    progressBar: {
        marginTop: 10,
        backgroundColor: '#F0E4DA',
        width: width * 0.75,
        height: height * 0.02,
        borderRadius: 20,
        borderWidth: 0.2,
    },
    fullPartProgressBar: {
        // backgroundColor: '#FF7518',
        borderRadius: 20,
        height: '99%',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0.2,
    },
    statisticsContainer: {
        marginTop: 10,
        width: width * 0.75,
        height: '50%',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
});

export default LevelProgressStyle;