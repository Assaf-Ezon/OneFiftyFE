import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const ProfileImageOptionStyle = StyleSheet.create({
    container: {
        width: height * 0.09,
        height: height * 0.09,
        borderWidth: 1,
        margin: 2,
    },
    imageContainer: {
        width: '100%',
        height: '100%',
    },
    image: {
        width: '100%',
        height: '100%',
    },
});

export default ProfileImageOptionStyle;