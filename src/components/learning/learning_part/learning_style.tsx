import { StyleSheet, Dimensions } from 'react-native';

const learningPartStyle = StyleSheet.create({
    container: {
        width: '90%',
        height: '40%',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
    },
    titleContainer: {
        width: '100%',
        height: '15%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    title: {
        fontSize: 22, 
        fontWeight: 'bold',
    },
    cardsContainer: {
        flexDirection: 'row',
        width: '100%',
        height: '100%',
        transform: [{ scaleX: -1 }],
    },
});

export default learningPartStyle;