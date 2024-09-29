import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const PagePartStyle = StyleSheet.create({
    container: {
        backgroundColor: 'blue',
    },
    title: {
        height: height * 0.34,
        backgroundColor: 'red',
    },
    option_list: {
        flex: 6,
        backgroundColor: 'yellow',
    },
});

export default PagePartStyle;