import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import filterIcon from '../assets/icons/filterIcon.png';
import {CategoryButton} from './Buttons';

const options = {
  distanceOptions: [0, 3, 5, 10],
  categoryOptions: ['전체', '헬스', '패션', '엔터', '학업', '기타'],
};

function FilterPanel() {
  const handleFilter = () => {
    console.log('click');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleFilter}>
        <Image source={filterIcon} />
      </TouchableOpacity>
      <CategoryButton title={'거리무관'} active={true} />
      <CategoryButton title={'전체'} active={true} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
});

export default FilterPanel;
