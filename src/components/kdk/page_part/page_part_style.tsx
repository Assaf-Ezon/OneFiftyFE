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
        shadowOpacity: 0.05,
        shadowRadius: 1,
    },
    interpretation: {
        width: width * 0.9,
        height: height * 0.2,
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    color: {
        width: '100%',
        height: '100%',
        borderRadius: 20,
        shadowOpacity: 0.02,
        shadowRadius: 1,
        backgroundColor: '#F27155',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    meaningContainer: {
        width: '90%',
        height: '90%',
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
    btns: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    btn: {
        width: width * 0.42,
        height: height * 0.05,
        borderRadius: 60,
        backgroundColor: '#7F5CA6',
        justifyContent: 'center',
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    btnText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 16,
        fontWeight: '500',
    },
    nextBtn: {
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