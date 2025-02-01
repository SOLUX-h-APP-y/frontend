import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PostListScreen from '../screens/#2_Post/PostListScreen';
import ChatListScreen from '../screens/#3_Chat/ChatListScreen';
import MypageScreen from '../screens/#4_Mypage/MypageScreen';
import colors from '../styles/Colors';
import fontStyles from '../styles/FontStyles';
import BottomTabIcons from '../components/BottomTabIcons';
import { View, Alert } from 'react-native';
import api, { setAuthToken } from '../services/api';
import { getTokens } from '../services/TokenManager';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => (
            <BottomTabIcons
              routeName={route.name}
              focused={focused}
            />
          ),
          tabBarActiveTintColor: colors.lightBlack,
          tabBarInactiveTintColor: colors.gray2,
          tabBarStyle: {
            backgroundColor: 'white',
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
            height: 85,
            shadowColor: 'black',
            shadowOffset: { width: 5, height: -5 },
            shadowOpacity: 0.1,
            shadowRadius: 5,
            borderTopWidth: 0,
          },
          tabBarItemStyle: {
            paddingTop: 8,
          },
          tabBarLabelStyle: {
            ...fontStyles.Medium14,
            marginBottom: 5,
          },
        })}>
        <Tab.Screen
          name="홈"
          component={PostListScreen}
          initialParams={{ actionType: 'share' }}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="요청"
          component={PostListScreen}
          initialParams={{ actionType: 'borrow' }}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="채팅"
          component={ChatListScreen}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="마이"
          component={MypageScreen}
          options={{ headerShown: false }}
        />
      </Tab.Navigator>
    </View>
  );
};

export default BottomTabNavigator;
