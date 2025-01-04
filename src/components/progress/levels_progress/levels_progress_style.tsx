import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const LevelsProgressStyle = StyleSheet.create({
    ScrollviewContainer: {
        width: '100%',
        height: height * 0.83,
        flexDirection: 'column',
        backgroundColor: 'red',
    },
    mainPart: {
        flexGrow: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
    },
});

export default LevelsProgressStyle;