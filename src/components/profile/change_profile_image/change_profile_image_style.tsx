import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const ChangeProfileImageStyle = StyleSheet.create({
    container: {
        width: width * 0.95,
        height: height * 0.5,
        position: 'absolute',
        left: width * 0.025,
        top: height * 0.25,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: '#FAF0E6',
        borderRadius: 30,
        shadowOpacity: 0.15,
        shadowRadius: 5,
    },
    titleContainer: {
        width: '90%',
        height: '10%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'red',
    },
    title: {
        fontSize: 25,
        fontWeight: '600',
    },
    imagesContainer: {
        width: '90%',
        height: '55%',
        backgroundColor: 'blue',
    },
    submitContainer: {
        width: '90%',
        height: '25%',
        backgroundColor: 'green',
    },
});

export default ChangeProfileImageStyle;