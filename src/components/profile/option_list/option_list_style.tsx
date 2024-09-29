import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const OptionListStyle = StyleSheet.create({
    container: {
        width: width,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
});

export default OptionListStyle;