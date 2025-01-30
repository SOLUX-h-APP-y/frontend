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
    const [unreadMessages, setUnreadMessages] = useState(0);
    const [loggedInUserId, setLoggedInUserId] = useState(null);

    const fetchLoggedInUserId = async () => {
        try {
            const tokens = await getTokens();
            if (!tokens?.accessToken) return;

            setAuthToken(tokens.accessToken);
            const response = await api.get('/profiles/me');
            setLoggedInUserId(response.data.userId);

            console.log("로그인한 사용자 ID (loggedInUserId):", response.data.userId);
        } catch (error) {
            Alert.alert('오류', '로그인 사용자 정보를 가져오는 데 실패했습니다.');
            console.error('Failed to fetch logged-in user ID:', error);
        }
    };

    const fetchUnreadMessages = async (userId) => {
        if (!userId) return;

        try {
            const tokens = await getTokens();
            if (!tokens?.accessToken) {
                Alert.alert('로그인이 필요합니다', '다시 로그인해주세요.', [
                    { text: '확인', onPress: () => navigation.navigate('LoginScreen') },
                ]);
                return;
            }

            setAuthToken(tokens.accessToken);

            const response = await api.get(`/chat/unread?userId=${userId}`);
            console.log("안 읽은 메시지 개수:", response.data.unreadCount);
            setUnreadMessages(response.data.unreadCount || 0);
        } catch (error) {
            console.error('Failed to fetch unread messages:', error);
        }
    };

    useEffect(() => {
        fetchLoggedInUserId();
    }, []);

    useEffect(() => {
        if (loggedInUserId) {
            fetchUnreadMessages(loggedInUserId);
        }

        const interval = setInterval(() => {
            if (loggedInUserId) fetchUnreadMessages(loggedInUserId);
        }, 60000);

        return () => clearInterval(interval);
    }, [loggedInUserId]);

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
                        borderTopWidth: 0,
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
