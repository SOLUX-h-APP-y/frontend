import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  Modal,
  registerCallableModule,
} from 'react-native';
import colors from '../styles/Colors';
import {useEffect} from 'react';
import {Dropdown} from 'react-native-element-dropdown';

function InputField({
  placeholder,
  value,
  onChangeText,
  icon,
  isDropDownVisible,
  setIsDropDownVisible,
}) {
  //isDropDownVisible
  //입력한 location에 따라 저장되어 있는 위치들과 일치하는 장소를 나열해줄 것
  //현재 저장되어 있는 위치들이 없기 때문에 location이 입력되면 샘플을 보여줌

  return (
    <View style={styles.container}>
      {icon != null ? <Image source={icon} /> : null}
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={colors.inputBorderGray}
        value={value}
        onChangeText={onChangeText}
      />
      {/* <Dropdown /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', // 아이콘과 TextInput을 가로로 정렬
    alignItems: 'center', // 수직 가운데 정렬
    height: 40,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: colors.gray2,
    backgroundColor: colors.white,
    paddingLeft: 20,
    gap: 10,
  },
});

export default InputField;
