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
});

export default PlansContainerStyle;