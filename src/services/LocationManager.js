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

export const searchPlace = async (query, latitude, longitude) => {
  //사라진 API...?
  try {
    const response = await axios.get(
      'https://naveropenapi.apigw.ntruss.com/map-place/v1/search',
      {
        params: {
          query, // 검색할 키워드
          coordinate: `${longitude},${latitude}`, // 기준 좌표 (경도, 위도 순서)
          radius: 5000, // 반경 5km
          display: 5, // 결과 최대 5개
        },
        headers: {
          'X-NCP-APIGW-API-KEY-ID': NAVER_CLIENT_ID,
          'X-NCP-APIGW-API-KEY': NAVER_CLIENT_SECRET,
        },
      },
    );

    console.log('API Response:', response.data);
    // 장소 정보 반환
    return response.data.places;
  } catch (error) {
    console.error('Place Search Error:', error);
    return null;
  }
};
