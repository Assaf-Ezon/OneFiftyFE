import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const ProfileImageOptionStyle = StyleSheet.create({
    container: {
        width: width * 0.2,
        height: width * 0.2,
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