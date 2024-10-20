import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const WordsStyle = StyleSheet.create({
    scrollviewContainer: {
        marginTop: 15,
        height: height * 0.55,
    },
    container: {
        marginBottom: 15,
        width: width * 0.9,
    },

});

export default WordsStyle;