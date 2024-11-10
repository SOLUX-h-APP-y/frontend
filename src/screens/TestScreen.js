import {StyleSheet, Text, View} from 'react-native';

function TestScreen() {
  return (
    <View>
      <Text style={styles.text}>테스트 화면</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 50,
  },
});

export default TestScreen;
