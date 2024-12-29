import { StyleSheet, Image, View } from 'react-native';
import colors from '../../styles/Colors';
import whiteLogoKo from '../../assets/logos/whiteLogoKo.png';
import whiteLogoEn from '../../assets/logos/whiteLogoEn.png';
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
      <Image source={whiteLogoKo} />
      <Image source={whiteLogoEn} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.themeColor,
    justifyContent: 'center',
    padding: 30,
    gap: 10,
  },
});

export default SplashScreen;
