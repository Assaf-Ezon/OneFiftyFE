import { StyleSheet, Dimensions } from 'react-native';
import calculateFontSize from '../../calculated_font_size';

const { width, height } = Dimensions.get('window');

const GameCardStyle = StyleSheet.create({
    container: {
        transform: [{ scaleX: -1 }],
        flexDirection: 'column',
        borderColor: 'black',
        borderWidth: 0.2,
        borderRadius: 20,
        width: width * 0.7,
        height: height * 0.33,
        marginRight: 15,
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
        textAlign: 'right',
        margin: 5,
        fontSize: calculateFontSize(20),
        fontWeight: '600',
    },
    descriptionText: {
        width: '90%',
        textAlign: 'right',
        margin: 5,
        color: '#656565',
    },
    btn: {
        width: '80%',
        height: '35%',
        backgroundColor: '#7F5CA6',
        borderRadius: 60,
        alignItems: 'center',
        justifyContent: 'center',
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    btnText: {
        color: 'white',
        fontSize: calculateFontSize(18),
        fontWeight: '500',
    },
});

export default GameCardStyle;