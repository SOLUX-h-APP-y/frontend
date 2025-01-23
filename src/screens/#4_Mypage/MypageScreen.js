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
import api, { setAuthToken } from '../../utils/api';
import fontStyles from '../../styles/FontStyles';
import PostPreviewItem from '../../components/PostPreviewItem';
import UserProfile from '../../components/UserProfile';
import Tabs from '../../components/Tabs';
import LevelProgress from '../../components/LevelProgress';
import { EncourageButton } from '../../components/Buttons';
import { getTokens } from '../../services/TokenManager';
import { useNavigation } from '@react-navigation/native';

const MypageScreen = () => {
    const navigation = useNavigation();
    const [activeTab, setActiveTab] = useState('거래중');
    const [isNotificationOn, setIsNotificationOn] = useState(true);
    const [userData, setUserData] = useState(null); // 초기 데이터를 null로 설정
    const [loading, setLoading] = useState(true); // 로딩 상태 추가
    const tabs = ['거래중', '대여중', '거래완료'];

    const profileOwnerId = 1; // 현재 보고 있는 프로필 소유자 ID

    // API 호출 함수
    const fetchUserProfile = async () => {
        try {
            setLoading(true);
            const tokens = await getTokens();

            if (!tokens || !tokens.accessToken) {
                Alert.alert('로그인이 필요합니다', '다시 로그인해주세요.', [
                    { text: '확인', onPress: () => navigation.navigate('LoginScreen') },
                ]);
                return;
            }

            // accessToken만 사용
            const accessToken = tokens.accessToken;
            setAuthToken(accessToken);
            console.log('Authorization Header:', api.defaults.headers.common['Authorization']);

            const response = await api.get('/profiles/me');
            console.log('Request Headers:', response.config.headers);

            setUserData(response.data);
        } catch (error) {
            if (error.response?.status === 401) {
                console.error('Unauthorized - Token expired');
                Alert.alert('로그인이 만료되었습니다', '다시 로그인해주세요.', [
                    { text: '확인', onPress: () => navigation.navigate('LoginScreen') },
                ]);
            } else if (error.response?.status === 403) {
                Alert.alert('권한 오류', '접근 권한이 없습니다.');
            } else {
                console.error('Failed to fetch user profile:', error);
                Alert.alert('오류', '사용자 프로필을 불러오는 데 실패했습니다.');
            }
        } finally {
            setLoading(false);
        }
    };



    // 컴포넌트가 렌더링될 때 API 호출
    useEffect(() => {
        fetchUserProfile();
    }, []);

    const handleEncouragePress = () => {
        console.log('응원하기');
        // 백엔드 API 요청 추가 예정
    };

    const handleLevelChange = (newLevel) => {
        if (userData && userData.level !== newLevel) {
            setUserData((prevData) => ({
                ...prevData,
                level: newLevel,
            }));
        }
    };

    const posts = [
        { id: 1, title: '원피스형 정장 빌려드려요', price: 2500, location: '청파동2가', type: 'borrower', state: '거래중' },
        { id: 2, title: '카메라 빌려드립니다', price: 8500, location: '청파동2가', type: 'borrower', state: '대여중' },
        { id: 3, title: '헤드폰 빌려드립니다', price: 4500, location: '청파동2가', type: 'sharer', state: '거래완료' },
        { id: 4, title: '가방 빌려드립니다', price: 3500, location: '청파동2가', type: 'sharer', state: '거래완료' },
    ];

    const filteredPosts = posts.filter((post) => post.state === activeTab);

    const renderPost = ({ item }) => (
        <View style={styles.postCardContainer}>
            <PostPreviewItem data={item} />
        </View>
    );

    // 로딩 상태 표시
    if (loading) {
        return (
            <SafeAreaView style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
            </SafeAreaView>
        );
    }

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
                            />
                        )}
                        <View style={styles.relativeContainer}>
                            <EncourageButton
                                totalCount={userData?.cheerCount} // 응원 횟수 전달
                                isMyProfile={userData?.userId === profileOwnerId}
                                onPress={handleEncouragePress}
                            />
                            <LevelProgress
                                rentalCount={userData?.rentalCount || 0}
                                onLevelChange={handleLevelChange}
                            />
                        </View>
                        <View style={styles.tabsContainer}>
                            <Text style={styles.tabsTitle}>내 글 보기</Text>
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
