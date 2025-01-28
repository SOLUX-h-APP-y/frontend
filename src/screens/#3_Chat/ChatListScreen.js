import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import ChatItem from '../../components/ChatItem';
import colors from '../../styles/Colors';
import fontStyles from '../../styles/FontStyles';
import { getTokens } from '../../services/TokenManager';

const ChatListScreen = ({ navigation }) => {
    const [chatRooms, setChatRooms] = useState([]); // 채팅방 목록
    const [loading, setLoading] = useState(true);

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

    // 채팅 목록 API 호출
    const fetchChatRooms = async () => {
        try {
            setLoading(true); // 로딩 시작

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
            const response = await api.get(`/messages/rooms?userId=${userId}`); // userId를 동적으로 설정
            const mappedChatRooms = response.data.map((room) => ({
                id: room.chatRoomId,
                post_id: room.postTitle,
                user: {
                    profile_image: room.profileImage,
                    nickname: room.postTitle, // 닉네임 대신 게시물 제목 사용
                },
                last_message_content: room.lastMessageContent,
                last_message_time: room.lastMessageTimestamp,
                unread_chat_count: room.unreadCount,
            }));

            setChatRooms(mappedChatRooms); // 채팅 목록 업데이트
        } catch (error) {
            Alert.alert('오류', '채팅 목록을 불러오는 데 실패했습니다.');
            console.error('Failed to fetch chat rooms:', error);
        } finally {
            setLoading(false); // 로딩 종료
        }
    };

    // 초기 데이터 로드
    useEffect(() => {
        fetchChatRooms();
    }, []);

    const renderItem = ({ item }) => (
        <ChatItem
            item={item}
            formatDate={formatDate}
            onPress={() => navigation.navigate('ChatScreen', { chatRoomId: item.id, post_id: item.post_id, isCompleted: true })}
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
