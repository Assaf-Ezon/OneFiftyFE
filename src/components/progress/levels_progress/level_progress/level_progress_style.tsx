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
});

export default LevelProgressStyle;