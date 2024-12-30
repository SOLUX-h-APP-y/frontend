import { StyleSheet } from 'react-native';
import colors from '../../styles/Colors';
import fontStyles from '../../styles/FontStyles';

const PostHeaderStyles = StyleSheet.create({
    postDetails: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 76,
        padding: 10,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: colors.gray2,
    },
    postImage: {
        width: 53,
        height: 53,
        borderRadius: 12,
        marginRight: 10,
        marginLeft: 5,
    },
    postTitle: {
        ...fontStyles.lightBlackSemiBold14,
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 3,
    },
    locationIcon: {
        width: 9.33,
        height: 13.33,
        marginRight: 5,
    },
    postLocation: {
        ...fontStyles.gray4Medium14,
    },
});

export default PostHeaderStyles;
