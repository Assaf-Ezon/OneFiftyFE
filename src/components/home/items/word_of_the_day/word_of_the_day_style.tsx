import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const wordOfTheDayStyle = StyleSheet.create({
    container: {
        width: '90%',
        height: height * 0.3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    wordOfTheDaySection: {
        width: '100%',
        height: '70%',
        borderRadius: 20,
        shadowOpacity: 0.02,
        shadowRadius: 1,
        backgroundColor: '#F27155',
        flexDirection: 'column',
        alignItems: 'center',
    },
    title: {
        flex: 2,
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    subTitle: {
        color: 'white',
    },
    word: {
        color: 'white',
        fontSize: 22,
        fontWeight: '600',
        textAlign: 'right',
    },
    meaningContainer: {
        flex: 3,
        width: '90%',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF30',
        shadowOpacity: 0.02,
        shadowRadius: 1,
        borderColor: 'white',
        borderWidth: 0.2,
    },
    meaning: {
        margin: 10,
        color: 'white',
        textAlign: 'right',
    },
    blankSpace: {
        flex: 1,
    }
});

export default wordOfTheDayStyle;