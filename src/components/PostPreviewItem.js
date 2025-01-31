import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import colors from '../styles/Colors';
import { useNavigation } from '@react-navigation/native';
import locationIcon from '../assets/icons/locationIcon.png';
import { TypeTag } from './Tags';
import { ReviewButton } from './Buttons';
import fontStyles from '../styles/FontStyles';

function PostPreviewItem({ data }) {
  const navigation = useNavigation();

  return data.previewImage ? (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigation.navigate('PostDetailScreen', { postId: data.postId })
      }>
      <View style={{ flexDirection: 'row', gap: 10 }}>
        <View style={{ justifyContent: 'center' }}>
          <Image source={{ uri: data.previewImage }} style={styles.image} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.titleText}>{data.title}</Text>
          <Text style={styles.priceText}>
            {data.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          </Text>

          <View style={styles.locationContainer}>
            <Image source={locationIcon} style={styles.locationIcon} />
            <Text style={styles.locationText}>{data.locationName}</Text>
          </View>
          <View style={{ alignItems: 'flex-end', gap: 5 }}>
            {data.postStatus === '거래완료' ? (
              <ReviewButton revieweeId={data.id} /> // revieweeId=postId -> revieweeId=writerId로 변경 예정
            ) : null}
            {data.postType && (
              <TypeTag type={data.postType === 'share' ? 'share' : 'borrow'} />
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigation.navigate('PostDetailScreen', { postId: data.postId })
      }>
      <View style={{ flexDirection: 'row', gap: 10 }}>
        <View style={{ flex: 1 }}>
          <Text style={styles.titleText}>{data.title}</Text>
          <Text style={styles.priceText}>
            {data.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          </Text>
        </View>
        {data.postStatus === '거래완료' ? (
          <ReviewButton revieweeId={data.id} /> // revieweeId=postId -> revieweeId=writerId로 변경 예정
        ) : null}
      </View>
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.locationContainer}>
          <Image source={locationIcon} style={styles.locationIcon} />
          <Text style={styles.locationText}>{data.locationName}</Text>
        </View>
        {data.postStatus && (
          <TypeTag type={data.postStatus === 'share' ? 'share' : 'borrow'} />
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
    alignItems: 'start',
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
