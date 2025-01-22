import React, { useState } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import ProgressBar from '../../components/ProgressBar.js';
import {
  InputFieldWithClear,
  OutputField,
} from '../../components/InputFields.js';
import soe from '../../assets/images/soe.png';
import { BasicButton, BottomButton } from '../../components/Buttons.js';
import location from '../../assets/images/location.png';
import Geolocation from 'react-native-geolocation-service';
import { NAVER_CLIENT_ID, NAVER_CLIENT_SECRET } from 'react-native-dotenv';
import { logToLogBoxAndConsole } from 'react-native-reanimated/lib/typescript/logger/logger.js';
import axios from 'axios';
import {
  requestLocationPermission,
  getCurrentCoordinates,
  getAddressFromCoordinates,
} from '../../services/LocationManager.js';

function SetProfileScreen({ navigation }) {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState({ name: '', location: '' });

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

  const handleLocation = async () => {
    try {
      await requestLocationPermission();

      const coordinates = await new Promise((resolve, reject) => {
        const result = getCurrentCoordinates();
        if (result) {
          resolve(result);
        } else {
          reject(new Error('위도 경도 가져오기 실패'));
        }
      });

      const { latitude, longitude } = coordinates;

      const address = await getAddressFromCoordinates(latitude, longitude);

      setProfile({ ...profile, location: address });
    } catch (e) {
      console.log('handleLocation Error: ', e);
    }
  };

  return (
    <View style={styles.container}>
      <ProgressBar step={step} />
      <Text style={styles.text}>
        {step == 1
          ? '빌링에서 사용할\n닉네임을 입력해주세요'
          : '앱을 사용할 위치를\n입력해주세요'}
      </Text>
      {step == 1 ? (
        <InputFieldWithClear
          placeholder={'ex) 빌링이'}
          value={profile.name}
          onChangeText={handleName}
          onClear={prev => setProfile({ ...prev, name: '' })}
        />
      ) : (
        <View style={{ alignItems: 'center', gap: 20 }}>
          <OutputField
            value={profile.location}
            placeholder={'아래의 버튼을 눌러 위치를 설정해주세요'}
          />
          <BasicButton title="내 위치 불러오기" onPress={handleLocation} />
          {/* <BasicButton
            title="내 위치 불러오기"
            onPress={() =>
              navigation.navigate('MainTabs', {
                screen: 'SharerPostListScreen',
              })
            }
          /> */}
        </View>
      )}

      <View style={styles.center}>
        <Image source={step == 1 ? soe : location} />
      </View>
      <BottomButton
        title={step == 1 ? '다음으로' : '시작하기'}
        active={
          step == 1
            ? profile.name
              ? true
              : false
            : profile.location
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
