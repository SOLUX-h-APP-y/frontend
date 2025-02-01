import { StyleSheet, Image, View } from 'react-native';
import colors from '../../styles/Colors';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';

function SplashScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    //2초 후 OnboardingScreen으로 이동
    const timer = setTimeout(() => {
      navigation.replace('OnboardingScreen');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/logos/bigWhiteLogoKo.png')}
          style={styles.koLogo}
        />
        <Image
          source={require('../../assets/logos/bigWhiteLogoEng.png')}
          style={styles.engLogo}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.themeColor,
    justifyContent: 'center',
    paddingLeft: 40,
  },
  logoContainer: {
    alignItems: 'flex-start',
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
});

export default SplashScreen;
