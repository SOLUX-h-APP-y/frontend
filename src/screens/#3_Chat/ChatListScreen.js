import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, RefreshControl } from 'react-native';
import ChatItem from '../../components/ChatItem';
import colors from '../../styles/Colors';
import fontStyles from '../../styles/FontStyles';
import { getTokens } from '../../services/TokenManager';
import api, { setAuthToken } from '../../services/api';

const ChatListScreen = ({ navigation }) => {
    const [chatRooms, setChatRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false); // 새로고침 상태
    const [loggedInUserId, setLoggedInUserId] = useState(null);

    // 날짜 포맷 함수
    const formatDate = (dateString) => {
        const utcDate = new Date(dateString); // 서버에서 받은 UTC 시간
        const kstDate = new Date(utcDate.getTime() + 9 * 60 * 60 * 1000);
        const now = new Date();
        const nowKST = new Date(now.getTime() + 9 * 60 * 60 * 1000); // KST로 변환

        const isToday =
            kstDate.getDate() === nowKST.getDate() &&
            kstDate.getMonth() === nowKST.getMonth() &&
            kstDate.getFullYear() === nowKST.getFullYear();

        const isYesterday =
            kstDate.getDate() === nowKST.getDate() - 1 &&
            kstDate.getMonth() === nowKST.getMonth() &&
            kstDate.getFullYear() === nowKST.getFullYear();

        if (isToday) {
            return kstDate
                .toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                .toLowerCase();
        } else if (isYesterday) {
            return '어제';
        } else {
            return `${kstDate.getMonth() + 1}월 ${kstDate.getDate()}일`;
        }
    };

    const fetchLoggedInUserId = async () => {
        try {
            const tokens = await getTokens();

            setAuthToken(tokens.accessToken);

            const response = await api.get('/profiles/me');
            const userId = response.data.userId;
            setLoggedInUserId(userId);
            fetchChatRooms(userId);
        } catch (error) {
            Alert.alert('오류', '로그인 사용자 정보를 가져오는 데 실패했습니다.');
            console.error('Failed to fetch logged-in user ID:', error);
        }
    };

    // 채팅 목록 API 호출
    const fetchChatRooms = async (userId, isRefresh = false) => {
        try {
            if (!isRefresh) setLoading(true);
            else setRefreshing(true);

            const tokens = await getTokens();
            setAuthToken(tokens.accessToken);

            const response = await api.get(`/messages/rooms?userId=${userId}`);

            const mappedChatRooms = response.data.map((room) => ({
                id: room.chatRoomId,
                writer_id: room.writerId,
                post_id: room.postId,
                post_title: room.postTitle,
                user: {
                    profile_image: room.profileImage,
                },
                last_message_content: room.lastMessageContent,
                last_message_time: room.lastMessageTimestamp,
                unread_chat_count: room.unreadCount,
            }));
            // 최신순 정렬 (last_message_time 기준 내림차순 정렬)
            const sortedChatRooms = mappedChatRooms.sort((a, b) => {
                const dateA = a.last_message_time ? new Date(a.last_message_time).getTime() : 0;
                const dateB = b.last_message_time ? new Date(b.last_message_time).getTime() : 0;
                return dateB - dateA;
            });

            setChatRooms(mappedChatRooms);
        } catch (error) {
            Alert.alert('오류', '채팅 목록을 불러오는 데 실패했습니다.');
            console.error('Failed to fetch chat rooms:', error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    // 새로고침 요청 시 호출
    const onRefresh = async () => {
        if (!loggedInUserId) return;
        await fetchChatRooms(loggedInUserId, true);
    };

    // 로그인 사용자 ID 가져온 후 채팅 목록 호출
    useEffect(() => {
        fetchLoggedInUserId();
    }, []);

    // 실시간 업데이트
    useEffect(() => {
        const interval = setInterval(() => {
            if (loggedInUserId) {
                fetchChatRooms(loggedInUserId);
            }
        }, 5000);

        return () => clearInterval(interval);
    }, [loggedInUserId]);


    const renderItem = ({ item }) => (
        <ChatItem
            item={item}
            formatDate={formatDate}
            onPress={() => navigation.navigate('ChatScreen', {
                chatRoomId: item.id,  //기존 채팅방 ID 전달
                postId: item.post_id,
                ownerId: item.writer_id,
            })}
        />
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>채팅</Text>
            </View>
            <FlatList
                data={chatRooms}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.listContainer}
                refreshControl={ // 새로고침 기능 추가
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        height: 56,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: colors.gray2,
    },
    headerText: {
        ...fontStyles.blackSemiBold20,
    },
    listContainer: {
        paddingHorizontal: 5,
    },
});

export default ChatListScreen;
