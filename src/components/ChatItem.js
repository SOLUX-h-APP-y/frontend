import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import colors from '../styles/Colors';
import fontStyles from '../styles/FontStyles';

function ChatItem({ item, formatDate, onPress }) {
    return (
        <TouchableOpacity style={ChatItemStyles.chatItem} onPress={onPress}>
            {/* 프로필 이미지 */}
            <Image
                source={{ uri: item.user.profile_image }}
                style={ChatItemStyles.profileImage}
            />

            {/* 채팅 상세 정보 */}
            <View style={ChatItemStyles.chatDetails}>
                <Text style={ChatItemStyles.post_id} numberOfLines={1} ellipsizeMode="tail">
                    {item.post_id}
                </Text>
                <Text style={ChatItemStyles.lastMessage} numberOfLines={1} ellipsizeMode="tail">
                    {item.last_message_content}
                </Text>
            </View>

            {/* 메타 정보 */}
            <View style={ChatItemStyles.chatMeta}>
                {item.unread_chat_count > 0 && (
                    <View style={ChatItemStyles.badge}>
                        <Text style={ChatItemStyles.badgeText}>{item.unread_chat_count}</Text>
                    </View>
                )}
                <Text style={ChatItemStyles.time}>{formatDate(item.last_message_time)}</Text>
            </View>
        </TouchableOpacity>
    );
}

const ChatItemStyles = StyleSheet.create({
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

export default ChatItem;
