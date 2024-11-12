import {StyleSheet, Text, View} from 'react-native';
import colors from '../styles/Colors';
import {fontBlack, fontGray} from '../styles/FontStyles';
import {BlueButton} from './Buttons';

function RankingInfoBanner() {
  return (
    <View style={styles.container}>
      <Text style={fontBlack.text}>나의 티어 확인 및 내 글 보기</Text>
      <Text style={fontGray.text}>
        마이페이지에서 나의 티어를 확인하고 내가 작성한 글을 확인해보세요
      </Text>
      <BlueButton title="마이페이지로 이동" width="138" height="38" />
      <BlueButton title="내글 보기" width="88" height="38" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 300,
    backgroundColor: colors.backgroundGray,
    padding: 20,
    gap: 10,
  },
});

export default RankingInfoBanner;
