import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import colors from '../styles/Colors';

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
    color: colors.white,
    fontSize: 16,
    fontWeight: 700,
  },
  grayText: {
    color: colors.gray2,
    fontSize: 16,
    fontWeight: 700,
  },
});

export {BottomButton};
