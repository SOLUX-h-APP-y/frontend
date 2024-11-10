import {View, Text} from 'react-native';
import styles from '../styles/LogoStyle';

function Logo() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>20</Text>
      <Text style={styles.subTitle}>life wupporter</Text>
      <Text style={styles.content}>20대를 위한 라이프 서포터</Text>
    </View>
  );
}

export default Logo;
