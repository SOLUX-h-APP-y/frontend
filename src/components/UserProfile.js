import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import colors from '../styles/Colors';
import fontStyles from '../styles/FontStyles';
import { Image } from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';

function UserProfile({ userData, isNotificationOn, setIsNotificationOn, profileOwnerId, onEncouragePress }) {
    const navigation = useNavigation();

    const isEditable = profileOwnerId === userData?.userId;

    // console.log("isEditable:", isEditable); // 디버깅용
    // console.log("profileOwnerId:", profileOwnerId); // 디버깅용
    // console.log("userData.userId:", userData?.userId); // 디버깅용

    // console.log('UserProfile userData:', userData);
    // UserProfile userData: 
    // { "allowNotification": true, "bio": null, "cheerCount": 0, 
    //     "level": "씨앗", "locationName": "경기도 군포시 산본동", 
    //     "nextTier": "새싹", "nickname": "Dd", "profileImage": null, 
    //     "remainingCountToNextTier": 10, "rentalCount": 0, 
    //     "tier": "씨앗", "userId": 25 }

    return (
        <View style={styles.header}>
            <Image
                source={
                    userData.profileImage
                        ? { uri: userData.profileImage }
                        : require('../assets/images/defaultProfile.png')

                }
                style={styles.profileImage}
            />
            <View style={[styles.userInfo, !isEditable && styles.userInfoCentered]}>
                {isEditable && (
                    <TouchableOpacity onPress={() => navigation.navigate('EditMypageScreen')}>
                        <View style={styles.editContainer}>
                            <Text style={styles.editInfo}>내 정보 수정하기</Text>
                            <Image
                                source={require('../assets/icons/editIcon.png')}
                                style={styles.editIcon}
                            />
                        </View>
                    </TouchableOpacity>
                )}
                <View style={styles.userNameLevelContainer}>
                    <Text style={styles.userName}>{userData.nickname}</Text>
                    <Text style={styles.userLevel}>{userData.tier}{' 단계'}</Text>
                </View>
                <Text style={styles.userIntro}>{userData.bio || '소개 글을 작성해주세요.'}</Text>
            </View>
            {isEditable && (
                <TouchableOpacity
                    onPress={() => setIsNotificationOn((prevState) => !prevState)}
                >
                    <Image
                        source={
                            isNotificationOn
                                ? require('../assets/icons/bellIcon.png')
                                : require('../assets/icons/emptybellIcon.png')
                        }
                        style={styles.notificationIcon}
                    />
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 3,
        borderBottomColor: colors.gray1,
    },
    profileImage: {
        width: 72,
        height: 72,
        borderRadius: 40,
    },
    userInfo: {
        flex: 1,
        marginLeft: 15,
    },
    userInfoCentered: {
        justifyContent: 'center', // 수직 가운데 정렬
    },
    editContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 2, // 여백 추가
    },
    editInfo: {
        ...fontStyles.gray3Medium14,
    },
    editIcon: {
        width: 4.2,
        height: 9.1,
        marginLeft: 10,
    },
    userNameLevelContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 2, // 여백 추가
    },
    userName: {
        ...fontStyles.lightBlackSemiBold20,
    },
    userLevel: {
        ...fontStyles.gray4SemiBold16,
        marginLeft: 5,
    },
    userIntro: {
        ...fontStyles.lightBlackMedium14,
    },
    notificationIcon: {
        width: 16,
        height: 19.5,
        marginRight: 10,
        marginBottom: 50,
    },
});

export default UserProfile;
