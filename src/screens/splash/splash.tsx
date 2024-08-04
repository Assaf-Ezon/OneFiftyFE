import { View, Image } from 'react-native';
import { useEffect } from 'react';

const SplashScreen = ({ navigation }: {navigation: any}) => {
    useEffect(() => {
      const timer = setTimeout(() => {
        navigation.replace('start');
      }, 2000);
  
  
      return () => clearTimeout(timer);
    }, [navigation]);
   
    return(
      <View style={{backgroundColor: "#FAF0E6", flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Image source={require('../../../assets/login icons/logo.png')} />
      </View>
    );
};

export default SplashScreen;
