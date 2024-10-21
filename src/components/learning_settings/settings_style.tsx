import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const SettingsStyle = StyleSheet.create({
    container: {
        width: '90%',
        height: '60%',
        position: 'absolute',
        top: '20%',
        left: '5%',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: '#FAF0E6',
        borderRadius: 30,
        shadowOpacity: 0.15,
        shadowRadius: 5,
    },
    upperPart: {
        backgroundColor: 'red',
        width: '90%',
        height: '10%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

    },
    title: {
        fontSize: 25,
        fontWeight: '600',
    },
    exitBtn: {

    },
    SettingsPart: {
        backgroundColor: 'blue',
        width: '90%',
        height: '55%',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'flex-end',
    },
    selectLevels: {
        flexDirection: 'row',
    },
    LowerPart: {
        backgroundColor: 'green',
        width: '90%',
        height: '20%',
        justifyContent: 'center',
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
});

export default SettingsStyle;