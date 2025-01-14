import { SafeAreaView, StyleSheet, View } from 'react-native';
import { NavigateHeader } from '../../components/CustomHeaders';
import { PlainInputField } from '../../components/InputFields';
import {
  PERMISSIONS,
  request,
  requestLocationAccuracy,
} from 'react-native-permissions';
import { NaverMapView } from '@mj-studio/react-native-naver-map';
import { useEffect } from 'react';
import { BottomButton } from '../../components/Buttons';
import { useNavigation } from '@react-navigation/native';

function SetLocationScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    if (Platform.OS === 'ios') {
      request(PERMISSIONS.IOS.LOCATION_ALWAYS).then(status => {
        console.log(`Location request status: ${status}`);
        if (status === 'granted') {
          requestLocationAccuracy({
            purposeKey: 'NaverMapPreciseLocation', // 아까 your purpose key에 있던 키값
          })
            .then(accuracy => {
              console.log(`Location accuracy is: ${accuracy}`);
            })
            .catch(e => {
              console.error(`Location accuracy request has been failed: ${e}`);
            });
        }
      });
    }
  }, []);

  const handleLocation = () => {
    navigation.goBack();
    console.log('위치 저장하고 CreatePostScreen으로 돌아가기')
  };

  return (
    <View style={styles.container}>
      <NaverMapView
        style={{ flex: 1 }}
        onInitialized={() => {
          return console.log('initialized!');
        }}
      />

      <View style={styles.overlay}>
        <NavigateHeader title="위치 입력" />
        <PlainInputField placeholder="원하는 위치를 입력하세요" />
      </View>
      <View style={styles.button}>
        <BottomButton title="완료하기" onPress={handleLocation} active={true} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    position: 'absolute', // 지도 위에 겹치도록 설정
    top: 20, // 상단 여백
    left: 0,
    right: 0,
    zIndex: 10, // 지도보다 위에 표시
    paddingHorizontal: 20,
  },
  button: {
    position: 'absolute', // 지도 위에 겹치도록 설정
    bottom: 20, // 상단 여백
    left: 0,
    right: 0,
    zIndex: 10, // 지도보다 위에 표시
    paddingHorizontal: 20,
  },
});

export default SetLocationScreen;
