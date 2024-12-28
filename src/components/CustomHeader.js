import {Image, StyleSheet, Text, View} from 'react-native';
import whiteLogoEn from '../assets/logos/whiteLogoEn.png';
import colors from '../styles/Colors';
import InputField from './InputField.js';
import {useState} from 'react';

function CustomHeader({isSharer}) {
  const [query, setQuery] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {isSharer ? '빌려드려요 공고' : '빌려주세요 공고'}
      </Text>
      <InputField
        placeholder={'청파동 근처의 공고를 검색해보세요.'}
        value={query}
        onChangeText={text => setQuery(text)}
        icon={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: colors.themeColor,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
    gap: 20,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  text: {
    fontSize: 20,
    fontWeight: 700,
    color: 'white',
  },
});
export default CustomHeader;
