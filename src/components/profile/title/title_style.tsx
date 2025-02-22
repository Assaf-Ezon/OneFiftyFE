import { StyleSheet, Dimensions } from 'react-native';
import calculateFontSize from '../../../calculated_font_size';

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
        fontSize: calculateFontSize(30),
        fontWeight: 'bold',
    },
    profileContainer: {
        position: 'absolute',
        top: height * 0.1,
    },
    profileImageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileImage: {
        width: width * 0.3,
        height: width * 0.3,
        borderRadius: 100,
    },
    changeImageIconContainer: {
        position: 'absolute',
        width: width * 0.08,
        height: width * 0.08,
        top: width * 0.2,
        right: width * 0.27,
    },
    changeImageIcon: {
        width: '100%',
        height: '100%',
    },
    profileTitle: {
        width: width * 0.8,
    },
    name: {
        textAlign: 'center',
        fontSize: calculateFontSize(20),
        fontWeight: 'bold',
    },
    email: {
        textAlign: 'center',
        fontSize: calculateFontSize(12),
        color: '#656565',
    },
    expiration: {
        textAlign: 'center',
        color: '#656565',
        fontSize: calculateFontSize(12),
        marginTop: 3,
    },
});

export default TitleStyle;