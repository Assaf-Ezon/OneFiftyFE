import { Animated } from 'react-native';

export const fadeIn = (fadeAnim: Animated.Value, toValue: number = 1, duration: number = 200, setToZero: boolean = true) => {
    if (setToZero) {
        fadeAnim.setValue(0);
    };
    return Animated.timing(fadeAnim, {
        toValue: toValue,
        duration: duration,
        useNativeDriver: true,
    });
};  