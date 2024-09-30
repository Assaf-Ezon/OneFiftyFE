import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import SplashScreen from './src/screens/splash/splash'
import StartScreen from './src/screens/start/start';

import SignupScreen from './src/screens/signup/signup';
import LoginScreen from './src/screens/login/login';
import ForgotPasswordScreen from './src/screens/forgot_password/forgot_password';

import HomePage from './src/screens/home/home';
import LearningPage from './src/screens/learning/learning';
import LeaderboardPage from './src/screens/leaderboard/leaderboard';
import ProfilePage from './src/screens/profile/profile';

import KdkPage from './src/screens/kdk/kdk';
import McPage from './src/screens/mc/mc';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='splash'>
        <Stack.Screen name='splash' component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name='start' component={StartScreen} options={{ headerShown: false }} />

        <Stack.Screen name='signup' component={SignupScreen} options={{ headerShown: false }} />
        <Stack.Screen name='login' component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name='forgot_password' component={ForgotPasswordScreen} options={{ headerShown: false }} />

        <Stack.Screen name='home' component={HomePage} options={{ headerShown: false }} />
        <Stack.Screen name='learning' component={LearningPage} options={{ headerShown: false }} />
        <Stack.Screen name='leaderboard' component={LeaderboardPage} options={{ headerShown: false }} />
        <Stack.Screen name='profile' component={ProfilePage} options={{ headerShown: false }} />

        <Stack.Screen name='kdk' component={KdkPage} options={{ headerShown: false }} />
        <Stack.Screen name='mc' component={McPage} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
