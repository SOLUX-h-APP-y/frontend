import { StyleSheet, ScrollView, View } from 'react-native';
import PostPreviewItem from '../../components/PostPreviewItem';
import { NavigateHeader } from '../../components/CustomHeaders';
import { useEffect, useState } from 'react';
import api from '../../services/api';
import { Text } from 'react-native-animatable';

function MyPostList() {
  const [myPosts, setMyPosts] = useState([]); // 초기 상태를 []로 설정

  const fetchMyPosts = async () => {
    try {
      const response = await api.get(`/users/me/posts`);
      setMyPosts(response.data);
      console.log('Fetched posts:', response.data); // ⚠️ 상태 변경 후 콘솔 출력
    } catch (e) {
      console.error('Failed to fetch posts:', e);
    }
  };

  useEffect(() => {
    fetchMyPosts(); // 처음 한 번만 실행되도록 설정
  }, []); // ⚠️ 빈 배열을 넣어 한 번만 실행되게 함

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ gap: 20, padding: 20 }}>
        <NavigateHeader title={'내글보기'} />
        {myPosts.length > 0 ? (
          myPosts.map((v, i) => <PostPreviewItem key={i} data={v} />)
        ) : (
          <View style={{ alignItems: 'center', marginTop: 20 }}>
            <Text>게시물이 없습니다.</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default MyPostList;
