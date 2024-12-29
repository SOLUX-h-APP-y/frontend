import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import OnboardingScreen from '../screens/#1_Login/OnboardingScreen';
import PostListScreen from '../screens/#2_Post/PostListScreen';
import SetProfileScreen from '../screens/#1_Login/SetProfileScreen';
import SplashScreen from '../screens/#1_Login/SplashScreen';
import ChatListScreen from '../screens/Chat/ChatListScreen';
import ChatScreen from '../screens/Chat/ChatScreen';

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
        <Stack.Screen
          name="SharerPostListScreen"
          component={PostListScreen}
          initialParams={{ actionType: 'sharer' }}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="BorrowerPostListScreen"
          component={PostListScreen}
          initialParams={{ actionType: 'borrower' }}
          options={{
            headerShown: false,
          }}
        />

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
