import { StyleSheet } from 'react-native';

const PagePartStyle = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    topPart: {
        flex: 1,
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: '#FAF0E6',
        borderRadius: 30,
        borderWidth: 1,
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
        marginTop: 20,
        flex: 5,
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
    },
});

export default PagePartStyle;