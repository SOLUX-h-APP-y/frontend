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

function StateSelector({ handleStateActive, visible }) {
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
          onPress={handleStateActive}>
          <Text>거래중으로 표시</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.textContainer}
          onPress={handleStateActive}>
          <Text>사용중으로 표시</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.textContainer}
          onPress={handleStateActive}>
          <Text>거래완료로 표시</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ padding: 10 }} onPress={handleStateActive}>
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
