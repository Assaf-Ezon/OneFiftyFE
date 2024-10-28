import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const PagePartStyle = StyleSheet.create({
    container: {
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
    SwitchContainer: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '90%',
        height: height * 0.04,
        borderRadius: 20,
        borderWidth: 1,
    },
    RightSwitchBtn: {
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        borderWidth: 1,
    },
    LeftSwitchBtn: {
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        borderWidth: 1,
    },
    SwitchText: {
        textAlign: 'center',
    },
    ScrollviewContainer: {
        marginTop: 20,
        width: '100%',
        height: height * 0.73,
    },
    documents: {
        width: '100%',
        alignItems: 'center',
    },
    DocumentTitle: {
        fontSize: 22,
        width: '95%',
        fontWeight: '600',
        textAlign: 'right',
    },
    content: {
        width: '95%',
        fontSize: 15,
        textAlign: 'right',
    },
    blank: {
        height: height * 0.15,
    }
});

export default PagePartStyle;