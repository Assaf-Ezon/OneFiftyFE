import { StyleSheet, Dimensions } from 'react-native';
import calculateFontSize from '../../../calculated_font_size';

const { width, height } = Dimensions.get('window');

const allGamesStyle = StyleSheet.create({
    container: {
        marginTop: 20,
        width: '100%',
        height: height * 0.4,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    titleContainer: {
        width: '90%',
        height: '15%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    title: {
        fontSize: calculateFontSize(22), 
        fontWeight: 'bold',
    },
    cardsContainerConatiner: {
        width: '100%',
        height: '85%',
    },
    cardsContainer: {
        flexDirection: 'row',
        width: '100%',
        height: '100%',
        transform: [{ scaleX: -1 }],
    },
    blank: {
        width: width * 0.045,
    },
});

export default allGamesStyle;