import { StyleSheet, Text, View } from 'react-native';
import InputField from '../../components/InputField.js';
import { NavigateButton } from '../../components/Buttons.js';
import colors from '../../styles/Colors.js';

function CreatePostScreen({ route }) {
  const { actionType } = route.params;
  console.log(actionType);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>빌려드려요 글 작성하기</Text>
      <NavigateButton title="이전 글 불러오기" name="BorrowerPostListScreen" />
      <View style={styles.section}>
        <Text style={styles.title}>제목</Text>
        <InputField placeholder="제목을 입력해주세요" />
      </View>
      <View style={styles.section}>
        <Text style={styles.title}>가격</Text>
        <InputField placeholder="원하는 가격을 입력해주세요" />
        <Text style={{ color: colors.themeColor, paddingLeft: 5 }}>
          1일 기준 대여료를 입력해주세요
        </Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.title}>사진</Text>
        <InputField placeholder="제목을 입력해주세요" />
      </View>
      <View style={styles.section}>
        <Text style={styles.title}>거리선택</Text>
        <InputField placeholder="제목을 입력해주세요" />
      </View>
      <View style={styles.section}>
        <Text style={styles.title}>분야선택</Text>
        <InputField placeholder="제목을 입력해주세요" />
      </View>
      <View style={styles.section}>
        <Text style={styles.title}>공고기간</Text>
        <InputField placeholder="제목을 입력해주세요" />
      </View>
      <View style={styles.section}>
        <Text style={styles.title}>거래희망장소</Text>
        <InputField placeholder="제목을 입력해주세요" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 20,
    paddingTop: 50,
  },

  section: {
    gap: 10,
    width: '100%',
  },
  title: {
    fontSize: 20,
    fontWeight: 700,
  },
});

export default CreatePostScreen;
