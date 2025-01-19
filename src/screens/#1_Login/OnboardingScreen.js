import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import colorLogoKo from '../../assets/logos/colorLogoKo.png';
import colorLogoEn from '../../assets/logos/colorLogoEn.png';
import kakaoStart from '../../assets/images/kakaoStart.png';

import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { API_BASE_URL, KAKAO_CLIENT_ID, KAKAO_REDIRECT_URL } from '@env';
//import * as KakaoLogins from '@react-native-seoul/kakao-login';
import KakaoLogins, {
  login,
  getProfile,
} from '@react-native-seoul/kakao-login';
import { useState } from 'react';

function OnboardingScreen() {
  const navigation = useNavigation();
  const [result, setResult] = useState();

  const signInWithKakao = async () => {
    try {
      const token = await login();
      //console.log(token.accessToken);
      setResult(JSON.stringify(token.accessToken));
      console.log(result);
      const data = getKakaoProfile();
      console.log(data);
    } catch (e) {
      console.log('login error: ', e);
    }
    // navigation.navigate('SetProfileScreen');
  };

  const getKakaoProfile = async () => {
    return await getProfile()
      .then(result => {
        return result;
      })
      .catch(error => {
        throw error;
      });
  };

  const getUserInfo = async accessToken => {
    try {
      const response = await fetch('https://kapi.kakao.com/v2/user/me', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log('사용자 정보:', data);
        return data;
      } else {
        console.error('사용자 정보 요청 실패:', response.status);
      }
    } catch (error) {
      console.error('에러 발생:', error);
    }
  };

  // const getProgile = async () => {
  //   try {
  //     const profile = await getKakaoProgile();

  //   }
  // }

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={colorLogoKo} />
        <Image source={colorLogoEn} />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={signInWithKakao}>
          <Image source={kakaoStart} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'space-between',
  },
  logoContainer: {
    flex: 1, // 화면에서 로고가 차지하는 공간
    justifyContent: 'center', // 로고를 세로 중앙에 배치
    gap: 10,
    padding: 30,
  },
  buttonContainer: {
    padding: 20, // 버튼 주위 여백
  },
});

export default OnboardingScreen;
