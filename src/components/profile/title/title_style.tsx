import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const TitleStyle = StyleSheet.create({
    container: {
        width: width,
        height: height * 0.2,
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
    profileImage: {
        width: width * 0.3,
        height: width * 0.3,
        position: 'absolute',
        left: width * 0.35,
        top: height * 0.12,
        borderRadius: 100,
    },
    profileTitle: {
        width: width * 0.8,
        position: 'absolute',
        left: width * 0.1,
        top: height * 0.27, 
    },
    name: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
    },
    email: {
        textAlign: 'center',
        color: '#656565',
    },
});

export default TitleStyle;