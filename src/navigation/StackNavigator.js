import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import OnboardingScreen from '../screens/#1_Login/OnboardingScreen';
import PostListScreen from '../screens/#2_Post/PostListScreen';
import SetProfileScreen from '../screens/#1_Login/SetProfileScreen';
import SplashScreen from '../screens/#1_Login/SplashScreen';
import ChatListScreen from '../screens/#3_Chat/ChatListScreen';
import ChatScreen from '../screens/#3_Chat/ChatScreen';
import CreatePostScreen from '../screens/#2_Post/CreatePostScreen';
import PostDetailScreen from '../screens/#2_Post/PostDetailScreen';
import MyPostList from '../screens/#2_Post/MyPostList';
import ToastMessage from '../components/ToastMessage';
import ReviewScreen from '../screens/#3_Chat/ReviewScreen';
import MypageScreen from '../screens/#4_Mypage/MypageScreen';
import EditMypageScreen from '../screens/#4_Mypage/EditMypageScreen';

const Stack = createStackNavigator();

function StackNavigator() {
  return (
    <NavigationContainer>
      {/* <Stack.Navigator initialRouteName="SplashScreen"> */}
      {/* <Stack.Navigator initialRouteName="ChatListScreen"> */}
      {/* <Stack.Navigator initialRouteName="MypageScreen"> */}
      <Stack.Navigator initialRouteName="EditMypageScreen">
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
          name="CreatePostScreen"
          component={CreatePostScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="PostDetailScreen"
          component={PostDetailScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="MyPostList"
          component={MyPostList}
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
        <Stack.Screen
          name="ReviewScreen"
          component={ReviewScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="MypageScreen"
          component={MypageScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="EditMypageScreen"
          component={EditMypageScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
      <ToastMessage />
    </NavigationContainer>
  );
}

export default StackNavigator;
