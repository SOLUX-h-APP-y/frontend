import React, { useContext, useState } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import ProgressBar from '../../components/ProgressBar.js';
import {
  InputFieldWithClear,
  OutputField,
} from '../../components/InputFields.js';
import soe from '../../assets/images/soe.png';
import { BasicButton, BottomButton } from '../../components/Buttons.js';
import location from '../../assets/images/location.png';
import {
  requestLocationPermission,
  getCurrentCoordinates,
  getAddressFromCoordinates,
} from '../../services/LocationManager.js';
import { API_BASE_URL } from 'react-native-dotenv';
import axios from 'axios';
import { saveTokens } from '../../services/TokenManager.js';
import { UserContext } from '../../states/UserContext.js';
import colors from '../../styles/Colors.js';

function SetProfileScreen({ navigation }) {
  const { userInfo } = useContext(UserContext);
  const [step, setStep] = useState(1);
  const [checkName, setCheckName] = useState();

  const [profile, setProfile] = useState({
    name: '',
    location: '',
    latitude: '',
    longitude: '',
  });

  const nextStep = () => {
    if (step === 1) {
      submitName();
    } else {
      signUp();
    }
  };

  const submitName = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/check-nickname`, {
        nickname: profile.name,
      });

      setCheckName(response.data.isDuplicate);

      if (checkName) {
        setStep(2);
      }
    } catch (e) {
      console.log('submitName error:', e.response?.data || e);
    }
  };

  const handleName = async text => {
    setProfile(prev => ({
      ...prev,
      name: text.trim(),
      //trim()으로 공백 입력 방지
      //이후 글자수 제한도 필요
    }));
  };

  const handleLocation = async () => {
    try {
      await requestLocationPermission();

      const coordinates = await new Promise((resolve, reject) => {
        const result = getCurrentCoordinates();
        if (result) {
          resolve(result);
        } else {
          reject(new Error('좌표 가져오기 실패'));
        }
      });

      const { latitude, longitude } = coordinates;

      const address = await getAddressFromCoordinates(latitude, longitude);

      setProfile(prev => {
        const updatedProfile = {
          ...prev,
          location: address,
          latitude,
          longitude,
        };

        return updatedProfile;
      });
    } catch (e) {
      console.log('handleLocation Error: ', e);
    }
  };

  const signUp = async () => {
    try {
      const requestBody = {
        kakaoId: userInfo.kakaoId,
        nickName: profile.name,
        locationLatitude: profile.latitude,
        locationLongitude: profile.longitude,
        locationName: profile.location,
      };
      const response = await axios.post(
        `${API_BASE_URL}/auth/kakao/sign-up`,
        requestBody,
      );

      saveTokens(response.data.accessToken, response.data.refreshToken);

      navigation.navigate('MainTabs', {
        screen: '홈',
        params: { actionType: 'share' },
      });
    } catch (e) {
      console.log('signUp error: ', e);
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
        <>
          <InputFieldWithClear
            placeholder={'ex) 빌링이'}
            value={profile.name}
            onChangeText={handleName}
            onClear={prev => setProfile({ ...prev, name: '' })}
          />
          {checkName !== undefined && (
            <Text
              style={[
                styles.message,
                { color: checkName ? colors.error : '#00C147' },
              ]}>
              {checkName
                ? '이미 사용중인 아이디 입니다'
                : '사용가능한 아이디 입니다'}
            </Text>
          )}
        </>
      ) : (
        <View style={{ alignItems: 'center', gap: 20 }}>
          <OutputField
            value={profile.location}
            placeholder={'아래의 버튼을 눌러 위치를 설정해주세요'}
          />
          <BasicButton title="내 위치 불러오기" onPress={handleLocation} />
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
  message: {
    paddingHorizontal: 20,
  },
});

export default SetProfileScreen;
