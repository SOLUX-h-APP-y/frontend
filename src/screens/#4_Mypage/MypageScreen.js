import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    SafeAreaView,
    ActivityIndicator,
    Alert,
} from 'react-native';
import api, { setAuthToken } from '../../services/api';
import fontStyles from '../../styles/FontStyles';
import PostPreviewItem from '../../components/PostPreviewItem';
import UserProfile from '../../components/UserProfile';
import Tabs from '../../components/Tabs';
import LevelProgress from '../../components/LevelProgress';
import { EncourageButton } from '../../components/Buttons';
import { getTokens } from '../../services/TokenManager';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import colors from '../../styles/Colors';

const MypageScreen = () => {
    const navigation = useNavigation();
    const [activeTab, setActiveTab] = useState('거래중');
    const [isNotificationOn, setIsNotificationOn] = useState(true);
    const [userData, setUserData] = useState(null); // 초기 데이터를 null로 설정
    const [loggedInUserId, setLoggedInUserId] = useState(null); // 로그인한 사용자 ID
    const [loading, setLoading] = useState(true); // 로딩 상태 추가
    const [posts, setPosts] = useState([]); // 게시글 목록
    const tabs = ['거래중', '대여중', '거래완료'];

    const profileOwnerId = 30; // 현재 보고 있는 프로필 소유자 ID

    // 로그인 사용자 ID를 가져옴
    const fetchLoggedInUserId = async () => {
        try {
            const tokens = await getTokens();
            if (!tokens || !tokens.accessToken) {
                Alert.alert('로그인이 필요합니다', '다시 로그인해주세요.', [
                    { text: '확인', onPress: () => navigation.navigate('LoginScreen') },
                ]);
                return;
            }

            const accessToken = tokens.accessToken;
            setAuthToken(accessToken);

            // 자신의 프로필 조회를 통해 로그인한 사용자 ID를 가져옴
            const response = await api.get('/profiles/me');
            setLoggedInUserId(response.data.userId); // 로그인한 사용자 ID 설정
        } catch (error) {
            Alert.alert('오류', '로그인 사용자 정보를 가져오는 데 실패했습니다.');
            console.error('Failed to fetch logged-in user ID:', error);
        }
    };

    // 사용자가 작성한 글 목록 조회
    const fetchUserPosts = async () => {
        try {
            setLoading(true);

            const tokens = await getTokens();
            if (!tokens || !tokens.accessToken) {
                Alert.alert('로그인이 필요합니다', '다시 로그인해주세요.', [
                    { text: '확인', onPress: () => navigation.navigate('LoginScreen') },
                ]);
                return;
            }

            const accessToken = tokens.accessToken;
            setAuthToken(accessToken);

            const response = await api.get('/users/me/posts');
            setPosts(response.data); // 조회한 글 데이터 설정
        } catch (error) {
            Alert.alert('오류', '글 목록을 불러오는 데 실패했습니다.');
            console.error('Failed to fetch user posts:', error);
        } finally {
            setLoading(false);
        }
    };


    // 특정 프로필 조회
    const fetchUserProfile = async (userId) => {
        try {
            setLoading(true);

            const tokens = await getTokens();
            if (!tokens || !tokens.accessToken) {
                Alert.alert('로그인이 필요합니다', '다시 로그인해주세요.', [
                    { text: '확인', onPress: () => navigation.navigate('LoginScreen') },
                ]);
                return;
            }

            const accessToken = tokens.accessToken;
            setAuthToken(accessToken);

            const response = await api.get(`/profiles/${userId}`);
            setUserData(response.data); // 조회한 프로필 데이터 설정
        } catch (error) {
            Alert.alert('오류', '프로필 정보를 불러오는 데 실패했습니다.');
            console.error('Failed to fetch user profile:', error);
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            fetchLoggedInUserId(); // 로그인 사용자 ID 가져오기
            fetchUserProfile(profileOwnerId); // 특정 프로필 조회
            fetchUserPosts(); // 사용자가 작성한 글 목록 조회
        }, [profileOwnerId])
    );

    // 응원하기
    const encourageUser = async (receiverId) => {
        try {
            setLoading(true);

            const tokens = await getTokens();
            if (!tokens || !tokens.accessToken) {
                Alert.alert('로그인이 필요합니다', '다시 로그인해주세요.', [
                    { text: '확인', onPress: () => navigation.navigate('LoginScreen') },
                ]);
                return;
            }

            const accessToken = tokens.accessToken;
            setAuthToken(accessToken);

            const response = await api.post(`/profiles/${receiverId}/cheers`);

            if (response.status === 200) {
                Alert.alert('응원 성공!', '응원을 보냈습니다.');
                fetchUserProfile(profileOwnerId); // 프로필 데이터 새로고침
            } else {
                Alert.alert('오류', '응원에 실패했습니다.');
            }
        } catch (error) {
            if (error.response?.status === 403) {
                Alert.alert('오류', '이미 응원한 사용자입니다.');
            } else if (error.response?.status === 400) {
                Alert.alert('오류', '자신은 응원할 수 없습니다.');
            } else if (error.response?.status === 401) {
                Alert.alert('로그인이 만료되었습니다', '다시 로그인해주세요.');
                navigation.navigate('LoginScreen');
            } else if (error.response?.status === 404) {
                Alert.alert('오류', '사용자를 찾을 수 없습니다.');
            } else {
                Alert.alert('오류', `응원 요청 중 문제가 발생했습니다: ${error.message}`);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleLevelChange = (newLevel) => {
        if (userData && userData.level !== newLevel) {
            setUserData((prevData) => ({
                ...prevData,
                level: newLevel,
            }));
        }
    };

    const filteredPosts = posts.filter((post) => post.postStatus === activeTab);

    const renderPost = ({ item }) => (
        <View style={styles.postCardContainer}>
            <PostPreviewItem data={item} />
        </View>
    );

    // 로딩 상태 표시
    if (loading) {
        return (
            <SafeAreaView style={styles.container}>
                <ActivityIndicator size="large" color={colors.theme} />
            </SafeAreaView>
        );
    }

    const tabTitle = profileOwnerId === loggedInUserId ? '내 글 보기' : '거래 목록';
    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={filteredPosts}
                renderItem={renderPost}
                keyExtractor={(item) => item.id.toString()}
                style={styles.transactionList}
                ListHeaderComponent={
                    <>
                        {userData && (
                            <UserProfile
                                userData={userData}
                                isNotificationOn={isNotificationOn}
                                setIsNotificationOn={setIsNotificationOn}
                                profileOwnerId={loggedInUserId} // 현재 프로필 소유자 ID
                            />
                        )}
                        <View style={styles.relativeContainer}>
                            <EncourageButton
                                totalCount={userData?.cheerCount || 0}
                                profileOwnerId={profileOwnerId}
                                currentUserId={loggedInUserId}
                                onPress={() => encourageUser(profileOwnerId)} // 응원 버튼 클릭
                                disabled={loading || profileOwnerId === loggedInUserId} // 로딩 중 또는 내 프로필일 경우 비활성화
                            />
                            <LevelProgress
                                rentalCount={userData?.rentalCount || 0}
                                onLevelChange={handleLevelChange}
                            />
                        </View>
                        <View style={styles.tabsContainer}>
                            <Text style={styles.tabsTitle}>{tabTitle}</Text>
                        </View>
                        <Tabs
                            tabs={tabs}
                            activeTab={activeTab}
                            setActiveTab={setActiveTab}
                        />
                    </>
                }
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    relativeContainer: {
        position: 'relative',
    },
    tabsContainer: {
        flexDirection: 'row',
        marginTop: 40,
    },
    tabsTitle: {
        marginLeft: 7,
        ...fontStyles.blackSemiBold24,
    },
    transactionList: {
        flex: 1,
        padding: 16,
    },
    list: {
        padding: 10,
    },
    postCardContainer: {
        marginBottom: 20,
        position: 'relative',
    },
});

export default MypageScreen;
