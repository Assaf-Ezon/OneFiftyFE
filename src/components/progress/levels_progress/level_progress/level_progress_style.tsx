import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const LevelProgressStyle = StyleSheet.create({
    container: {
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
        height: '50%',
        justifyContent: 'space-between',
    },
    minimizedLangContainer: {
        width: width * 0.75,
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
    },
    lang: {

    },
    amountOfWords: {

    },
    progressBar: {
        backgroundColor: '#F0E4DA',
        width: width * 0.75,
        height: '50%',
        borderRadius: 20,
        borderWidth: 0.2,
    },
    fullPartProgressBar: {
        backgroundColor: '#FF7518',
        borderRadius: 20,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default LevelProgressStyle;