import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import colors from '../styles/Colors.js';
import { SearchInputField } from './InputFields.js';
import { useState } from 'react';
import fontStyles from '../styles/FontStyles.js';
import { useNavigation } from '@react-navigation/native';
import setLocationIcon from '../assets/icons/setLocationIcon.png';
import {
  requestLocationPermission,
  getCurrentCoordinates,
  getAddressFromCoordinates,
} from '../services/LocationManager.js';
import api, { setAuthToken } from '../services/api.js';

function CustomHeader({
  isSharer,
  address,
  setAddress,
  searchOptions,
  setSearchOptions,
}) {
  const [query, setQuery] = useState('');

  const handleLocation = async () => {
    try {
      await requestLocationPermission();

      const coordinates = await new Promise((resolve, reject) => {
        const result = getCurrentCoordinates();
        if (result) {
          resolve(result);
        } else {
          reject(new Error('좌표 가져오기 실패'));
        }
      });

      const { latitude, longitude } = coordinates;

      const locationName = await getAddressFromCoordinates(latitude, longitude);

      const response = await api.patch(`/users/address`, {
        locationName: locationName,
        locationLatitude: latitude,
        locationLongitude: longitude,
      });

      const dong = await api.get('/users/address/dong');
      setAddress(dong.data.address);
    } catch (e) {
      console.log('handleLocation Error: ', e);
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-between',
          paddingHorizontal: 10,
        }}>
        <View></View>
        <Text style={styles.text}>
          {isSharer ? '빌려드려요 공고' : '빌려주세요 공고'}
        </Text>
        <TouchableOpacity onPress={handleLocation}>
          <Image source={setLocationIcon} />
        </TouchableOpacity>
      </View>
      <SearchInputField
        placeholder={`${address} 근처의 공고를 검색해보세요.`}
        setSearchOptions={setSearchOptions}
        searchOptions={searchOptions}
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
      {post.image ? (
        <Image source={{ uri: post.image }} style={PostHeaderStyles.postImage} />
      ) : null}
      <View style={{ flex: 1, justifyContent: 'center', marginLeft: post.image ? 0 : 15 }}>
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
