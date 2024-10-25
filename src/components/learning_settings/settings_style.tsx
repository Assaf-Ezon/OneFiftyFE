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
        width: '90%',
        height: '55%',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'flex-end',
    },
    SmartStudyDescription: {
        textAlign: 'right',
        marginBottom: 10,
    },
    SmartStudy: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    SmartStudyText: {
        marginRight: 8,
        fontSize: 18,
        fontWeight: '500',
    },
    PickLevel: {
        width: '100%',
        height: '25%',
        flexDirection: 'column',
        justifyContent: 'space-between',

    },
    ChooseLevelText: {
        textAlign: 'right',
        fontSize: 18,
    },
    selectLevels: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    checkboxContainer: {
        alignItems: 'center',
    },
    popupMsg: {
        color: 'red',
        fontWeight: '600',
    },
    LowerPart: {
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