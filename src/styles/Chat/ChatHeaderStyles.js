import { StyleSheet } from 'react-native';
import colors from '../../styles/Colors';
import fontStyles from '../../styles/FontStyles';

const ChatHeaderStyles = StyleSheet.create({
    header: {
        height: 56,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: colors.gray2,
        position: 'relative',
    },
    backButton: {
        position: 'absolute',
        left: 15,
        top: 23,
    },
    backIcon: {
        width: 8.64,
        height: 14,
    },
    headerText: {
        ...fontStyles.blackSemiBold20,
    },
});

export default ChatHeaderStyles;
