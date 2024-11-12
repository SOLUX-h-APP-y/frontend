import { SafeAreaView, Text } from 'react-native';
import RankingInfoBanner from '../components/RankingInfoBanner';

function HomeScreen() {
  return (
    <SafeAreaView>
      <Text>Home</Text>
      <RankingInfoBanner />
    </SafeAreaView>
  );
}

export default HomeScreen;
