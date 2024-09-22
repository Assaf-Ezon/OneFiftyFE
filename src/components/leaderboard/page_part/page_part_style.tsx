import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const PagePartStyle = StyleSheet.create({
    container: {
        flexGrow: 1,
        width: '100%',
        height: '125%',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    topPart: {
        width: '100%',
        height: height * 0.18,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: '#FAF0E6',
        borderRadius: 30,
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },
    topPartText: {
        width: '90%',
        height: '50%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    pageTitle: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    mainPart: {
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '100%',
        marginTop: 20,
    },
});

export default PagePartStyle;