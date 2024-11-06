import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { useState } from 'react';

import SplashScreen from './src/screens/splash/splash'
import StartScreen from './src/screens/start/start';

import SignupScreen from './src/screens/signup/signup';
import LoginScreen from './src/screens/login/login';
import ForgotPasswordScreen from './src/screens/forgot_password/forgot_password';

import HomePage from './src/screens/home/home';
import DictionaryPage from './src/screens/dictionary/dictionary';
import LearningPage from './src/screens/learning/learning';
import LeaderboardPage from './src/screens/leaderboard/leaderboard';
import ProfilePage from './src/screens/profile/profile';

import TermsOfServicePage from './src/screens/terms_of_service/terms_of_service';
import PaymentPage from './src/screens/payment/payment';

import KdkPage from './src/screens/kdk/kdk';
import McPage from './src/screens/mc/mc';

import { ProfileProvider } from './src/context/general_context/profile_context';
import { LearningSettingsProvider } from './src/context/settings_context/learning_context';

const Stack = createNativeStackNavigator();

const AuthStack = ({ setStackIndex }: {setStackIndex: React.Dispatch<React.SetStateAction<number>>}) => {
  return (
    <Stack.Navigator initialRouteName="splash">
      <Stack.Screen name='splash' component={SplashScreen} options={{ headerShown: false }} />
      <Stack.Screen name="start" children={(props) => <StartScreen {...props} setStackIndex={setStackIndex} />} options={{ headerShown: false }} />

        <Stack.Screen name='signup' component={SignupScreen} options={{ headerShown: false }} />
        <Stack.Screen name='login' component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name='forgot_password' component={ForgotPasswordScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

const MainAppStack = ({ stackIndex, setStackIndex }: {stackIndex: number, setStackIndex: React.Dispatch<React.SetStateAction<number>>}) => {
  return (
    <LearningSettingsProvider>
      <Stack.Navigator initialRouteName="home">
          <Stack.Screen name='home' component={HomePage} options={{ headerShown: false }} />
          <Stack.Screen name='dictionary' component={DictionaryPage} options={{ headerShown: false }} />
          <Stack.Screen name='learning' component={LearningPage} options={{ headerShown: false }} />
          <Stack.Screen name='leaderboard' component={LeaderboardPage} options={{ headerShown: false }} />
          <Stack.Screen name='profile' component={ProfilePage} options={{ headerShown: false }} />

          <Stack.Screen name='terms' component={TermsOfServicePage} options={{ headerShown: false }} />
          <Stack.Screen name='payment' children={(props) => <PaymentPage {...props} stackIndex={stackIndex} setStackIndex={setStackIndex} />} options={{ headerShown: false }} />

          <Stack.Screen name='kdk' component={KdkPage} options={{ headerShown: false }} />
          <Stack.Screen name='mc' component={McPage} options={{ headerShown: false }} />
      </Stack.Navigator>
    </LearningSettingsProvider>
  );
};

const InactiveStack = ({ stackIndex, setStackIndex }: {stackIndex: number, setStackIndex: React.Dispatch<React.SetStateAction<number>>}) => {
  return (
    <LearningSettingsProvider>
      <Stack.Navigator initialRouteName="payment">
          <Stack.Screen name='payment' children={(props) => <PaymentPage {...props} stackIndex={stackIndex} setStackIndex={setStackIndex} />} options={{ headerShown: false }} />
      </Stack.Navigator>
    </LearningSettingsProvider>
  );
};

export default function App() {
  const [stackIndex, setStackIndex] = useState<number>(1);
  
  const stackHandler: { [key: number]: JSX.Element } = {
    1: <AuthStack setStackIndex={setStackIndex} />,
    2: <MainAppStack stackIndex={stackIndex} setStackIndex={setStackIndex} />,
    3: <InactiveStack stackIndex={stackIndex} setStackIndex={setStackIndex} />
  }

  return (
    <ProfileProvider>
      <NavigationContainer>
        {stackHandler[stackIndex]}
      </NavigationContainer>
    </ProfileProvider>
  );
};