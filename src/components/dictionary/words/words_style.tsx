import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const WordsStyle = StyleSheet.create({
    container: {
        marginTop: 15,
        width: width * 0.9,
        height: '55%',
    },

});

export default WordsStyle;