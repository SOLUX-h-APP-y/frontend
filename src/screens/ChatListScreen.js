import React, { useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import colors from '../styles/Colors';
import fontStyles from '../styles/FontStyles';


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
        <TouchableOpacity
            style={styles.chatItem}
            onPress={() => navigation.navigate('ChatRoom', { chatRoomId: item.id })}
        >
            <Image source={{ uri: item.user.profile_image }} style={styles.profileImage} />
            <View style={styles.chatDetails}>
                <Text style={styles.post_id}>{item.post_id}</Text>
                <Text style={styles.lastMessage}>{item.last_message_content}</Text>
            </View>
            <View style={styles.chatMeta}>
                {item.unread_chat_count > 0 && (
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>{item.unread_chat_count}</Text>
                    </View>
                )}
                <Text style={styles.time}>{formatDate(item.last_message_time)}</Text>
            </View>
        </TouchableOpacity>
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
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: colors.gray2,
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
    listContainer: {
        paddingHorizontal: 5,
    },
    chatItem: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 100,
        borderBottomWidth: 1,
        borderBottomColor: colors.gray2,
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 25,
        marginLeft: 15,
        marginRight: 15,
    },
    chatDetails: {
        flex: 1,
    },
    post_id: {
        ...fontStyles.blackSemiBold20,
        marginBottom: 5,
    },
    lastMessage: {
        ...fontStyles.blackMedium14,
    },
    chatMeta: {
        alignItems: 'flex-end',
        justifyContent: 'center',
        height: '100%',
        paddingRight: 10,
    },
    badge: {
        backgroundColor: colors.themeColor,
        borderRadius: 12,
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    badgeText: {
        ...fontStyles.whiteMedium14,
    },
    time: {
        ...fontStyles.gray3Medium14,
    },
});

export default ChatListScreen;
