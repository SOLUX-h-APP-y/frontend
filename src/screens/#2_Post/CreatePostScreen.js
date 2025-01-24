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
import { useState } from 'react';
import { NavigateHeader } from '../../components/CustomHeaders.js';
import { useNavigation } from '@react-navigation/native';

const options = {
  distance: ['거리무관', '3km', '5km', '10km'],
  category: ['전체', '헬스', '패션', '엔터', '학업', '기타'],
};

function CreatePostScreen({ route }) {
  const { actionType } = route.params;
  console.log(actionType);

  const [selectedDistance, setSelectedDistance] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedFree, setSelectedFree] = useState(false);

  const handleDistanceSelect = value => {
    console.log(value);
    setSelectedDistance(value);
  };

  const handleCategorySelect = value => {
    console.log(value);
    setSelectedCategory(value);
  };

  const handleFreeSelect = () => {
    setSelectedFree(!selectedFree);
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
            <PlainInputField placeholder="최대 20자 이내의 제목을 입력해주세요" />
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
            <AddPhotoButton />
          </View>
          <View style={styles.section}>
            <Text style={styles.title}>내용</Text>
            <PlainInputField
              placeholder={
                '최소 10자 이상, 최대 300자 이내의 내용을 입력해\n주세요'
              }
              isTextarea={true}
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
            <NavigateButton title="위치입력하기" name="SetLocationScreen" />
          </View>
        </View>
        <BottomButton title="업로드하기" active={false} />
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
});

export default CreatePostScreen;
