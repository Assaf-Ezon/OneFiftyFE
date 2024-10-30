import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const ContactFormStyle = StyleSheet.create({
    container: {
        position: 'absolute',
        top: height * 0.4,
        width: width,
        height: height * 0.6,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        backgroundColor: '#FAF0E6',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        borderRadius: 30,
        shadowOpacity: 0.15,
        shadowRadius: 5,
    },
    titleContainer: {
        marginTop: 10,
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: 22,
        fontWeight: '600',
    },
    inputFieldsContainer: {
        width: '90%',
        height: '60%',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    titleInputField: {
        width: '100%',
        height: '20%',
        textAlign: 'right',
        fontSize: 15,
        paddingRight: 10,
        borderWidth: 0.2,
        borderColor: '#5F5F5F',
        borderRadius: 10,
    },
    bodyInputField: {
        width: '100%',
        height: '70%',
        textAlign: 'right',
        fontSize: 15,
        padding: 10,
        borderWidth: 0.2,
        borderColor: '#5F5F5F',
        borderRadius: 10,
    },
    submitBtnContainer: {
        width: '90%',
        height: '20%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    submitBtn: {
        backgroundColor: '#7F5CA6',
        width: '60%',
        height: '50%',
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    submitBtnText: {
        color: 'white',
    },
});

export default ContactFormStyle;