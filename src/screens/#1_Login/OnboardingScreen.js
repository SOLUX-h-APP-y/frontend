import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import colorLogoKo from '../../assets/logos/colorLogoKo.png';
import colorLogoEn from '../../assets/logos/colorLogoEn.png';
import kakaoStart from '../../assets/images/kakaoStart.png';
import { login } from '@react-native-seoul/kakao-login';
import { useContext } from 'react';
import { API_BASE_URL } from 'react-native-dotenv';
import axios from 'axios';
import { UserContext } from '../../states/UserContext';
import { saveTokens } from '../../services/TokenManager.js';

function OnboardingScreen({ navigation }) {
  const { userInfo, setUserInfo } = useContext(UserContext);

  //카카오로 시작하기 버튼 클릭
  const onPressKakaoStart = async () => {
    try {
      //kakao login 실행 => access token 발행
      const token = await login();

      //server로 전달 후 response 받기
      const serverResponse = await sendAccessTokenToServer(token.accessToken);

      //206 : 회원이 아닌 유저 => signUp, 200 : 회원인 유저 => signIn
      serverResponse.status === 206
        ? moveSetProfileScreen(serverResponse)
        : signIn(serverResponse);
    } catch (e) {
      console.log('login error: ', e);
    }
  };

  //kakao에서 받은 access token을 server로 전달
  const sendAccessTokenToServer = async accessToken => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/kakao`, {
        kakaoAccessToken: accessToken,
      });

      return response;
    } catch (e) {
      console.log('server error: ', e);
    }
  };

  //회원가입
  const moveSetProfileScreen = serverResponse => {
    //server로 부터 kakaoid를 받아 userInfo에 저장
    const kakaoId = serverResponse.data.kakaoId;
    setUserInfo({ ...userInfo, kakaoId });

    //닉네임과 위치를 받기위해 스크린 이동
    navigation.navigate('SetProfileScreen');
  };

  //로그인
  const signIn = serverResponse => {
    saveTokens(
      serverResponse.data.accessToken,
      serverResponse.data.refreshToken,
    );
    navigation.navigate('MainTabs', { screen: 'SharerPostListScreen' });
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={colorLogoKo} />
        <Image source={colorLogoEn} />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={onPressKakaoStart}>
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
