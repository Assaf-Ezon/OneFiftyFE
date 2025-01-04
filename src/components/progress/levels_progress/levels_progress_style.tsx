import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const LevelsProgressStyle = StyleSheet.create({
    ScrollviewContainer: {
        width: '100%',
        height: height * 0.83,
        flexDirection: 'column',
        alignItems: 'center',
    },
    SwitchContainer: {
        margin: 20,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '90%',
        height: height * 0.04,
        borderRadius: 20,
        borderWidth: 1,
    },
    RightSwitchBtn: {
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        borderWidth: 1,
    },
    LeftSwitchBtn: {
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        borderWidth: 1,
    },
    SwitchText: {
        textAlign: 'center',
    },
    mainPart: {
        flexGrow: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
    },
});

export default LevelsProgressStyle;