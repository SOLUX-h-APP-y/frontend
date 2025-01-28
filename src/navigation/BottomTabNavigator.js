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

    const [unreadMessages, setUnreadMessages] = useState(0); // 테스트용 메시지 수

    // 안 읽은 메시지 개수 불러오기
    const fetchUnreadMessages = async () => {
        try {
            const tokens = await getTokens();
            if (!tokens || !tokens.accessToken) {
                Alert.alert('로그인이 필요합니다', '다시 로그인해주세요.', [
                    { text: '확인', onPress: () => navigation.navigate('LoginScreen') },
                ]);
                return;
            }

            const accessToken = tokens.accessToken;
            setAuthToken(accessToken);

            // API 호출
            const response = await api.get(`/chat/unread?userId=${userId}`); // userId를 동적으로 설정
            setUnreadMessages(response.data || 0); // 데이터 업데이트
        } catch (error) {
            console.error('Failed to fetch unread messages:', error);
        }
    };

    // 컴포넌트 마운트 시 API 호출
    useEffect(() => {
        fetchUnreadMessages();

        // 필요시 주기적 업데이트 설정 (예: 1분 간격)
        const interval = setInterval(fetchUnreadMessages, 60000);
        return () => clearInterval(interval); // 컴포넌트 언마운트 시 정리
    }, []);

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
