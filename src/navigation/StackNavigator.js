import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import OnboardingScreen from '../screens/Splash/OnboardingScreen';
import HomeScreen from '../screens/HomeScreen';
import SetProfileScreen from '../screens/Splash/SetProfileScreen';
import SplashScreen from '../screens/Splash/SplashScreen';
import ChatScreen from '../screens/Chat/ChatScreen';
import ChatListScreen from '../screens/Chat/ChatListScreen';

const Stack = createStackNavigator();

function StackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        {/* <Stack.Navigator initialRouteName="ChatListScreen"> */}
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="OnboardingScreen"
          component={OnboardingScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SetProfileScreen"
          component={SetProfileScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen
          name="ChatListScreen"
          component={ChatListScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ChatScreen"
          component={ChatScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default StackNavigator;
