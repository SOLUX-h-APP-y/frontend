import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { PlainInputField } from '../../components/InputFields.js';
import {
  BottomButton,
  CategoryButton,
  FreeButton,
  NavigateButton,
} from '../../components/Buttons.js';
import colors from '../../styles/Colors.js';
import { AddPhotoButton } from '../../components/Buttons.js';
import { useEffect, useState } from 'react';
import { NavigateHeader } from '../../components/CustomHeaders.js';
import { getTokens } from '../../services/TokenManager.js';
import { launchImageLibrary } from 'react-native-image-picker';
import { Image } from 'react-native-animatable';
import axios from 'axios';
import { API_BASE_URL } from 'react-native-dotenv';
import api from '../../services/api.js';

const options = {
  distance: ['거리무관', '3km', '5km', '10km'],
  category: ['헬스', '패션', '엔터', '학업', '기타'],
};

function CreatePostScreen({ navigation, route }) {
  const { actionType } = route.params;
  const { postId } = route.params;

  const [isPostValid, setIsPostValid] = useState(false);

  const [post, setPost] = useState({
    title: '',
    content: '',
    price: null,
    type: null,
    category: '',
    distance: '',
    locationName: '',
    locationLatitude: null,
    locationLongitude: null,
    images: [],
  });

  const [selectedDistance, setSelectedDistance] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedFree, setSelectedFree] = useState(false);

  const handleDistanceSelect = distance => {
    setSelectedDistance(distance);
    setPost({ ...post, distance });
  };

  const handleCategorySelect = category => {
    console.log(category);
    setSelectedCategory(category);
    setPost({ ...post, category });
  };

  const handleFreeSelect = () => {
    setPost({ ...post, price: 0 });
    setSelectedFree(!selectedFree);
  };

  const onChangeTitle = title => {
    console.log(title);
    setPost({ ...post, title });
  };

  const onChangeContent = content => {
    setPost({ ...post, content });
  };

  const onChangePrice = price => {
    const onlyNumbers = price.replace(/\D/g, ''); // 숫자 이외의 문자 제거
    setPost({ ...post, price: onlyNumbers });
  };

  const onChangeImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        maxWidth: 100,
        maxHeight: 100,
        quality: 0.8,
      },
      response => {
        if (response.didCancel) {
          console.log('사용자가 이미지 선택을 취소했습니다.');
        } else if (response.errorCode) {
          console.error('이미지 선택 에러:', response.errorMessage);
        } else if (response.assets && response.assets.length > 0) {
          const selectedImages = response.assets.map(asset => asset.uri);
          setPost(prevPost => ({
            ...prevPost,
            images: [...(prevPost.images || []), ...selectedImages], // ✅ 기존 배열에 추가
          }));
        }
      },
    );
  };

  const setLocation = newLocation => {
    setPost(prevPost => ({
      ...prevPost,
      locationName: newLocation.address,
      locationLatitude: newLocation.latitude,
      locationLongitude: newLocation.longitude,
      type: newLocation.actionType,
    }));
  };

  useEffect(() => {
    const isValid =
      post.title.trim() !== '' &&
      post.content.trim() !== '' &&
      post.price !== null &&
      post.category.trim() !== '' &&
      post.distance.trim() !== '' &&
      post.locationName.trim() !== '' &&
      post.locationLatitude !== null &&
      post.locationLongitude !== null;

    setIsPostValid(isValid);

    console.log('post', post);
  }, [post]);

  useEffect(() => {
    const fetchPostData = async () => {
      if (!postId) {
        // postId가 없으면 초기화 (유저가 직접 채워넣어야 함)
        setPost({
          title: '',
          content: '',
          price: null,
          type: actionType,
          category: '',
          distance: '',
          locationName: '',
          locationLatitude: null,
          locationLongitude: null,
          images: [],
        });
        return;
      }

      try {
        const response = await api.get(`/posts/${postId}`);
        const postData = response.data;

        console.log('Fetched postData:', postData);

        setPost(prevPost => ({
          ...prevPost,
          title: postData.title || '',
          content: postData.content || '',
          price: postData.price !== undefined ? postData.price.toString() : '',
          category: postData.category || '',
          distance: postData.distance || '',
          locationName: postData.locationName || '',
          locationLatitude: postData.locationLatitude ?? null,
          locationLongitude: postData.locationLongitude ?? null,
          images: postData.imageUrls
            ? postData.imageUrls.map(url => ({ uri: url }))
            : [],
          type: postData.type ?? actionType,
        }));

        // 선택된 버튼 상태도 동기화
        setSelectedDistance(postData.distance || null);
        setSelectedCategory(postData.category || null);
        setSelectedFree(postData.price === 0); // 가격이 0이면 무료 버튼 활성화
      } catch (error) {
        console.error('게시글 불러오기 오류:', error);
        alert('게시글을 불러오는데 실패했습니다.');
      }
    };

    fetchPostData();
  }, [postId]); // postId가 변경될 때 실행

  useEffect(() => {
    if (actionType) {
      setPost(prevPost => ({
        ...prevPost,
        type: actionType,
      }));
    }
  }, [actionType]);

  const uploadPost = async () => {
    if (postId) {
      console.log('재업로드');
      try {
        const formData = new FormData();

        formData.append('title', post.title);
        formData.append('content', post.content);
        formData.append('price', post.price);
        formData.append('type', post.type);
        formData.append('category', post.category);
        formData.append('distance', post.distance);
        formData.append('locationName', post.locationName);
        formData.append('locationLatitude', post.locationLatitude);
        formData.append('locationLongitude', post.locationLongitude);

        post.images.forEach((img, index) => {
          if (!img || !img.uri) return; // ✅ 이미지 데이터가 없으면 스킵

          const file = {
            uri:
              Platform.OS === 'android'
                ? img.uri
                : img.uri.replace('file://', ''), // ✅ iOS "file://" 제거
            name: `image_${index}.jpg`,
            type: 'image/jpeg',
          };
          formData.append('images', file);
        });

        const tokens = await getTokens(); // 토큰 가져오기

        const response = await axios.post(
          `${API_BASE_URL}/posts/${postId}/reupload`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${tokens.accessToken}`,
            },
          },
        );
        console.log(response);

        navigation.navigate('MainTabs', {
          screen: '홈',
          params: { actionType: 'share' },
        });
      } catch (error) {
        console.error('재업로드 오류:', error);
        alert('글을 수정한 후 업로드 해주세요');
      }
    } else {
      console.log('새로업로드');
      try {
        const formData = new FormData();

        formData.append('title', post.title);
        formData.append('content', post.content);
        formData.append('price', post.price);
        formData.append('type', post.type);
        formData.append('category', post.category);
        formData.append('distance', post.distance);
        formData.append('locationName', post.locationName);
        formData.append('locationLatitude', post.locationLatitude);
        formData.append('locationLongitude', post.locationLongitude);

        post.images.forEach((img, index) => {
          if (!img || !img.uri) return; // ✅ 이미지 데이터가 없으면 스킵

          const file = {
            uri:
              Platform.OS === 'android'
                ? img.uri
                : img.uri.replace('file://', ''), // ✅ iOS "file://" 제거
            name: `image_${index}.jpg`,
            type: 'image/jpeg',
          };
          formData.append('images', file);
        });

        const tokens = await getTokens(); // 토큰 가져오기

        await axios.post(`${API_BASE_URL}/posts`, formData, {
          headers: {
            Authorization: `Bearer ${tokens.accessToken}`,
          },
        });

        navigation.navigate('MainTabs', {
          screen: '홈',
          params: { actionType: 'share' },
        });
      } catch (error) {
        console.error('업로드 오류:', error);
        alert('업로드 실패!');
      }
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollview}>
        <View style={styles.contentContainer}>
          <NavigateHeader
            title={
              actionType === 'share'
                ? '빌려드려요 글 작성하기'
                : '빌려주세요 글 작성하기'
            }
          />

          <NavigateButton title="이전 글 불러오기" name="MyPostList" />
          <View style={styles.section}>
            <Text style={styles.title}>제목</Text>
            <PlainInputField
              placeholder="최대 20자 이내의 제목을 입력해주세요"
              value={post.title}
              onChangeText={onChangeTitle}
            />
          </View>
          <View style={styles.section}>
            <View
              style={{
                flexDirection: 'row',
                gap: 20,
                alignItems: 'center',
              }}>
              <Text style={styles.title}>가격</Text>
              {actionType === 'share' ? (
                <FreeButton active={selectedFree} onPress={handleFreeSelect} />
              ) : null}
            </View>
            <PlainInputField
              placeholder="원하는 가격을 입력해주세요"
              inactive={selectedFree ? true : false}
              keyboardType="number-pad"
              value={post.price}
              onChangeText={onChangePrice}
            />
            <Text style={{ color: colors.themeColor, paddingLeft: 5 }}>
              1일 기준 대여료를 입력해주세요
            </Text>
          </View>
          <View style={styles.section}>
            <View
              style={{
                flexDirection: 'row',
                gap: 5,
                alignItems: 'flex-end',
              }}>
              <Text style={styles.title}>사진</Text>
              <Text style={{ color: colors.themeColor }}>0/10</Text>
            </View>
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <AddPhotoButton onPress={onChangeImage} />
              {post.images &&
                post.images.map((img, index) => (
                  <Image
                    key={index}
                    source={{ uri: img }}
                    style={styles.image}
                  />
                ))}
            </View>
          </View>
          <View style={styles.section}>
            <Text style={styles.title}>내용</Text>
            <PlainInputField
              placeholder={
                '최소 10자 이상, 최대 300자 이내의 내용을 입력해\n주세요'
              }
              isTextarea={true}
              value={post.content}
              onChangeText={onChangeContent}
            />
          </View>
          <View style={styles.section}>
            <Text style={styles.title}>거리선택</Text>
            <View style={styles.buttons}>
              {options.distance.map((v, i) => (
                <CategoryButton
                  title={v}
                  key={i}
                  active={selectedDistance === v}
                  onPress={() => handleDistanceSelect(v)}
                />
              ))}
            </View>
          </View>
          <View style={styles.section}>
            <Text style={styles.title}>분야선택</Text>
            <View style={styles.buttons}>
              {options.category.map((v, i) => (
                <CategoryButton
                  title={v}
                  key={i}
                  active={selectedCategory === v}
                  onPress={() => handleCategorySelect(v)}
                />
              ))}
            </View>
          </View>

          <View style={styles.leftSection}>
            <Text style={styles.title}>거래희망장소</Text>
            <NavigateButton
              title="위치입력하기"
              name="SetLocationScreen"
              params={{ setLocation, actionType: actionType }}
            />
          </View>
        </View>
        <BottomButton
          title="업로드하기"
          active={isPostValid}
          onPress={uploadPost}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollview: {
    padding: 20,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    gap: 30,
    marginBottom: 60,
  },
  section: {
    gap: 10,
    width: '100%',
  },
  leftSection: {
    gap: 10,
    width: '100%',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 20,
    fontWeight: 700,
  },
  buttons: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CreatePostScreen;
