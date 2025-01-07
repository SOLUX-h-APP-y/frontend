import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PostListScreen from '../screens/#2_Post/PostListScreen';
import ChatListScreen from '../screens/#3_Chat/ChatListScreen';
import MypageScreen from '../screens/#4_Mypage/MypageScreen';
import colors from '../styles/Colors';
import fontStyles from '../styles/FontStyles';
import BottomTabIcons from '../components/BottomTabIcons';
import { View } from 'react-native';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {

    const [unreadMessages, setUnreadMessages] = useState(11); // 테스트용 메시지 수

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused }) => <BottomTabIcons routeName={route.name} focused={focused} unreadCount={route.name == '채팅' ? unreadMessages : 0} />,
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
                    },
                    tabBarItemStyle: {
                        paddingTop: 8,
                    },
                    tabBarLabelStyle: {
                        ...fontStyles.Medium14,
                        marginBottom: 5,
                    },
                })}
            >
                <Tab.Screen name="홈" component={PostListScreen} initialParams={{ actionType: 'sharer' }} options={{ headerShown: false }} />
                <Tab.Screen name="요청" component={PostListScreen} initialParams={{ actionType: 'borrower' }} options={{ headerShown: false }} />
                <Tab.Screen name="채팅" component={ChatListScreen} options={{ headerShown: false }} />
                <Tab.Screen name="마이" component={MypageScreen} options={{ headerShown: false }} />
            </Tab.Navigator>
        </View>
    );
};

export default BottomTabNavigator;
