import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const allGamesStyle = StyleSheet.create({
    container: {
        marginTop: 30,
        width: '90%',
        height: height * 0.4,
        backgroundColor: 'red',
    },
    title: {
        fontSize: 22, 
        fontWeight: 'bold',
        textAlign: 'right',
        backgroundColor: 'yellow',
    },
});

export default allGamesStyle;