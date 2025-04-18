import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Screens } from './src/data_objects/enums/screens';

import SplashScreen from './src/screens/splash/splash'
import StartScreen from './src/screens/start/start';

import HomePage from './src/screens/home/home';
import DictionaryPage from './src/screens/dictionary/dictionary';
import LearningPage from './src/screens/learning/learning';
import LeaderboardPage from './src/screens/leaderboard/leaderboard';
import ProfilePage from './src/screens/profile/profile';

import ProgressPage from './src/screens/progress/progress';

import PaymentPage from './src/screens/payment/payment';

import KdkPage from './src/screens/kdk/kdk';
import McPage from './src/screens/mc/mc';

import { ProfileProvider } from './src/context/general_context/profile_context';
import { LearningSettingsProvider } from './src/context/settings_context/learning_context';
import { useStackManagerContext, StackManagerProvider } from './src/context/general_context/stack_manager_context';
import { WordsProvider } from './src/context/general_context/words_context';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  const { authStackInitialRouteName } = useStackManagerContext();

  return (
    <Stack.Navigator initialRouteName={authStackInitialRouteName}>
      <Stack.Screen name={Screens.SPLASH} component={SplashScreen} options={{ headerShown: false }} />
      <Stack.Screen name={Screens.START} component={StartScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

const MainAppStack = () => {
  const bottomBarScreenOrder: string[] = [Screens.HOME, Screens.DICTIONARY, Screens.LEARNING, Screens.LEADERBOARD, Screens.PROFILE, Screens.PAYMENT, Screens.PROGRESS, Screens.KDK, Screens.MC];
  var prevScreen: string = Screens.HOME;


  return (
    <LearningSettingsProvider>
      <Stack.Navigator initialRouteName={Screens.HOME} screenOptions={({ route }) => {
        
          const prevIndex = bottomBarScreenOrder.indexOf(prevScreen);
          const currIndex = bottomBarScreenOrder.indexOf(route.name);

          const direction = currIndex > prevIndex ? 'slide_from_left' : 'slide_from_right';
          prevScreen = route.name;
          return {
            animation: direction,
        };}}>  
          <Stack.Screen name={Screens.HOME} component={HomePage} options={{ headerShown: false, gestureEnabled: false }} />
          <Stack.Screen name={Screens.DICTIONARY} component={DictionaryPage} options={{ headerShown: false, gestureEnabled: false }} />
          <Stack.Screen name={Screens.LEARNING} component={LearningPage} options={{ headerShown: false, gestureEnabled: false }} />
          <Stack.Screen name={Screens.LEADERBOARD} component={LeaderboardPage} options={{ headerShown: false, gestureEnabled: false }} />
          <Stack.Screen name={Screens.PROFILE} component={ProfilePage} options={{ headerShown: false, gestureEnabled: false }} />

          <Stack.Screen name={Screens.PAYMENT} component={PaymentPage} options={{ headerShown: false, gestureEnabled: false }} />

          <Stack.Screen name={Screens.PROGRESS} component={ProgressPage} options={{ headerShown: false, gestureEnabled: false }} />

          <Stack.Screen name={Screens.KDK} component={KdkPage} options={{ headerShown: false, gestureEnabled: false }} />
          <Stack.Screen name={Screens.MC} component={McPage} options={{ headerShown: false, gestureEnabled: false }} />
      </Stack.Navigator>
    </LearningSettingsProvider>
  ); 
};

const InactiveStack = () => {
  return (
    <LearningSettingsProvider>
      <Stack.Navigator initialRouteName={Screens.PAYMENT}>
          <Stack.Screen name={Screens.PAYMENT} component={PaymentPage} options={{ headerShown: false, gestureEnabled: false }} />
      </Stack.Navigator>
    </LearningSettingsProvider>
  );
};

const StackNavigator = () => {
  const { stackIndex } = useStackManagerContext();

  const stackHandler: { [key: number]: JSX.Element } = {
    1: <AuthStack />,
    2: <MainAppStack />,
    3: <InactiveStack />
  };

  return (
    <NavigationContainer>
      {stackHandler[stackIndex]}
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <ProfileProvider>
      <WordsProvider>
        <StackManagerProvider>
          <StackNavigator />
        </StackManagerProvider>
      </WordsProvider>
    </ProfileProvider>
  );
};