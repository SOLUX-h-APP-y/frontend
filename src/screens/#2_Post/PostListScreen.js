import { StyleSheet, View, FlatList } from 'react-native';
import PostPreviewItem from '../../components/PostPreviewItem';
import { CustomHeader } from '../../components/CustomHeaders';
import sampleImage from '../../assets/images/sample.png';
import { useEffect, useState } from 'react';
import { CreatePostButton } from '../../components/Buttons';
import OptionPanel from '../../components/OptionPanel';
import OptionSelector from '../../components/OptionSelector';
import { getTokens } from '../../services/TokenManager.js';
import { API_BASE_URL } from 'react-native-dotenv';
import api, { setAuthToken } from '../../services/api.js';

const options = {
  distance: ['거리무관', '3km', '5km', '10km'],
  category: ['전체', '헬스', '패션', '엔터', '학업', '기타'],
};

function PostListScreen({ route }) {
  const { actionType } = route.params;
  const [optionsActive, setOptionActive] = useState(false);
  const [searchOptions, setSearchOtions] = useState({
    distance: '거리무관',
    category: '전체',
    keyword: '',
  });
  const [posts, setPosts] = useState([]);
  const [address, setAddress] = useState();

  const handleOptionActive = () => {
    setOptionActive(!optionsActive);
  };

  const fetchPosts = async () => {
    try {
      const response = await api.get(
        `/posts?type=${actionType === 'share' ? 'share' : 'borrow'}&category=${
          searchOptions.category
        }&radius=${searchOptions.distance}&keyword=${searchOptions.keyword}`,
      );

      setPosts(response.data);

      const address = await api.get('/users/address/dong');
      setAddress(address.data.address);
    } catch (e) {
      console.error('Failed to fetch posts:', e);
    }
  };

  useEffect(() => {
    const initialize = async () => {
      try {
        const tokens = await getTokens(); // 토큰 가져오기
        if (tokens && tokens.accessToken) {
          setAuthToken(tokens.accessToken); // Axios 헤더에 토큰 설정
          await fetchPosts(tokens.accessToken); // Post 목록 요청
        }
      } catch (err) {
        console.error('Initialization error:', err); // 에러 처리
      } finally {
        console.log('Initialization complete'); // 최종 처리
      }
    };

    initialize(); // 비동기 함수 실행
  }, [searchOptions]);

  return (
    <View style={styles.container}>
      <CustomHeader
        isSharer={actionType == 'share' ? true : false}
        address={address}
        setAddress={setAddress}
        searchOptions={searchOptions}
        setSearchOptions={setSearchOtions}
      />
      <View style={styles.listContainer}>
        <OptionPanel
          handleOptionActive={handleOptionActive}
          searchOptions={searchOptions}
        />
        <FlatList
          contentContainerStyle={styles.content}
          data={posts}
          renderItem={({ item, index }) => (
            <PostPreviewItem id={index} data={item} />
          )}
        />
      </View>

      <OptionSelector
        handleOptionActive={handleOptionActive}
        options={options}
        visible={optionsActive}
        searchOptions={searchOptions}
        setSearchOptions={setSearchOtions}
      />

      <CreatePostButton name="CreatePostScreen" actionType={actionType} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  listContainer: {
    flex: 1,
    gap: 10,
    paddingHorizontal: 20,
    paddingTop: 14,
  },
  content: {
    gap: 10,
    paddingBottom: 20,
  },
});

export default PostListScreen;
