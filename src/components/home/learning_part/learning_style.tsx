import { StyleSheet } from 'react-native';

const learningPartStyle = StyleSheet.create({
    container: {
        width: '90%',
        height: '40%',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    titleContainer: {
        width: '100%',
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
    cardsContainer: {
        flexDirection: 'row',
        width: '100%',
        height: '100%',
    },
});

export default learningPartStyle;