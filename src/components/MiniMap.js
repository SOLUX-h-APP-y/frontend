import { StyleSheet } from 'react-native';
import { View } from 'react-native-animatable';
import colors from '../styles/Colors';
import { NaverMapView } from '@mj-studio/react-native-naver-map';

function MiniMap({ latitude, longitude }) {
  return (
    <View style={styles.container}>
      <NaverMapView
        style={styles.map}
        camera={{
          latitude: latitude,
          longitude: longitude,
          zoom: 15, // 초기 확대 레벨
        }}
        isScrollGesturesEnabled={false} // 지도 이동 방지
        isZoomGesturesEnabled={false} // 줌 방지
        isRotateGesturesEnabled={false} // 회전 방지
        isTiltGesturesEnabled={false} // 기울기 방지
        isLiteModeEnabled={true}
        isShowZoomControls={false}
        isShowLocationButton={false}></NaverMapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.gray1,
    borderRadius: 30,
    width: '100%',
    height: 100,
  },
  map: {
    flex: 1,
  },
});

export default MiniMap;
