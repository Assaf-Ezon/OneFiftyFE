import { StyleSheet, Dimensions } from 'react-native';

const SignupScreenStyle = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
    },
    blank: {
        flex: 1,
        width: '100%',
        backgroundColor: '#FAF0E6',
    },
    signupContainer: {
        flex: 8,
        width: '100%',
        flexDirection: 'column',
        backgroundColor: '#FAF0E6',
        borderRadius: 30,
        shadowOffset: { width: 0, height: 20 },
        shadowOpacity: 0.03,
        shadowRadius: 10,
    },
    title: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',  
    },
    logoImage: {

    },
    mainTitle: {
        fontSize: 35,
        fontWeight: 'bold',
        textAlign: 'right',
        marginBottom: 5,
    },
    secondTitle: {
        fontSize: 14,
        textAlign: 'right',
        color: '#656565',
    },
    fields: {
        flex: 6,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    inputField: {
        textAlign: 'right',
        paddingRight: 12,
        backgroundColor: 'white',
        width: '93%',
        height: '10%',
        borderRadius: 20,
        shadowOpacity: 0.05,
        shadowRadius: 5,
    },
    dateInputContainer: {
        flexDirection: 'row',
        width: '90%',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    dateInputText: {
        fontSize: 18,
        fontWeight: '500',
    },
    checkboxContainer: {
        flexDirection: 'row',
        width: '90%',
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
    },
    checkbox: {
        marginLeft: 10,
        backgroundColor: 'white',
        borderWidth: 1,
    },
    checkboxText: {
        fontSize: 18,
        fontWeight: '500',
    },
    submitBtnContainer: {
        flex: 1,
        alignItems: 'center',
    },
    submitBtn: {
        width: '80%',
        height: '60%',
        backgroundColor: '#7F5CA6',
        borderRadius: 60,
        alignItems: 'center',
        justifyContent: 'center',
        shadowOpacity: 0.2,
        shadowRadius: 5,
    },
    submitText: {
        color: 'white',
        fontSize: 25,
        fontWeight: '500',
    },
    faliedText : {
        color: 'red',
        marginTop: 5,
    },
    alreadySignedContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    alreadySignedText: {
        fontWeight: '500',
    },
    goToSignInText: {
        color: '#FF7518',
        fontWeight: '500',
    },
});

export default SignupScreenStyle;