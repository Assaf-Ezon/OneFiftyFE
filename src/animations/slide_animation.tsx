import { Animated } from 'react-native';

export const SlideIn = (slideAnim: Animated.Value, toValue: number = 0, duration: number = 200) => {
    Animated.timing(slideAnim, {
        toValue: toValue,
        duration: duration,
        useNativeDriver: true,
    }).start();
};  