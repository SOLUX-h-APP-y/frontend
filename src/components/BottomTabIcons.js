import React from 'react';
import { Image, StyleSheet, View, Text } from 'react-native';
import colors from '../styles/Colors';
import fontStyles from '../styles/FontStyles';

const BottomTabIcons = ({ routeName, focused, unreadCount = 0 }) => {
    let iconSource;

    if (routeName === '홈') {
        iconSource = focused
            ? require('../assets/icons/homeIcon.png')
            : require('../assets/icons/inactiveHomeIcon.png');
    } else if (routeName === '요청') {
        iconSource = focused
            ? require('../assets/icons/requestIcon.png')
            : require('../assets/icons/inactiveRequestIcon.png');
    } else if (routeName === '채팅') {
        iconSource = focused
            ? require('../assets/icons/chatIcon.png')
            : require('../assets/icons/inactiveChatIcon.png');
    } else if (routeName === '마이') {
        iconSource = focused
            ? require('../assets/icons/profileIcon.png')
            : require('../assets/icons/inactiveProfileIcon.png');
    }

    // 채팅 아이콘에 안 읽은 메세지 개수 표시
    return (
        <View style={styles.iconContainer}>
            <Image source={iconSource} style={styles.BottomTabIcons} />
            {routeName === '채팅' && unreadCount > 0 && (
                <View style={styles.badge}>
                    <Text style={styles.badgeText}>{unreadCount}</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    iconContainer: {
        position: 'relative',
    },
    BottomTabIcons: {
        width: 18,
        height: 18,
        resizeMode: 'contain',
    },
    badge: {
        position: 'absolute',
        top: -11,
        right: -11,
        backgroundColor: colors.themeColor,
        borderRadius: 12,
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    badgeText: {
        ...fontStyles.whiteMedium14,
    },
});

export default BottomTabIcons;
