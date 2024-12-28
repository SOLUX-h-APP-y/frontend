import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import PostPreviewItem from '../../components/PostPrivewItem';
import CustomHeader from '../../components/CustomHeader';
import sampleImage from '../../assets/images/sample.png';
import {useState} from 'react';
import {NavigateButton} from '../../components/Buttons';
import FilterPanel from '../../components/FilterPanel';

const sharerData = [
  {
    id: 0,
    title: '카메라 빌려드려요 어쩌구 저쩌구',
    price: 5500,
    location: '청파동2가',
    image: sampleImage,
  },
  {
    id: 1,
    title: '가방 빌asdf sdasdfa sdfasesad sefadsfas sdfasefasd 려드립니다',
    price: 2500,
    location: '청파동2가',
  },
  {
    id: 2,
    title: '원피스형 정장 필요하신분?',
    price: 3500,
    location: '청파동2가',
  },
  {
    id: 3,
    title: '원피스형 정장 필요하신분?',
    price: 3500,
    location: '청파동2가',
  },

  {
    id: 4,
    title: '원피스형 정장 필요하신분?',
    price: 3500,
    location: '청파동2가',
  },
  {
    id: 5,
    title: '원피스형 정장 필요하신분?',
    price: 3500,
    location: '청파동2가',
  },
  {
    id: 6,
    title: '원피스형 정장 필요하신분?',
    price: 3500,
    location: '청파동2가',
  },
];

const borrowerData = [
  {
    id: 0,
    title: '카메라 빌려주십쇼 어쩌구 저쩌구',
    price: 5500,
    location: '청파동2가',
    image: sampleImage,
  },
  {
    id: 1,
    title: '가방 빌려줘어ㅓ어ㅓ',
    price: 2500,
    location: '청파동2가',
  },
  {
    id: 2,
    title: '원피스형 정장 달라고?',
    price: 3500,
    location: '청파동2가',
  },
];

function PostListScreen({route}) {
  const {actionType} = route.params;
  console.log(actionType);

  return (
    <View style={styles.container}>
      <CustomHeader isSharer={actionType == 'sharer' ? true : false} />
      <View style={styles.paddingContainer}>
        <FilterPanel />
        {/* <FlatList
          style={styles.flat}
          data={sharerData}
          renderItem={({item, index}) => (
            <View>
              <PostPreviewItem id={index} data={item} />
              <PostPreviewItem id={index} data={item} />
            </View>
          )}
        /> */}
        <View style={styles.content}>
          {sharerData.map((v, i) => (
            <PostPreviewItem key={i} data={v} />
          ))}
        </View>
      </View>

      {/* <NavigateButton name="" /> */}
      {/* <MoveBotton name="BorrowerPostListScreen" /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  paddingContainer: {
    flex: 1,
    padding: 20,
    gap: 20,
  },
  content: {
    gap: 10,
  },
});
export default PostListScreen;
