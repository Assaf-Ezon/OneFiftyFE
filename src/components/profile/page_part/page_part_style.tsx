import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const PagePartStyle = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    title: {
        height: height * 0.34,
    },
    option_list: {
        height: height * 0.66,
    },
});

export default PagePartStyle;