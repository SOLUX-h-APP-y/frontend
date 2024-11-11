import {StyleSheet, View, Text} from 'react-native';
import Logo from '../components/Logo';
import DefaultButton from '../components/DefaultButton';
import colors from '../styles/Colors';

function OnboardingScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.section1}>
        <Logo />
      </View>
      <View style={styles.section2}>
        {/* {<Button title="go test" onPress={() => navigation.navigate('Test')} />} */}
        <DefaultButton title={'카카오로 시작하기'} color={colors.buttonBlue} />
        <DefaultButton title={'로그인'} color={'white'} />
        <Text style={{color: colors.textGray, borderBottomWidth: 1}}>
          회원가입
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    //borderWidth: 2,
  },
});

export default OnboardingScreen;
