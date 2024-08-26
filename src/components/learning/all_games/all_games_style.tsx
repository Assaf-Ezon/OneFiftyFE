import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const allGamesStyle = StyleSheet.create({
    container: {
        marginTop: 30,
        width: '90%',
        height: height * 0.4,
    },
    title: {
        fontSize: 22, 
        fontWeight: 'bold',
        textAlign: 'right',
    },
    cards: {
        marginTop: 10,
        width: '100%',
        height: '100%',
    },
});

export default allGamesStyle;