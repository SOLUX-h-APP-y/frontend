import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import filterIcon from '../assets/icons/filterIcon.png';
import { CategoryButton } from './Buttons';

function OptionPanel({ handleOptionActive, searchOptions }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleOptionActive}>
        <Image source={filterIcon} />
      </TouchableOpacity>
      <CategoryButton title={searchOptions.category} active={true} />
      <CategoryButton title={searchOptions.distance} active={true} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});

export default OptionPanel;
