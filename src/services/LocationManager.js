import axios from 'axios';
import { NAVER_CLIENT_ID, NAVER_CLIENT_SECRET } from 'react-native-dotenv';
import Geolocation from 'react-native-geolocation-service';

//위치 권한 요청
export const requestLocationPermission = async () => {
  if (Platform.OS === 'ios') {
    return true; // iOS는 별도 권한 요청이 필요 없음 (Info.plist 설정만 하면 됨)
  } else {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    } else {
      Alert.alert(
        'Permission Denied',
        'Location permission is required to use this feature.',
      );
    }
  }
};

//현재 위도, 경도 받기
export const getCurrentCoordinates = () => {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;

        resolve({ latitude, longitude });
      },
      error => {
        reject('Error', `위치를 가져오는데 실패했습니다 : ${error.message}`);
      },
      //enableHighAccuracy : 위치 정확도를 위해 GPS 사용, timeout : 15초 안에 위치를 가져오지 못하면 에러, maximunAge : 10초 내의 캐시된 위치를 허용
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  });
};

//위도, 경도를 받아 주소로 변환
export const getAddressFromCoordinates = async (latitude, longitude) => {
  try {
    const response = await axios.get(
      'https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc',
      {
        params: {
          coords: `${longitude},${latitude}`, // 경도, 위도 순서
          orders: 'addr', // 주소 형식 (addr, roadaddr 등)
          output: 'json',
        },
        headers: {
          'X-NCP-APIGW-API-KEY-ID': NAVER_CLIENT_ID,
          'X-NCP-APIGW-API-KEY': NAVER_CLIENT_SECRET,
        },
      },
    );
    const result = response.data.results;
    if (result && result.length > 0) {
      // 주소 데이터 반환
      return (
        result[0].region.area1.name +
        ' ' +
        result[0].region.area2.name +
        ' ' +
        result[0].region.area3.name
      );
    } else {
      throw new Error('No address found');
    }
  } catch (error) {
    console.error('Reverse Geocoding Error:', error);
    return null;
  }
};

export const getCoordinatesFromAddress = async address => {
  try {
    // 네이버 Geocoding API URL
    const url = `https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=${encodeURIComponent(
      address,
    )}`;

    // API 요청 헤더 설정
    const headers = {
      'X-NCP-APIGW-API-KEY-ID': NAVER_CLIENT_ID,
      'X-NCP-APIGW-API-KEY': NAVER_CLIENT_SECRET,
    };

    // API 요청
    const response = await axios.get(url, { headers });
    response.data.addresses[0].y;
    // 응답 데이터 확인
    if (response.data.status === 'OK' && response.data.addresses.length > 0) {
      const { x: longitude, y: latitude } = response.data.addresses[0]; // ✅ 올바른 필드 사용
      return { latitude, longitude };
    } else {
      throw new Error('주소 변환 실패');
    }
  } catch (error) {
    console.error('Geocoding Error:', error.message);
    return null;
  }
};
