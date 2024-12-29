import { StyleSheet, Text, View } from 'react-native';
import InputField from '../../components/InputField.js';

function CreatePostScreen({ route }) {
  const { actionType } = route.params;
  console.log(actionType);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>빌려드려요 글 작성하기</Text>
      <Text>이전 글 불러오기</Text>
      <View>
        <Text style={styles.title}>제목</Text>
        <InputField placeholder="제목을 입력해주세요" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 700,
  },
});

export default CreatePostScreen;
