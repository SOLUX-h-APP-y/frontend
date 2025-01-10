import { StyleSheet, TouchableOpacity, View, Text, Modal } from 'react-native';
import colors from '../styles/Colors';
import { CategoryButton } from './Buttons';
import { useState } from 'react';

function StateSelector({ handleStateActive, visible }) {
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={handleStateActive} // 배경을 터치하면 닫힘
      />
      <View style={styles.container}>
        <Text style={styles.text}>필터 선택</Text>
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
    right: 50,
    width: 100,
    gap: 30,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: colors.gray1,
    zIndex: 2,
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontWeight: 700,
    fontSize: 16,
  },
  section: {
    width: '100%',
    gap: 10,
  },
  buttons: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
});

export default StateSelector;
