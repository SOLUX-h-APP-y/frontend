import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import whiteLogoEn from '../assets/logos/whiteLogoEn.png';
import colors from '../styles/Colors';
import { DrondownInputField } from './InputFields.js';
import { useState } from 'react';
import fontStyles from '../styles/FontStyles.js';

function CustomHeader({ isSharer }) {
  const [query, setQuery] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {isSharer ? '빌려드려요 공고' : '빌려주세요 공고'}
      </Text>
      <DrondownInputField
        placeholder={'청파동 근처의 공고를 검색해보세요.'}
        value={query}
        onChangeText={text => setQuery(text)}
      />
    </View>
  );
}

function ChatHeader({ navigation, title }) {
  return (
    <View style={ChatHeaderStyles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={ChatHeaderStyles.backButton}>
        <Image source={require('../assets/icons/backIcon.png')} style={ChatHeaderStyles.backIcon} />
      </TouchableOpacity>
      <Text style={ChatHeaderStyles.headerText}>{title}</Text>
    </View>
  );
};

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
};

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

const ChatHeaderStyles = StyleSheet.create({
  header: {
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.gray2,
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 15,
    top: 23,
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

export { CustomHeader, ChatHeader, PostHeader };
