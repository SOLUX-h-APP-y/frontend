import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import InputField from '../components/InputField.js';
import {BlueButton} from '../components/Buttons.js';

function SignUpScreen() {
  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={styles.container}>
          <InputField title="아이디" />
          <InputField title="비밀번호" />
          <InputField title="비밀번호 확인" />
          <InputField title="비밀번호 확인" />
          <InputField title="비밀번호 확인" />
          <InputField title="비밀번호 확인" />
          <InputField title="비밀번호 확인" />
          <InputField title="비밀번호 확인" />
          <InputField title="비밀번호 확인" />
          <InputField title="비밀번호 확인" />
          <InputField title="비밀번호 확인" />
          <InputField title="비밀번호 확인" />
          <BlueButton title="시작하기" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
    gap: 30,
  },
});

export default SignUpScreen;
