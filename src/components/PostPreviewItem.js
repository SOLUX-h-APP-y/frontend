import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import colors from '../styles/Colors';
import { useNavigation } from '@react-navigation/native';
import locationIcon from '../assets/icons/locationIcon.png';
import { TypeTag } from './Tags';
import { ReviewButton } from './Buttons';
import fontStyles from '../styles/FontStyles';

function PostPreviewItem({ data, handleShowReviews }) {
  const navigation = useNavigation();

  return data.image ? (
    <TouchableOpacity
      style={styles.imageContainer}
      onPress={() => navigation.navigate('PostDetailScreen')}>
      <Image style={styles.image} source={data.image} />
      <View style={styles.textContainer}>
        {/* 제목, 가격, 위치 정보 */}
        <Text style={styles.titleText}>{data.title}</Text>
        <Text style={styles.priceText}>
          {data.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        </Text>
        <View style={styles.locationContainer}>
          <Image source={locationIcon} style={styles.locationIcon} />
          <Text style={styles.locationText}>{data.location}</Text>
        </View>
      </View>
      {/* 후기 버튼과 TypeTag */}
      <View style={styles.actionContainer}>
        <View style={styles.buttonWrapper}>
          {data.status === '거래완료' && (
            <ReviewButton onPress={() => handleShowReviews(1)} /> // 리뷰를 볼 사용자의 id
          )}
        </View>
        {data.type && (
          <TypeTag type={data.type === 'sharer' ? 'sharer' : 'borrower'} />
        )}
      </View>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('PostDetailScreen')}>
      <View style={styles.textContainer}>
        {/* 제목, 가격, 위치 정보 */}
        <Text style={styles.titleText}>{data.title}</Text>
        <Text style={styles.priceText}>
          {data.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        </Text>
        <View style={styles.locationContainer}>
          <Image source={locationIcon} style={styles.locationIcon} />
          <Text style={styles.locationText}>{data.location}</Text>
        </View>
      </View>
      <View style={styles.actionContainer}>
        <View style={styles.buttonWrapper}>
          {/* 후기 버튼과 TypeTag */}
          {data.status === '거래완료' && (
            <ReviewButton onPress={() => handleShowReviews(1)} />
          )}
        </View>
        {data.type && (
          <TypeTag type={data.type === 'sharer' ? 'sharer' : 'borrower'} />
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    // height: 120,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.gray2,
    borderRadius: 36,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  imageContainer: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: colors.gray2,
    borderRadius: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image: {
    width: 130,
    height: 130,
    resizeMode: 'contain',
    borderRadius: 30,
  },
  textContainer: {
    flex: 1.3,
    marginLeft: 10,
  },
  titleText: {
    ...fontStyles.lightBlackSemiBold16,
    marginBottom: 2,
  },
  priceText: {
    ...fontStyles.themeSemibold20,
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    ...fontStyles.gray4Medium14,
  },
  locationIcon: {
    width: 9.33,
    height: 13.33,
    marginRight: 5,
    resizeMode: 'contain',
  },
  actionContainer: {
    height: 70,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  buttonWrapper: {
    marginBottom: 15,
  },
});
export default PostPreviewItem;
