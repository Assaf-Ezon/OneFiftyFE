import { StyleSheet } from 'react-native';

const SettingsStyle = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '90%',
        height: '100%',
        marginTop: 15,
    },
    dropDownContainer: {
        width: '45%',
    },
    Dropdown: {
        borderWidth: 1,
        borderRadius: 10,
        width: '100%',
        height: '60%',
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
});

export default SettingsStyle;