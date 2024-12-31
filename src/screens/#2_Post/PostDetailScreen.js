import { Image, StyleSheet, Text, View, ScrollView } from 'react-native';
import profileSample from '../../assets/images/profileSample.png';
import locationIcon from '../../assets/icons/locationIcon.png';
import postSample from '../../assets/images/postSample.png';
import colors from '../../styles/Colors';
import { CategoryTag, StateTag } from '../../components/Tags';
import BottomBar from '../../components/BottomBar';

const data = {
  name: '보리보리',
  distance: '10km',
  profileImage: profileSample,
  category: '기타',
  state: '거래중',
  title: '닌텐도 스위치 하루만..',
  date: '2024.09.24',
  content:
    '닌텐도 스위치 하루만 빌릴 수 있을까요?\n가격 협상 가능합니다.\n테스트만 해보고 금방 돌려드릴게요.. 기종상관 없습니다',
  location: '청파초등학교앞',
  price: 3500,
  postImage: postSample,
};

function PostDetailScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView contentContainerStyle={styles.container}>
        {data.postImage ? (
          <Image
            source={data.postImage}
            style={{
              width: '100%',
              height: 400,
              borderBottomLeftRadius: 30,
              borderBottomRightRadius: 30,
            }}
          />
        ) : null}
        <View style={styles.contentContainer}>
          <View style={styles.profile}>
            <Image source={data.profileImage} />
            <View style={{ gap: 5, justifyContent: 'center' }}>
              <Text>{data.name}</Text>
              <View
                style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
                <Image
                  source={locationIcon}
                  style={{
                    width: 13,
                    height: 25,
                    resizeMode: 'contain',
                    //borderWidth: 1,
                  }}
                />
                <Text style={{ color: colors.gray2 }}>{data.distance}</Text>
              </View>
            </View>
          </View>
          <View style={styles.tags}>
            <CategoryTag title={data.category} />
            <StateTag title={data.state} />
          </View>
          <View style={{ gap: 10 }}>
            <Text style={styles.title}>{data.title}</Text>
            <Text style={{ color: colors.gray3 }}>{data.date}</Text>
          </View>
          <View style={styles.content}>
            <Text>{data.content}</Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 10,
            }}>
            <Text style={{ fontWeight: 700 }}>거래 희망 장소</Text>
            <Text>{data.location}</Text>
          </View>
          <View
            style={{
              backgroundColor: colors.gray1,
              borderRadius: 30,
              width: '100%',
              height: 100,
            }}></View>
        </View>
      </ScrollView>
      <BottomBar price={data.price} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  contentContainer: {
    padding: 20,
    gap: 10,
  },
  profile: {
    flexDirection: 'row',
    gap: 20,
    paddingVertical: 20,
    borderWidth: 1,
    borderColor: 0,
    borderBottomColor: colors.gray1,
  },
  tags: {
    flexDirection: 'row',
    gap: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 700,
  },
  content: {
    minHeight: 150,
    justifyContent: 'center',
  },
});

export default PostDetailScreen;