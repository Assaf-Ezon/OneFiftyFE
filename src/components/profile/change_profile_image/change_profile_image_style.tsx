import { StyleSheet, Dimensions } from 'react-native';
import calculateFontSize from '../../../calculated_font_size';

const { width, height } = Dimensions.get('window');

const ChangeProfileImageStyle = StyleSheet.create({
    container: {
        width: width * 0.95,
        height: height * 0.5,
        position: 'absolute',
        left: width * 0.025,
        top: height * 0.25,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: '#FAF0E6',
        borderRadius: 30,
        shadowOpacity: 0.15,
        shadowRadius: 5,
    },
    titleContainer: {
        width: '90%',
        height: '20%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: calculateFontSize(25),
        fontWeight: '600',
    },
    imagesContainer: {
        width: '90%',
        height: '58%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    submitContainer: {
        width: '90%',
        height: '25%',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    submitBtn: {
        backgroundColor: '#7F5CA6',
        width: '50%',
        height: '40%',
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    submitBtnText: {
        color: 'white',
    },
    errorText: {
        color: 'red',
        fontWeight: '500',
    },
    loadingContainer: {
        position: 'absolute',
        top: '50%', 
        left: '50%', 
        width: 50,
        height: 50,
        transform: [{ translateX: -20 }, { translateY: -20 }],
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default ChangeProfileImageStyle;