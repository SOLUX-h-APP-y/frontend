import { StyleSheet, ScrollView, View } from 'react-native';
import PostPreviewItem from '../../components/PostPreviewItem';
import sampleImage from '../../assets/images/sample.png';
import { NavigateHeader } from '../../components/CustomHeaders';

const data = [
  {
    id: 0,
    title: '카메라 빌려주십쇼 어쩌구 저쩌구',
    price: 5500,
    location: '청파동2가',
    image: sampleImage,
    type: 'borrow',
  },
  {
    id: 1,
    title: '가방 빌려줘어ㅓ어ㅓ',
    price: 2500,
    location: '청파동2가',
    type: 'borrow',
  },
  {
    id: 2,
    title: '원피스형 정장 달라고?',
    price: 3500,
    location: '청파동2가',
    type: 'share',
  },
  {
    id: 3,
    title: '카메라 빌려드려요 어쩌구 저쩌구',
    price: 5500,
    location: '청파동2가',
    image: sampleImage,
    type: 'share',
  },
  {
    id: 4,
    title: '가방 빌asdf sdasdfa sdfasesad sefadsfas sdfasefasd 려드립니다',
    price: 2500,
    location: '청파동2가',
    type: 'share',
  },
  {
    id: 5,
    title: '원피스형 정장 필요하신분?',
    price: 3500,
    location: '청파동2가',
    type: 'share',
  },
];

function MyPostList() {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ gap: 20, padding: 20 }}>
        <NavigateHeader title={'내글보기'} />
        {data.map((v, i) => (
          <PostPreviewItem data={v} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default MyPostList;
