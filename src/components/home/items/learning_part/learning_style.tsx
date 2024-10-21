import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const learningPartStyle = StyleSheet.create({
    container: {
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
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    seeEverything: {
        color: '#656565',
    },
    title: {
        fontSize: 22, 
        fontWeight: 'bold',
    },
    cardsContainerContainer: {
        width: '100%',
    },
    cardsContainer: {
        flexDirection: 'row',
        width: '95%',
        height: '85%',
        transform: [{ scaleX: -1 }],
    },
});

export default learningPartStyle;