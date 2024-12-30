import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import ChatHeaderStyles from '../styles/Chat/ChatHeaderStyles';

const ChatHeader = ({ navigation }) => {
    return (
        <View style={ChatHeaderStyles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={ChatHeaderStyles.backButton}>
                <Image source={require('../assets/icons/backIcon.png')} style={ChatHeaderStyles.backIcon} />
            </TouchableOpacity>
            <Text style={ChatHeaderStyles.headerText}>채팅</Text>
        </View>
    );
};

export default ChatHeader;
