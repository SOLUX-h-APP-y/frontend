import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import colors from '../styles/Colors.js';
import { DrondownInputField } from './InputFields.js';
import { useState } from 'react';
import fontStyles from '../styles/FontStyles.js';
import { useNavigation } from '@react-navigation/native';

function CustomHeader({ isShare }) {
  const [query, setQuery] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {isShare ? '빌려드려요 공고' : '빌려주세요 공고'}
      </Text>
      <DrondownInputField
        placeholder={'청파동 근처의 공고를 검색해보세요.'}
        value={query}
        onChangeText={text => setQuery(text)}
      />
    </View>
  );
}

function NavigateHeader({ title, type }) {
  const navigation = useNavigation();
  return (
    <View style={NavigateHeaderstyles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image
          source={
            type
              ? require('../assets/icons/whiteBackIcon.png')
              : require('../assets/icons/backIcon.png')
          }
          style={NavigateHeaderstyles.backIcon}
        />
      </TouchableOpacity>
      <Text style={NavigateHeaderstyles.headerText}>{title}</Text>
      <View style={NavigateHeaderstyles.backIcon}></View>
    </View>
  );
}

function PostHeader({ post }) {
  return (
    <View style={PostHeaderStyles.postDetails}>
      <Image source={{ uri: post.image }} style={PostHeaderStyles.postImage} />
      <View>
        <Text style={PostHeaderStyles.postTitle}>{post.title}</Text>
        <View style={PostHeaderStyles.locationContainer}>
          <Image
            source={require('../assets/icons/locationIcon.png')}
            style={PostHeaderStyles.locationIcon}
          />
          <Text style={PostHeaderStyles.postLocation}>{post.location}</Text>
        </View>
      </View>
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

const NavigateHeaderstyles = StyleSheet.create({
  header: {
    width: '100%',
    height: 56,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  backIcon: {
    width: 8.64,
    height: 14,
  },
  headerText: {
    ...fontStyles.blackSemiBold20,
  },
});

const PostHeaderStyles = StyleSheet.create({
  postDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 76,
    padding: 10,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: colors.gray2,
  },
  postImage: {
    width: 53,
    height: 53,
    borderRadius: 12,
    marginRight: 10,
    marginLeft: 5,
  },
  postTitle: {
    ...fontStyles.lightBlackSemiBold14,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 3,
  },
  locationIcon: {
    width: 9.33,
    height: 13.33,
    marginRight: 5,
  },
  postLocation: {
    ...fontStyles.gray4Medium14,
  },
});

export { CustomHeader, NavigateHeader, PostHeader };
