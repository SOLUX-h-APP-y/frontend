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

    // 로그인 사용자 ID 가져오기
    const fetchLoggedInUserId = async () => {
        try {
            const tokens = await getTokens();
            if (!tokens || !tokens.accessToken) {
                Alert.alert('로그인이 필요합니다', '다시 로그인해주세요.', [
                    { text: '확인', onPress: () => navigation.navigate('LoginScreen') },
                ]);
                return;
            }

            setAuthToken(tokens.accessToken);

            const response = await api.get('/profiles/me');
            setLoggedInUserId(response.data.userId);
        } catch (error) {
            Alert.alert('오류', '로그인 사용자 정보를 가져오는 데 실패했습니다.');
            console.error('Failed to fetch logged-in user ID:', error);
        }
    };

    // 안 읽은 메시지 개수 가져오기
    const fetchUnreadMessages = async () => {
        if (!loggedInUserId) return; // userId가 없으면 호출하지 않음

        try {
            const tokens = await getTokens();
            if (!tokens?.accessToken) {
                Alert.alert('로그인이 필요합니다', '다시 로그인해주세요.', [
                    { text: '확인', onPress: () => navigation.navigate('LoginScreen') },
                ]);
                return;
            }

            setAuthToken(tokens.accessToken);

            const response = await api.get(`/chat/unread?userId=${loggedInUserId}`);
            setUnreadMessages(response.data || 0);
        } catch (error) {
            console.error('Failed to fetch unread messages:', error);
        }
    };

    // 로그인 사용자 ID 가져오기
    useEffect(() => {
        fetchLoggedInUserId();
    }, []);

    // unread 메시지 가져오기 (loggedInUserId가 변경될 때 호출)
    useEffect(() => {
        fetchUnreadMessages();

        // 필요 시 주기적 업데이트 설정 (예: 1분 간격)
        const interval = setInterval(fetchUnreadMessages, 60000);
        return () => clearInterval(interval); // 컴포넌트 언마운트 시 정리
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
