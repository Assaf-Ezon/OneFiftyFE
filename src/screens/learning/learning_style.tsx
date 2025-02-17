import { Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');

const LearningScreenStyle = StyleSheet.create({
    container: {
        minHeight: Math.round(height)
    }
});

export default LearningScreenStyle;