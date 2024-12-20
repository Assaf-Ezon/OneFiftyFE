import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const PlansContainerStyle = StyleSheet.create({
    mainPage: {
        marginTop: 20,
        width: width * 0.9,
        alignItems: 'center',
        height: height * 0.8,
    },
    blank: {
        height: 80, 
        width: '100%',
    },
    WebviewContainer: {
        width: width,
        height: height * 0.93,
        position: 'absolute',
        top: '-15%',
    },
    loadingContainer: {
        position: 'absolute',
        top: '40%', 
        left: '50%', 
        width: 50,
        height: 50,
        transform: [{ translateX: -20 }, { translateY: -20 }],
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default PlansContainerStyle;