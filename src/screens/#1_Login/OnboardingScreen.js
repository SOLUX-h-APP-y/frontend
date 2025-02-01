import { StyleSheet, View, Image, TouchableOpacity, Dimensions } from 'react-native';
import kakaoStart from '../../assets/images/kakaoStart.png';
import { login } from '@react-native-seoul/kakao-login';
import { useContext } from 'react';
import { API_BASE_URL } from 'react-native-dotenv';
import axios from 'axios';
import { UserContext } from '../../states/UserContext';
import { saveTokens } from '../../services/TokenManager.js';

const { height } = Dimensions.get('window');
const KAKAO_BUTTON_HEIGHT = 110;

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
      console.log(serverResponse.status === 206 ? '회원가입' : '로그인');
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

    navigation.navigate('MainTabs', {
      screen: '홈',
      params: { actionType: 'share' },
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <View style={[styles.logoContainer, { top: (height - KAKAO_BUTTON_HEIGHT) / 2 }]}>
          <Image
            source={require('../../assets/logos/bigThemeLogoKo.png')}
            style={styles.koLogo}
          />
          <Image
            source={require('../../assets/logos/bigThemeLogoEng.png')}
            style={styles.engLogo}
          />
        </View>
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
    justifyContent: 'center',
  },
  logoContainer: {
    position: 'absolute',
    alignItems: 'flex-start',
    paddingLeft: 40,
  },
  koLogo: {
    width: 104,
    height: 46.17,
    resizeMode: 'contain',
  },
  engLogo: {
    width: 209,
    height: 47.66,
    resizeMode: 'contain',
    marginTop: 15,
  },
  buttonContainer: {
    padding: 20, // 버튼 주위 여백
  },
});

export default OnboardingScreen;
