import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import colors from '../styles/Colors';
import fontStyles from '../styles/FontStyles';
import { Image } from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';

function UserProfile({ userData, isNotificationOn, setIsNotificationOn, isEditable = true }) {
    // isEditable이 true(기본값)일 때만 수정 가능한 버튼과 알람 설정 버튼이 보이도록 설정 (사용자가 나일 떄)
    // isEditable이 false일 때는 사용자가 다른 사용자의 프로필을 볼 때
    const navigation = useNavigation();

    return (
        <View style={styles.header}>
            <Image
                source={{ uri: 'https://via.placeholder.com/50' }}
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
                    <Text style={styles.userName}>{userData.name}</Text>
                    <Text style={styles.userLevel}>{userData.level}{' 단계'}</Text>
                </View>
                <Text style={styles.userIntro}>{userData.intro}</Text>
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
