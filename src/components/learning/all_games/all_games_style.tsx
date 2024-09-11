import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const allGamesStyle = StyleSheet.create({
    container: {
        marginTop: 20,
        width: '90%',
        height: height * 0.35,
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

export default allGamesStyle;