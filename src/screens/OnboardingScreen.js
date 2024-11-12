import { SafeAreaView, StatusBar, StyleSheet, View, Text } from 'react-native';
import Logo from '../components/Logo';
import { BlueButton, WhiteButton } from '../components/Buttons';
import colors from '../styles/Colors';
import { fontGray } from '../styles/FontStyles';

function OnboardingScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      {/* <StatusBar /> */}
      <View style={styles.section1}>
        <Logo />
      </View>
      <View style={styles.section2}>
        {/* {<Button title="go test" onPress={() => navigation.navigate('Test')} />} */}
        <BlueButton title={'카카오로 시작하기'} />
        <WhiteButton title={'로그인'} navigation={navigation} />
        <Text style={[fontGray.text, { borderBottomWidth: 1 }]}>회원가입</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.backgroundGray,
  },
  section1: {
    flex: 2,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    //borderWidth: 2,
  },
  section2: {
    flex: 1,
    gap: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    // borderWidth: 2,
  },
});

export default OnboardingScreen;
