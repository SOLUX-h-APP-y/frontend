import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import colors from '../styles/Colors';
import {useNavigation} from '@react-navigation/native';
import plusIcon from '../assets/icons/plusIcon.png';

function BottomButton({title, active, onPress}) {
  return (
    <TouchableOpacity
      style={active ? styles.activeBottomButton : styles.inactiveBottomButton}
      onPress={onPress}
      disabled={!active}>
      <Text style={active ? styles.whiteText : styles.grayText}>{title}</Text>
    </TouchableOpacity>
  );
}

function NavigateButton({name}) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.createPostButton}
      onPress={() => navigation.navigate(name)}>
      <Image source={plusIcon} />
    </TouchableOpacity>
  );
}

function CategoryButton({title, active, onPress}) {
  return (
    <TouchableOpacity
      style={
        active ? styles.activeCategoryButton : styles.inactiveCategoryButton
      }
      onPress={onPress}
      disabled={!active}>
      <Text style={active ? styles.whiteText : styles.grayText}>{title}</Text>
    </TouchableOpacity>
  );
}

//active, inactive backgroundColor만 달라서 하나로 통일할지 고민
const styles = StyleSheet.create({
  activeBottomButton: {
    width: '100%',
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    backgroundColor: colors.themeColor,
  },
  inactiveBottomButton: {
    width: '100%',
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    backgroundColor: colors.gray1,
  },
  whiteText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 700,
  },
  grayText: {
    color: colors.gray2,
    fontSize: 16,
    fontWeight: 700,
  },
  createPostButton: {
    position: 'absolute',
    bottom: 50,
    right: 50,
    width: 50,
    height: 50,
    backgroundColor: colors.themeColor,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeCategoryButton: {
    height: 40,
    backgroundColor: colors.themeColor,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    paddingHorizontal: 20,
  },
  inactiveCategoryButton: {
    height: 40,
    backgroundColor: colors.gray1,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    paddingHorizontal: 20,
  },
});

export {BottomButton, NavigateButton, CategoryButton};
