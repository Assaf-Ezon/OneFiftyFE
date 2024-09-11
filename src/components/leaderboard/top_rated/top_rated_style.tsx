import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const TopRatedStyle = StyleSheet.create({
    container: {
        width: '90%',
        height: height * 0.7,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
    },
    line: {
        height: 1,
        backgroundColor: 'black',
        width: '100%',
        marginVertical: 10,
    },
});

export default TopRatedStyle;