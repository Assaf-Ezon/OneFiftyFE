import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const PagePartStyle = StyleSheet.create({
    container: {
        flexDirection: 'column',
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
    question: {
        top: width * 0.1,
        width: width * 0.9,
        height: height * 0.5,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    wordSection: {
        marginTop: 10,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    wordCounter: {
        fontSize: 15,
        shadowOpacity: 0.1,
        shadowRadius: 1,
    },
    word: {
        fontSize: 25,
        fontWeight: '600',
        shadowOpacity: 0.1,
        shadowRadius: 1,
    },
    pirushim: {
        height: height * 0.4,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
    },
    option: {
        width: '100%',
        height: height * 0.07,
        borderRadius: 20,
        borderWidth: 0.2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    optionText: {
        textAlign: 'center',
        fontSize: 12,
    },
    btnText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 16,
        fontWeight: '500',
    },
    nextBtn: {
        top: height * 0.1,
        width: width * 0.9,
        height: height * 0.05,
        borderRadius: 60,
        backgroundColor: '#7F5CA6',
        justifyContent: 'center',
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
});

export default PagePartStyle;