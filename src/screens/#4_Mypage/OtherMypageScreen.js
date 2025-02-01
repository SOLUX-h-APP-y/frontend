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
import { useFocusEffect, useRoute } from '@react-navigation/native';
import colors from '../../styles/Colors';
import { NavigateHeader } from '../../components/CustomHeaders';

const OtherMypageScreen = () => {
    const route = useRoute();
    const { userId } = route.params || {};

    const [userData, setUserData] = useState(null);
    const [loggedInUserId, setLoggedInUserId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState([]);
    const [activeTab, setActiveTab] = useState('거래중');
    const tabs = ['거래중', '대여중', '거래완료'];
    const [isNotificationOn, setIsNotificationOn] = useState(true);

    // 로그인 사용자 ID를 가져옴
    const fetchLoggedInUserId = async () => {
        try {
            const tokens = await getTokens();

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

    // 특정 유저 프로필 가져오기
    const fetchUserProfile = async () => {
        try {
            setLoading(true);
            const tokens = await getTokens();
            setAuthToken(tokens.accessToken);

            const response = await api.get(`/profiles/${userId}`);
            setUserData(response.data);
        } catch (error) {
            console.error('Failed to fetch user profile:', error);
        } finally {
            setLoading(false);
        }
    };

    // 해당 유저 작성한 글 목록 조회
    const fetchUserPosts = async () => {
        try {
            const tokens = await getTokens();
            setAuthToken(tokens.accessToken);

            const response = await api.get(`/users/${userId}/posts?status=${activeTab}`);
            setPosts(response.data);
        } catch (error) {
            console.error('Failed to fetch user posts:', error);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            fetchLoggedInUserId();
            fetchUserProfile();
            fetchUserPosts();
        }, [userId])
    );

    // activeTab 변경 시 게시글 목록 조회
    useEffect(() => {
        fetchUserPosts();
    }, [activeTab]);

    // 응원하기
    const encourageUser = async () => {
        try {
            const tokens = await getTokens();
            setAuthToken(tokens.accessToken);

            const response = await api.post(`/profiles/${userId}/cheers`);
            if (response.status === 200) {
                Alert.alert('응원 성공!', '응원을 보냈습니다.');
                fetchUserProfile(); // ✅ 프로필 새로고침
            }
        } catch (error) {
            // console.error('응원하기 API 에러:', error.response);
            if (error.response?.status === 500 || error.response?.status === 403) {
                Alert.alert('오류', '이미 응원한 사용자입니다.');
            } else {
                Alert.alert(
                    '오류',
                    `응원 요청 중 문제가 발생했습니다: ${error.message}`,
                );
            }
        } finally {
            setLoading(false);
        }
    };

    const handleLevelChange = newLevel => {
        if (userData && userData.level !== newLevel) {
            setUserData(prevData => ({
                ...prevData,
                level: newLevel,
            }));
        }
    };

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

    const tabTitle =
        userId === loggedInUserId ? '내 글 보기' : '거래 목록';
    return (
        <SafeAreaView style={styles.container}>
            <View style={{ paddingHorizontal: 20, borderBottomWidth: 1, borderColor: colors.gray2 }}>
                <NavigateHeader title="프로필" />
            </View>
            <FlatList
                data={posts}
                renderItem={renderPost}
                keyExtractor={item => item.postId.toString()}
                style={styles.transactionList}
                ListHeaderComponent={
                    <>
                        {userData && (
                            <UserProfile
                                userData={userData}
                                isNotificationOn={isNotificationOn}
                                setIsNotificationOn={setIsNotificationOn}
                            />
                        )}
                        <View style={styles.relativeContainer}>
                            <EncourageButton
                                totalCount={userData?.cheerCount || 0}
                                userId={userId} // 응원 받을 사람
                                loggedInUserId={loggedInUserId} // 응원하는 사람
                                onPress={encourageUser}
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

export default OtherMypageScreen;
