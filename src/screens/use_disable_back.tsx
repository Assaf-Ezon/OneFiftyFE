import { useEffect } from 'react';
import { BackHandler } from 'react-native';

const useDisableBack = (navigation: any) => {
  useEffect(() => {
    // Disable swipe gestures for the current screen
    navigation.setOptions({ gestureEnabled: false });

    const backAction = () => {
      // Prevent the back action
      return true;
    };

    const subscription = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => {
        subscription.remove();
      };
  }, [navigation]);
};

export default useDisableBack;