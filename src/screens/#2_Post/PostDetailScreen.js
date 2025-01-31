import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator, // 로딩 표시를 위한 컴포넌트 추가
} from 'react-native';
import locationIcon from '../../assets/icons/locationIcon.png';
import colors from '../../styles/Colors';
import { CategoryTag, StateTag } from '../../components/Tags';
import BottomBar from '../../components/BottomBar';
import { NavigateHeader } from '../../components/CustomHeaders';
import settingIcon from '../../assets/icons/settingIcon.png';
import { useEffect, useState } from 'react';
import StateSelector from '../../components/StateSelector';
import { useRoute } from '@react-navigation/native';
import { getTokens } from '../../services/TokenManager';
import api, { setAuthToken } from '../../services/api';
import MiniMap from '../../components/MiniMap';
import Swiper from 'react-native-swiper';

function PostDetailScreen({ navigation }) {
  const [stateActive, setStateActive] = useState(false);
  const route = useRoute();
  const { postId } = route.params;
  const [post, setPost] = useState(null); // 초기 상태를 null로 설정
  const [loading, setLoading] = useState(true); // 로딩 상태 추가
  const [images, setImages] = useState([]);

  const handleStateActive = () => {
    setStateActive(!stateActive);
  };

  const fetchPostDetail = async token => {
    try {
      const response = await api.get(`/posts/${postId}`);
      setPost(response.data);
      setImages(response.data.imageUrls);
    } catch (e) {
      console.error('Failed to fetch post:', e);
    } finally {
      setLoading(false); // 로딩 완료
    }
  };

  useEffect(() => {
    const initialize = async () => {
      try {
        const tokens = await getTokens(); // 토큰 가져오기
        if (tokens?.accessToken) {
          setAuthToken(tokens.accessToken); // Axios 헤더에 토큰 설정
          await fetchPostDetail(tokens.accessToken); // Post 데이터 요청
        }
      } catch (err) {
        console.error('Initialization error:', err); // 에러 처리
      }
    };

    initialize(); // 비동기 함수 실행
  }, []);

  // 데이터 로딩 중이면 로딩 UI 표시
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  // 데이터가 없을 경우 예외 처리
  if (!post) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={{ color: colors.gray3 }}>
          게시글을 불러올 수 없습니다.
        </Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView contentContainerStyle={styles.container}>
        {images.length !== 0 ? (
          <View style={{ position: 'relative' }}>
            <View style={styles.postImage}>
              <Swiper
                showsPagination={true}
                dotStyle={styles.dot} // 비활성화된 점 스타일
                activeDotStyle={styles.activeDot} // 활성화된 점 스타일
              >
                {images.map((image, index) => (
                  <Image
                    source={{ uri: image }}
                    key={index}
                    style={{ flex: 1 }}
                  />
                ))}
              </Swiper>
            </View>
            <View style={styles.headerOverlay}>
              <NavigateHeader type="white" />
            </View>
          </View>
        ) : (
          <View style={{ paddingTop: 20, marginLeft: 20 }}>
            <NavigateHeader />
          </View>
        )}
        <View style={styles.contentContainer}>
          <View style={styles.profile}>
            <Image source={{ uri: post.writerProfileImage }} />
            <View
              style={{
                flex: 1,
                justifyContent: 'space-between',
                flexDirection: 'row',
              }}>
              <View style={{ gap: 5, justifyContent: 'center' }}>
                <Text>{post.writerNickname}</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    gap: 5,
                    alignItems: 'center',
                  }}>
                  <Image source={locationIcon} style={styles.locationIcon} />
                  <Text style={{ color: colors.gray2 }}>{post.distance}</Text>
                </View>
              </View>
              {post.isMyPost ? (
                <TouchableOpacity
                  style={{ justifyContent: 'center' }}
                  onPress={handleStateActive}>
                  <Image source={settingIcon} />
                </TouchableOpacity>
              ) : null}
            </View>
          </View>
          <View style={styles.tags}>
            <CategoryTag title={post.category} />
            <StateTag title={post.postStatus} />
          </View>
          <View style={{ gap: 10 }}>
            <Text style={styles.title}>{post.title}</Text>
            <Text style={{ color: colors.gray3 }}>
              {new Date(post.createAt)
                .toISOString()
                .split('T')[0]
                .replace(/-/g, '.')}
            </Text>
          </View>
          <View style={styles.content}>
            <Text>{post.content}</Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 10,
            }}>
            <Text style={{ fontWeight: 'bold' }}>거래 희망 장소</Text>
            <Text>{post.locationName}</Text>
          </View>
          <MiniMap
            latitude={post.locationLatitude}
            longitude={post.locationLongitude}
          />
        </View>
      </ScrollView>
      <BottomBar
        price={post.price}
        title={post.isMyPost ? '재업로드' : '채팅하기'}
        postId={postId}
        writerId={post.writerId}
      />

      <StateSelector
        postId={postId}
        handleStateActive={handleStateActive}
        visible={stateActive}
        navigation={navigation}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  postImage: {
    width: '100%',
    height: 400,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    backgroundColor: 'red',
  },
  headerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    padding: 20,
  },
  contentContainer: {
    gap: 10,
    padding: 20,
    paddingTop: 0,
  },
  profile: {
    flexDirection: 'row',
    gap: 20,
    paddingVertical: 20,
    borderWidth: 1,
    borderColor: 0,
    borderBottomColor: colors.gray1,
  },
  locationIcon: {
    width: 13,
    height: 25,
    resizeMode: 'contain',
  },
  tags: {
    flexDirection: 'row',
    gap: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  content: {
    minHeight: 150,
    justifyContent: 'center',
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    backgroundColor: '#ccc',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 3,
  },
  activeDot: {
    backgroundColor: '#000',
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 3,
  },
});

export default PostDetailScreen;
