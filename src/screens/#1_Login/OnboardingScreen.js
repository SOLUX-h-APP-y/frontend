import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import colorLogoKo from '../../assets/logos/colorLogoKo.png';
import colorLogoEn from '../../assets/logos/colorLogoEn.png';
import kakaoStart from '../../assets/images/kakaoStart.png';
import {useNavigation} from '@react-navigation/native';

function OnboardingScreen() {
  const navigation = useNavigation();

  const moveKakaoLogin = () => {
    //kakaoLogin 수행 후 SetProfileScreen으로 이동

    navigation.navigate('SetProfileScreen');
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={colorLogoKo} />
        <Image source={colorLogoEn} />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={moveKakaoLogin}>
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
