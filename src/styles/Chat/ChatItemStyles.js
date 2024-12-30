import { StyleSheet } from 'react-native';
import colors from '../../styles/Colors';
import fontStyles from '../../styles/FontStyles';

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

export default ChatItemStyles;
