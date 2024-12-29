import { StyleSheet, View } from 'react-native';
import colors from '../styles/Colors';

function ProgressBar({ step }) {
  return (
    <View style={styles.container}>
      {step == 1 ? (
        <View style={styles.step1} />
      ) : (
        <View style={styles.step2} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 5,
    backgroundColor: colors.gray1,
    borderRadius: 50,
  },
  step1: {
    width: '50%',
    height: '100%',
    backgroundColor: colors.themeColor,
    borderRadius: 50,
  },
  step2: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.themeColor,
    borderRadius: 50,
  },
});

export default ProgressBar;
