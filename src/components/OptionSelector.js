import { StyleSheet, TouchableOpacity, View, Text, Modal } from 'react-native';
import colors from '../styles/Colors';
import { CategoryButton } from './Buttons';
import { useState } from 'react';

function OptionSelector({ handleOptionActive, options, visible }) {
  const [selectedDistance, setSelectedDistance] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleDistanceSelect = value => {
    console.log(value);
    setSelectedDistance(value);
  };

  const handleCategorySelect = value => {
    console.log(value);
    setSelectedCategory(value);
  };

  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={handleOptionActive} // 배경을 터치하면 닫힘
      />
      <View style={styles.container}>
        <Text style={styles.text}>필터 선택</Text>
        <View style={styles.section}>
          <Text style={{ paddingLeft: 10 }}>거리 선택</Text>
          <View style={styles.buttons}>
            {options.distance.map((v, i) => (
              <CategoryButton
                key={i}
                title={v}
                active={selectedDistance === v}
                onPress={() => handleDistanceSelect(v)}
              />
            ))}
          </View>
        </View>
        <View style={styles.section}>
          <Text style={{ paddingLeft: 10 }}>분야 선택</Text>
          <View style={styles.buttons}>
            {options.category.map((v, i) => (
              <CategoryButton
                key={i}
                title={v}
                active={selectedCategory === v}
                onPress={() => handleCategorySelect(v)}
              />
            ))}
          </View>
        </View>
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
    bottom: 0,
    width: '100%',
    gap: 30,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: colors.gray1,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
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

export default OptionSelector;
