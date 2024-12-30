import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import ChatItemStyles from '../styles/Chat/ChatItemStyles'; // 스타일 파일 이름을 ChatItemStyles로 가져옴

const ChatItem = ({ item, formatDate, onPress }) => (
    <TouchableOpacity style={ChatItemStyles.chatItem} onPress={onPress}>
        {/* 프로필 이미지 */}
        <Image source={{ uri: item.user.profile_image }} style={ChatItemStyles.profileImage} />

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

export default ChatItem;
