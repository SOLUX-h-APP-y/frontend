import { Image, TouchableOpacity, View } from 'react-native';

const UserProfileImage = ({ profileImage, onEditProfileImage }) => (
    <View style={styles.profileContainer}>
        <Image
            source={
                profileImage
                    ? { uri: profileImage }
                    : require('../assets/images/defaultProfile.png') // null 또는 undefined이면 기본 이미지
            } style={styles.profileImage} />
        <TouchableOpacity style={styles.editButton} onPress={onEditProfileImage}>
            <Image source={require('../assets/icons/editpencilIcon.png')} style={styles.editpencilIcon} />
        </TouchableOpacity>
    </View>
);

const styles = {
    profileContainer: {
        alignItems: 'center',
        marginBottom: 40,
        marginTop: 25,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    editButton: {
        position: 'absolute',
        top: 70,
        right: 130,
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 0,
    },
    editpencilIcon: {
        width: 40,
        height: 40,
    },
};

export default UserProfileImage;