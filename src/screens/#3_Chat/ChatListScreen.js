import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import ChatItem from '../../components/ChatItem';
import colors from '../../styles/Colors';
import fontStyles from '../../styles/FontStyles';
import { getTokens } from '../../services/TokenManager';
import api, { setAuthToken } from '../../services/api';

const ChatListScreen = ({ navigation }) => {
    const [chatRooms, setChatRooms] = useState([]); // 채팅방 목록
    const [loading, setLoading] = useState(true);
    const [loggedInUserId, setLoggedInUserId] = useState(null);

    // 날짜 포맷 함수
    const formatDate = (dateString) => {
        const messageDate = new Date(dateString);
        const now = new Date();

        const isToday =
            messageDate.getDate() === now.getDate() &&
            messageDate.getMonth() === now.getMonth() &&
            messageDate.getFullYear() === now.getFullYear();

        const isYesterday =
            messageDate.getDate() === now.getDate() - 1 &&
            messageDate.getMonth() === now.getMonth() &&
            messageDate.getFullYear() === now.getFullYear();

        if (isToday) {
            return messageDate
                .toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                .toLowerCase();
        } else if (isYesterday) {
            return '어제';
        } else {
            return `${messageDate.getMonth() + 1}월 ${messageDate.getDate()}일`;
        }
    };

    const fetchLoggedInUserId = async () => {
        try {
            const tokens = await getTokens();

            setAuthToken(tokens.accessToken);

            const response = await api.get('/profiles/me');
            const userId = response.data.userId;
            setLoggedInUserId(userId);

            // 여기서 바로 fetchChatRooms 호출
            fetchChatRooms(userId);
        } catch (error) {
            Alert.alert('오류', '로그인 사용자 정보를 가져오는 데 실패했습니다.');
            console.error('Failed to fetch logged-in user ID:', error);
        }
    };

    // 채팅 목록 API 호출
    const fetchChatRooms = async (userId) => {
        try {
            setLoading(true);
            const tokens = await getTokens();
            setAuthToken(tokens.accessToken);

            const response = await api.get(`/messages/rooms?userId=${userId}`);
            // console.log("📌 API 응답:", response.data);  // ✅ 응답 데이터 확인

            const mappedChatRooms = response.data.map((room) => ({
                id: room.chatRoomId,
                post_id: room.postId,
                post_title: room.postTitle,
                user: {
                    profile_image: room.profileImage,
                },
                last_message_content: room.lastMessageContent,
                last_message_time: room.lastMessageTimestamp,
                unread_chat_count: room.unreadCount,
                isCompleted: room.isCompleted ?? false // ✅ 기본값 설정
            }));

            setChatRooms(mappedChatRooms);
        } catch (error) {
            Alert.alert('오류', '채팅 목록을 불러오는 데 실패했습니다.');
            console.error('Failed to fetch chat rooms:', error);
        } finally {
            setLoading(false);
        }
    };

    // 로그인 사용자 ID 가져온 후 채팅 목록 호출
    useEffect(() => {
        const initialize = async () => {
            await fetchLoggedInUserId();
        };
        initialize();
    }, []);

    const renderItem = ({ item }) => (
        <ChatItem
            item={item}
            formatDate={formatDate}
            onPress={() => navigation.navigate('ChatScreen', {
                chatRoomId: item.id,  // ✅ 기존 채팅방 ID 전달
                postId: item.post_id,
                // ownerId: item.post.writerId,  // ✅ 추가 (채팅 상대방 ID)
                isCompleted: item.isCompleted ?? false
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
