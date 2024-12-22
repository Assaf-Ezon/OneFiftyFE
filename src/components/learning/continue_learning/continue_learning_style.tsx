import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const learningPartStyle = StyleSheet.create({
    container: {
        marginTop: 20,
        width: '100%',
        height: height * 0.35,
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
        fontSize: 22, 
        fontWeight: 'bold',
    },
    cardsContainerContainer: {
        width: '100%',
        height: '85%',
    },
    cardsContainer: {
        flexDirection: 'row',
        width: '100%',
        height: '100%',
        transform: [{ scaleX: -1 }],
    },
    playSomethingContainer: {
        transform: [{ scaleX: -1 }],
        width: width * 0.6,
        borderWidth: 0.2,
        borderRadius: 20,
    },
    cardImage: {
        width: '100%',
        flex: 1,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        overflow: 'hidden',
    },
    textContainer: {
        width: '100%',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    titleText: {
        width: '90%',
        textAlign: 'center',
        margin: 5,
        fontSize: 20,
        fontWeight: '600',
    },
    blank: {
        width: width * 0.04,
    },
});

export default learningPartStyle;