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

  // 로그인 사용자 ID 가져오기
  const fetchLoggedInUserId = async () => {
    try {
      const tokens = await getTokens();
      setAuthToken(tokens.accessToken);

      const response = await api.get('/profiles/me');
      setLoggedInUserId(response.data.userId);
    } catch (error) {
      console.error('Failed to fetch logged-in user ID:', error);
    }
  };

  // 프로필 정보 가져오기 (ID가 설정된 후 실행)
  const fetchUserProfile = async (userId) => {
    if (!userId) return; // userId가 없으면 실행하지 않음

    try {
      const tokens = await getTokens();
      setAuthToken(tokens.accessToken);

      const response = await api.get(`/profiles/${userId}`);
      setUserData(response.data);
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
      if (error.response?.status === 403) {
        Alert.alert('오류', '프로필을 조회할 권한이 없습니다.');
      }
    } finally {
      setLoading(false);
    }
  };

  // 게시글 목록 가져오기 (ID가 설정된 후 실행)
  const fetchUserPosts = async (userId) => {
    if (!userId) return; // userId가 없으면 실행하지 않음

    try {
      const tokens = await getTokens();
      setAuthToken(tokens.accessToken);

      const response = await api.get(`/users/${userId}/posts?status=${activeTab}`);
      setPosts(response.data);
    } catch (error) {
      console.error('Failed to fetch user posts:', error);
      if (error.response?.status === 500) {
        Alert.alert('오류', '게시글을 불러오는 중 문제가 발생했습니다.');
      }
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      const loadData = async () => {
        await fetchLoggedInUserId(); // 로그인한 사용자 ID 가져오기
      };
      loadData();
    }, [])
  );

  useFocusEffect(
    React.useCallback(() => {
      if (loggedInUserId) {
        fetchUserProfile(loggedInUserId); // ✅ 프로필 정보 다시 불러오기
      }
    }, [loggedInUserId])
  );

  useEffect(() => {
    if (loggedInUserId) {
      fetchUserProfile(loggedInUserId);
      fetchUserPosts(loggedInUserId);
    }
  }, [loggedInUserId, activeTab]);

  // activeTab 변경 시 게시글 목록 조회
  useEffect(() => {
    fetchUserPosts();
  }, [activeTab]);

  // 응원하기 기능
  const encourageUser = async () => {
    try {
      const tokens = await getTokens();
      setAuthToken(tokens.accessToken);

      await api.post(`/profiles/${loggedInUserId}/cheers`);
      Alert.alert('응원 성공!', '응원을 보냈습니다.');
    } catch (error) {
      console.error('응원하기 API 에러:', error);
      Alert.alert('오류', error.response?.data?.message || '응원 요청 중 문제가 발생했습니다.');
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

  return (
    <SafeAreaView style={styles.container}>
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
                loggedInUserId={loggedInUserId}
              />
            )}
            <View style={styles.relativeContainer}>
              <EncourageButton
                totalCount={userData?.cheerCount || 0}
                onPress={encourageUser}
                disabled={true} // 로딩 중 또는 내 프로필일 경우 비활성화
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
