import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const PagePartStyle = StyleSheet.create({
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
    ScrollviewContainer: {
        width: '100%',
        height: height * 0.82,
    },
    mainPart: {
        flexGrow: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
        marginTop: 20,
    },
    blank: {
        height: height * 0.15,
    },
});

export default PagePartStyle;