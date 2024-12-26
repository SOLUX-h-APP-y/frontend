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
import {useEffect, useState} from 'react';
import {Dropdown} from 'react-native-element-dropdown';

function InputField({
  placeholder,
  value,
  setLocation,
  onChangeText,
  icon,
  isDropDownVisible,
  setIsDropDownVisible,
}) {
  //isDropDownVisible
  //입력한 location에 따라 저장되어 있는 위치들과 일치하는 장소를 나열해줄 것
  //현재 저장되어 있는 위치들이 없기 때문에 location이 입력되면 샘플을 보여줌

  const [selectedItem, setSelectedItem] = useState(null);

  const data = [
    {id: '1', title: '용산구 남영동'},
    {id: '2', title: '용산구 용산2가동'},
    {id: '3', title: '용산구 원효로1동'},
    {id: '4', title: '용산구 청파동'},
  ];

  const handleItemPress = item => {
    setSelectedItem(item.id);
    setLocation(item.title);
  };

  return (
    <View style={styles.container}>
      <View style={isDropDownVisible ? styles.inputWithDropdown : styles.input}>
        {icon != null ? <Image source={icon} /> : null}
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={colors.inputBorderGray}
          value={value}
          onChangeText={onChangeText}
        />
        {/* <Dropdown /> */}
      </View>
      {isDropDownVisible ? (
        <FlatList
          style={styles.dropdown}
          data={data}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => handleItemPress(item)}>
              <View
                style={
                  selectedItem === item.id ? styles.selectedItem : styles.item
                }>
                <Text>{item.title}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  input: {
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

export default InputField;
