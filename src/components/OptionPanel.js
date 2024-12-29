import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import filterIcon from '../assets/icons/filterIcon.png';
import { CategoryButton } from './Buttons';

function OptionPanel({ handleOptionActive }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleOptionActive}>
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

export default OptionPanel;
