import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const SettingsStyle = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '90%',
        marginTop: 15,
    },
    dropDownContainer: {
        width: '45%',
    },
});

export default SettingsStyle;