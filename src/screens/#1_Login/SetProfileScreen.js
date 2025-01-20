import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import ProgressBar from '../../components/ProgressBar.js';
import {
  DrondownInputField,
  PlainInputField,
} from '../../components/InputFields.js';
import soe from '../../assets/images/soe.png';
import { useNavigation } from '@react-navigation/native';
import { BottomButton } from '../../components/Buttons.js';
import location from '../../assets/images/location.png';

function SetProfileScreen() {
  const navigation = useNavigation();

  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState({ name: '', location: '' });
  const [isDropDownVisible, setIsDropDownVisible] = useState(false);

  const nextStep = () => {
    console.log(profile);
    step == 1
      ? setStep(2)
      : navigation.navigate('MainTabs', { screen: 'SharerPostListScreen' });
    //navigate 하기 전에 DB에 user 정보 보내기
  };

  const handleName = text => {
    setProfile(prev => ({
      ...prev,
      name: text.trim(),
      //trim()으로 공백 입력 방지
      //이후 글자수 제한도 필요
    }));
    console.log(profile.name);
  };
  const handleLocation = text => {
    setProfile(prev => ({ ...prev, location: text.trim() }));
    console.log(profile.location);
  };

  useEffect(() => {
    if (profile.location.length != 0) {
      setIsDropDownVisible(true);
    } else {
      setIsDropDownVisible(false);
    }
  }, [profile.location]);

  return (
    <View style={styles.container}>
      <ProgressBar step={step} />
      <Text style={styles.text}>
        {step == 1
          ? '빌링에서 사용할\n닉네임을 입력해주세요'
          : '앱을 사용할 위치를\n입력해주세요'}
      </Text>
      {step == 1 ? (
        <PlainInputField
          placeholder={'ex) 빌링이'}
          value={profile.name}
          onChangeText={handleName}
        />
      ) : (
        <DrondownInputField
          placeholder={'ex) 용산구 청파동'}
          value={profile.location}
          setLocation={handleLocation}
          onChangeText={handleLocation}
          isDropDownVisible={isDropDownVisible}
          setIsDropDownVisible={setIsDropDownVisible}
        />
      )}

      <View style={styles.center}>
        <Image source={step == 1 ? soe : location} />
      </View>
      <BottomButton
        title={step == 1 ? '다음으로' : '시작하기'}
        active={
          step == 1
            ? profile.name.length > 0
              ? true
              : false
            : profile.location.length > 0
            ? true
            : false
        }
        onPress={nextStep}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    paddingTop: 60,
    justifyContent: 'space-between',
  },
  text: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 700,
  },
  center: {
    alignItems: 'center',
  },
});

export default SetProfileScreen;
