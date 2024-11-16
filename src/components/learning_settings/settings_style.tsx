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
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'red',

    },
    title: {
        fontSize: 25,
        fontWeight: '600',
    },
    exitBtn: {

    },
    SettingsPart: {
        width: '90%',
        height: '70%',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'flex-end',
        backgroundColor: 'yellow',
    },
    TypeOfPractice: {
        width: '100%',
        height: '35%',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        backgroundColor: 'red',
    },
    TypeOfPracticeTitle: {
        fontSize: 15,
        fontWeight: '500',
    },
    OptionsContainer: {
        width: '100%',
        height: '80%',
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
    },
    VerticalLine: {
        width: 1,
        height: '100%',
        backgroundColor: 'black',
        opacity: 0.5,
    },
    RegularStudyText: {
        marginRight: 8,
        fontSize: 14,
        fontWeight: '500',
    },
    PracticeContainer: {
        backgroundColor: 'green',
        justifyContent: 'space-evenly',
        alignItems: 'flex-end',
        width: '45%',
        height: '100%',
    },
    SmartStudyDescription: {
        textAlign: 'center',
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
        fontSize: 15,
        fontWeight: '500',
    },
    selectLevels: {
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    checkboxContainer: {
        alignItems: 'center',
        marginTop: 5,
    },
    levelsText: {
        marginTop: 2,
    },
    popupMsg: {
        color: 'red',
        fontWeight: '600',
    },
    LowerPart: {
        width: '90%',
        height: '15%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'green',
    },
    submitBtn: {
        backgroundColor: '#7F5CA6',
        width: '50%',
        height: '50%',
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    submitBtnText: {
        color: 'white',
    },
});

export default SettingsStyle;