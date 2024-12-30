import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import ChatItem from '../../components/ChatItem';
import colors from '../../styles/Colors';
import fontStyles from '../../styles/FontStyles';

const ChatListScreen = ({ navigation }) => {
    const [chatRooms, setChatRooms] = useState([
        {
            id: 1,
            post_id: '게시물1',
            user: {
                profile_image: 'https://via.placeholder.com/50',
                nickname: '사용자1',
            },
            last_message_content: '안녕하세요. 채팅 내용',
            last_message_time: '2024-12-27T15:55:00',
            unread_chat_count: 2,
        },
        {
            id: 2,
            post_id: '게시물2',
            user: {
                profile_image: 'https://via.placeholder.com/50',
                nickname: '사용자2',
            },
            last_message_content: '안녕하세요. 채팅 내용',
            last_message_time: '2024-12-27T14:10:00',
            unread_chat_count: 3,
        },
        {
            id: 3,
            post_id: '게시물3',
            user: {
                profile_image: 'https://via.placeholder.com/50',
                nickname: '사용자3',
            },
            last_message_content: '안녕하세요. 채팅 내용',
            last_message_time: '2024-12-26T11:30:00',
            unread_chat_count: 0,
        },
        {
            id: 4,
            post_id: '게시물4',
            user: {
                profile_image: 'https://via.placeholder.com/50',
                nickname: '사용자4',
            },
            last_message_content: '안녕하세요. 채팅 내용',
            last_message_time: '2024-12-25T09:20:00',
            unread_chat_count: 3,
        },
        {
            id: 5,
            post_id: '게시물5',
            user: {
                profile_image: 'https://via.placeholder.com/50',
                nickname: '사용자5',
            },
            last_message_content: '안녕하세요. 채팅 내용',
            last_message_time: '2024-12-25T09:20:00',
            unread_chat_count: 3,
        },
        {
            id: 6,
            post_id: '게시물6',
            user: {
                profile_image: 'https://via.placeholder.com/50',
                nickname: '사용자6',
            },
            last_message_content: '안녕하세요. 채팅 내용',
            last_message_time: '2024-12-25T09:20:00',
            unread_chat_count: 10,
        },
        {
            id: 7,
            post_id: '게시물7',
            user: {
                profile_image: 'https://via.placeholder.com/50',
                nickname: '사용자7',
            },
            last_message_content: '안녕하세요. 채팅 내용',
            last_message_time: '2024-12-25T09:20:00',
            unread_chat_count: 7,
        },
    ]);

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

    const renderItem = ({ item }) => (
        <ChatItem
            item={item}
            formatDate={formatDate}
            onPress={() => navigation.navigate('ChatScreen', { chatRoomId: item.id, post_id: item.post_id, isCompleted: false })}
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
