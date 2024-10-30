import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const ContactFormStyle = StyleSheet.create({
    container: {
        position: 'absolute',
        top: height * 0.55,
        width: width,
        height: height * 0.45,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        backgroundColor: '#FAF0E6',
        borderRadius: 30,
        shadowOpacity: 0.15,
        shadowRadius: 5,
    },
});

export default ContactFormStyle;