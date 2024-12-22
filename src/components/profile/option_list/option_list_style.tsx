import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const OptionListStyle = StyleSheet.create({
    container: {
        marginTop: 15,
        width: width,
        height: height * 0.5,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        //backgroundColor: 'red',
    },
    line: {
        height: 1,
        backgroundColor: '#C0C0C0',
        width: width * 0.9,
    },
});

export default OptionListStyle;