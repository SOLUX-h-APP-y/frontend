import { SafeAreaView, StyleSheet, View } from 'react-native';
import { NavigateHeader } from '../../components/CustomHeaders';
import { PlainInputField } from '../../components/InputFields';
import {
  PERMISSIONS,
  request,
  requestLocationAccuracy,
} from 'react-native-permissions';
import { NaverMapView } from '@mj-studio/react-native-naver-map';
import { useEffect, useRef, useState } from 'react';
import { BottomButton } from '../../components/Buttons';
import {
  requestLocationPermission,
  getCurrentCoordinates,
  searchPlace,
  getCoordinatesFromAddress,
} from '../../services/LocationManager';

function SetLocationScreen({ navigation, route }) {
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [address, setAddress] = useState('');

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

    handleStartLocation();
  }, []);

  const handleStartLocation = async () => {
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

      setLocation({ latitude, longitude });
    } catch (e) {
      console.log('handleLocation Error: ', e);
    }
  };

  const updateLocation = async () => {
    console.log('와이라노', address);
    const { latitude, longitude } = await getCoordinatesFromAddress(address);
    console.log(latitude, longitude);
    setLocation({ latitude, longitude });
  };

  const submitLocation = () => {
    navigation.goBack();
    route.params?.setLocation({
      latitude: location.latitude,
      longitude: location.longitude,
      address,
      actionType: route.params.actionType,
    });
  };

  return (
    <View style={styles.container}>
      <NaverMapView
        style={{ flex: 1 }}
        camera={{
          latitude: location.latitude, // 초기 위도
          longitude: location.longitude, // 초기 경도
          zoom: 15,
        }}
        showsMyLocationButton={true}
      />

      <View style={styles.overlay}>
        <NavigateHeader title="위치 입력" />
        <PlainInputField
          placeholder="원하는 위치를 입력하세요"
          value={address}
          onChangeText={v => setAddress(v)}
          onSubmitEditing={updateLocation}
        />
      </View>
      <View style={styles.button}>
        <BottomButton title="완료하기" onPress={submitLocation} active={true} />
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
