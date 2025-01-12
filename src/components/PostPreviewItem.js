import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import colors from '../styles/Colors';
import { useNavigation } from '@react-navigation/native';
import locationIcon from '../assets/icons/locationIcon.png';
import { TypeTag } from './Tags';
import { ReviewButton } from './Buttons';
import fontStyles from '../styles/FontStyles';

//handleShowReview는 ReviewButton 내부에 작성되도록 수정
function PostPreviewItem({ data, handleShowReviews }) {
  const navigation = useNavigation();

  return data.image ? (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('PostDetailScreen')}>
      <View style={{ flexDirection: 'row', gap: 10 }}>
        <View style={{ justifyContent: 'center' }}>
          <Image source={data.image} style={styles.image} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.titleText}>{data.title}</Text>
          <Text style={styles.priceText}>
            {data.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          </Text>

          <View style={styles.locationContainer}>
            <Image source={locationIcon} style={styles.locationIcon} />
            <Text style={styles.locationText}>{data.location}</Text>
          </View>
          <View style={{ alignItems: 'flex-end', gap: 5 }}>
            {data.type && (
              <TypeTag type={data.type === 'sharer' ? 'sharer' : 'borrower'} />
            )}
            {data.state === '거래완료' ? (
              <ReviewButton onPress={() => handleShowReviews(1)} />
            ) : //handleShowReviews => id로 넘기기
            null}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('PostDetailScreen')}>
      <View style={{ flexDirection: 'row', gap: 10 }}>
        <View style={{ flex: 1 }}>
          <Text style={styles.titleText}>{data.title}</Text>
          <Text style={styles.priceText}>
            {data.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          </Text>
        </View>
        {data.state === '거래완료' ? (
          <ReviewButton onPress={() => handleShowReviews(1)} />
        ) : //handleShowReviews => id로 넘기기
        null}
      </View>
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.locationContainer}>
          <Image source={locationIcon} style={styles.locationIcon} />
          <Text style={styles.locationText}>{data.location}</Text>
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
    padding: 20,
    borderWidth: 1,
    borderColor: colors.gray2,
    borderRadius: 36,
    gap: 0,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    flex: 1,
  },
  titleText: {
    ...fontStyles.lightBlackSemiBold16,
  },
  priceText: {
    ...fontStyles.themeSemibold20,
  },
  locationText: {
    ...fontStyles.gray4Medium14,
  },
  locationIcon: {
    width: 13,
    height: 25,
    resizeMode: 'contain',
  },
  image: {
    width: 130,
    height: 130,
    resizeMode: 'contain',
    borderRadius: 30,
    flex: 1,
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
});

export default PostPreviewItem;
