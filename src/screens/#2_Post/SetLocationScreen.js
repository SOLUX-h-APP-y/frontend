import { SafeAreaView, StyleSheet, View } from 'react-native';
import { NavigateHeader } from '../../components/CustomHeaders';
import { PlainInputField } from '../../components/InputFields';
import {
  PERMISSIONS,
  request,
  requestLocationAccuracy,
} from 'react-native-permissions';
import { NaverMapView } from '@mj-studio/react-native-naver-map';
import { useEffect, useRef } from 'react';
import { BottomButton } from '../../components/Buttons';
import { useNavigation } from '@react-navigation/native';
import {
  requestLocationPermission,
  getCurrentCoordinates,
  searchPlace,
} from '../../services/LocationManager';

function SetLocationScreen({ navigation }) {
  const mapRef = useRef(null);

  useEffect(() => {
    if (Platform.OS === 'ios') {
      request(PERMISSIONS.IOS.LOCATION_ALWAYS).then(status => {
        console.log(`Location request status: ${status}`);
        if (status === 'granted') {
          requestLocationAccuracy({
            purposeKey: 'NaverMapPreciseLocation', // 아까 your purpose key에 있던 키값
          })
            .then(accuracy => {
              console.log(`Location accuracy is: ${accuracy}`);
            })
            .catch(e => {
              console.error(`Location accuracy request has been failed: ${e}`);
            });
        }
      });
    }
  }, []);

  // const handleLocation = () => {
  //   navigation.goBack();
  //   console.log('위치 저장하고 CreatePostScreen으로 돌아가기');
  // };

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

      console.log('현재 좌표:', latitude, longitude);

      const places = await searchPlace('카페', 37.5665, 126.978);
      console.log('검색된 장소:', places);
    } catch (e) {
      console.log('handleLocation Error: ', e);
    }
  };

  return (
    <View style={styles.container}>
      <NaverMapView
        ref={mapRef}
        style={{ flex: 1 }}
        camera={{
          latitude: 37.5326, // 초기 위도
          longitude: 126.9904, // 초기 경도
          zoom: 15,
        }}
        showsMyLocationButton={true}
      />

      <View style={styles.overlay}>
        <NavigateHeader title="위치 입력" />
        <PlainInputField placeholder="원하는 위치를 입력하세요" />
      </View>
      <View style={styles.button}>
        <BottomButton title="완료하기" onPress={handleLocation} active={true} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    position: 'absolute', // 지도 위에 겹치도록 설정
    top: 20, // 상단 여백
    left: 0,
    right: 0,
    zIndex: 10, // 지도보다 위에 표시
    paddingHorizontal: 20,
  },
  button: {
    position: 'absolute', // 지도 위에 겹치도록 설정
    bottom: 20, // 상단 여백
    left: 0,
    right: 0,
    zIndex: 10, // 지도보다 위에 표시
    paddingHorizontal: 20,
  },
});

export default SetLocationScreen;
