import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Modal,
  Image,
} from 'react-native';
import closeIcon from '../assets/icons/closeIcon.png';
import colors from '../styles/Colors';
import api, { setAuthToken } from '../services/api';
import { getTokens } from '../services/TokenManager';

function StateSelector({ postId, visible, handleStateActive, navigation }) {
  const changePostState = async status => {
    try {
      //const tokens = await getTokens(); // 토큰 가져오기
      const response = await api.patch(`/posts/${postId}?status=${status}`);
      console.log(response);
    } catch (e) {
      console.error('Failed to fetch post:', e);
    } finally {
      handleStateActive();
    }
  };

  const DeletePost = async () => {
    try {
      await api.delete(`/posts/${postId}`);
      handleStateActive();
      navigation.navigate('MainTabs', { screen: 'SharerPostListScreen' });
    } catch (e) {
      console.error('Failed to delete post:', e);
    }
  };

  return (
    <Modal transparent={true} visible={visible}>
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={handleStateActive} // 배경을 터치하면 닫힘
      />
      <View style={styles.container}>
        <TouchableOpacity style={styles.closeIcon} onPress={handleStateActive}>
          <Image source={closeIcon} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.textContainer}
          onPress={() => changePostState('거래중')}>
          <Text>거래중으로 표시</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.textContainer}
          onPress={() => changePostState('대여중')}>
          <Text>대여중으로 표시</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.textContainer}
          onPress={() => changePostState('거래완료')}>
          <Text>거래완료로 표시</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ padding: 10 }} onPress={DeletePost}>
          <Text style={styles.deleteText}>글 삭제하기</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // 반투명 회색 배경
    zIndex: 1,
  },
  container: {
    position: 'absolute',
    top: 150,
    right: 30,
    width: 200,
    backgroundColor: 'white',
    borderRadius: 20,
    zIndex: 2,
    padding: 20,
  },
  closeIcon: {
    width: '100%',
    alignItems: 'flex-end',
  },
  textContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray4,
  },
  deleteText: {
    color: colors.error,
  },
});

export default StateSelector;
