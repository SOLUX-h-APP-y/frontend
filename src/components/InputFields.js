import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  Modal,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import colors from '../styles/Colors';
import { useEffect, useState } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import searchIcon from '../assets/icons/searchIcon.png';
import fontStyles from '../styles/FontStyles';

function SearchInputField({ placeholder, searchOptions, setSearchOptions }) {
  const [text, setText] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.input}>
        <Image source={searchIcon} />
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={colors.inputBorderGray}
          value={text}
          onChangeText={value => setText(value)}
          onSubmitEditing={() =>
            setSearchOptions({ ...searchOptions, keyword: text })
          }
        />
      </View>
    </View>
  );
}

function OutputField({ placeholder, value }) {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={colors.inputBorderGray}
        value={value}
        style={[styles.input, { textAlign: 'center' }]}
        editable={false}
      />
    </View>
  );
}

function PlainInputField({
  placeholder,
  value,
  onChangeText,
  isTextarea,
  inactive,
  keyboardType,
}) {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={colors.inputBorderGray}
        value={value}
        onChangeText={onChangeText}
        style={
          isTextarea
            ? styles.textarea
            : inactive
            ? styles.inactiveInput
            : styles.input
        }
        multiline={isTextarea ? true : false}
        editable={inactive ? false : true}
        keyboardType={keyboardType}
      />
    </View>
  );
}

const InputFieldWithClear = ({
  label,
  value,
  onChangeText,
  placeholder,
  onClear,
}) => (
  <View style={InputFieldWithClearStyles.inputContainer}>
    <Text style={InputFieldWithClearStyles.label}>{label}</Text>
    <View style={InputFieldWithClearStyles.inputWithClear}>
      <TextInput
        style={InputFieldWithClearStyles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
      />
      {value.length > 0 && (
        <TouchableOpacity
          onPress={onClear}
          style={InputFieldWithClearStyles.clearButton}>
          <Image
            source={require('../assets/icons/clearIcon.png')}
            style={InputFieldWithClearStyles.clearIcon}
          />
        </TouchableOpacity>
      )}
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center', // 수직 가운데 정렬
    height: 40,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: colors.gray2,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    gap: 10,
  },
  textarea: {
    height: 150,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: colors.gray2,
    backgroundColor: 'white',
    padding: 20,
    gap: 10,
  },
  inactiveInput: {
    alignItems: 'center', // 수직 가운데 정렬
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.gray1,
    paddingLeft: 20,
    color: colors.gray2,
    gap: 10,
  },
  inputWithDropdown: {
    flexDirection: 'row', // 아이콘과 TextInput을 가로로 정렬
    alignItems: 'center', // 수직 가운데 정렬
    height: 40,
    borderWidth: 1,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    borderColor: colors.gray2,
    backgroundColor: 'white',
    paddingLeft: 20,
    gap: 10,
  },
  dropdown: {
    position: 'absolute',
    top: 40,
    width: '100%',
    borderWidth: 1,
    borderTopWidth: 0,
    borderBottomLeftRadius: 20,
    borderColor: colors.gray2,
    backgroundColor: 'white',
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    zIndex: 1,
  },
  item: {
    padding: 10,
    paddingLeft: 45,
  },
  selectedItem: {
    backgroundColor: colors.gray1,
    padding: 10,
    paddingLeft: 45,
  },
});

const InputFieldWithClearStyles = StyleSheet.create({
  inputContainer: {
    marginBottom: 20,
    marginHorizontal: 16,
  },
  label: {
    ...fontStyles.blackSemiBold20,
    marginBottom: 8,
  },
  inputWithClear: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: colors.gray2,
    borderRadius: 30,
    paddingHorizontal: 20,
  },
  input: {
    flex: 1,
    height: 48,
    ...fontStyles.lightBlackMedium14,
  },
  clearButton: {
    padding: 0,
  },
  clearIcon: {
    width: 20,
    height: 20,
  },
});

export { SearchInputField, PlainInputField, InputFieldWithClear, OutputField };
