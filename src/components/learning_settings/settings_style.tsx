import { StyleSheet, Dimensions } from 'react-native';
import { CONFIG } from '../../config';
import calculateFontSize from '../../calculated_font_size';

const { width, height } = Dimensions.get('window');

const SettingsStyle = StyleSheet.create({
    container: {
        width: '95%',
        height: '75%',
        position: 'absolute',
        top: '14%',
        left: '2.5%',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: '#FAF0E6',
        borderRadius: 30,
        shadowOpacity: 0.15,
        shadowRadius: 5,
        zIndex: CONFIG.zIndexLevels.popups,
        borderWidth: 1,
    },
    upperPart: {
        width: '90%',
        height: '10%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    title: {
        fontSize: calculateFontSize(25),
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
    },
    TypeOfPractice: {
        marginTop: 5,
        width: '100%',
        height: '35%',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    TypeOfPracticeTitle: {
        fontSize: calculateFontSize(18),
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
        fontSize: calculateFontSize(14),
        fontWeight: '500',
    },
    PracticeContainer: {
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
        fontSize: calculateFontSize(18),
        fontWeight: '500',
    },
    PickLevel: {
        width: '100%',
        height: '40%',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    LevelTitle: {
        width: '100%',
        height: '20%',
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    RandomBtn: {
        backgroundColor: 'white',
        width: '35%',
        height: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 20,
    },
    RandomBtnText: {
        fontWeight: '600',
        fontSize: calculateFontSize(15),
    },
    Dropdown: {
        borderWidth: 1,
        borderRadius: 10,
        width: '100%',
        height: '10%',
        backgroundColor: 'white',
        textAlign: 'right',
    },
    text: {
        textAlign: 'right',
        marginRight: 8,
    },
    inputSearch: {
        textAlign: 'right',
    },
    ChooseLevelText: {
        width: '60%',
        textAlign: 'right',
        fontSize: calculateFontSize(18),
        fontWeight: '500',
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectLevels: {
        width: '100%',
        height: '60%',
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
    LowerPart: {
        width: '90%',
        height: '15%',
        justifyContent: 'center',
        alignItems: 'center',
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