import {StyleSheet, TextInput, View, Text} from 'react-native';
import colors from '../styles/Colors';

function InputField({title}) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{title}</Text>
      <TextInput
        style={styles.input}
        placeholder="입력칸"
        placeholderTextColor={colors.inputBorderGray}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
  label: {
    fontWeight: 700,
    fontSize: 20,
    paddingLeft: 10,
  },
  input: {
    borderWidth: 1,
    borderRadius: 100,
    borderColor: colors.inputBorderGray,
    height: 60,
    backgroundColor: colors.inputBackgroundGray,
    paddingLeft: 30,
  },
});

export default InputField;
