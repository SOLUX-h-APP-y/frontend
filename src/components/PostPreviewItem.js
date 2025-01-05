import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import colors from '../styles/Colors';
import { useNavigation } from '@react-navigation/native';
import locationIcon from '../assets/icons/locationIcon.png';
import { TypeTag } from './Tags';
import { ReviewButton } from './Buttons';


function PostPreviewItem({ data }) {
  const navigation = useNavigation();

  return data.image ? (
    <TouchableOpacity
      style={styles.imageContainer}
      onPress={() => navigation.navigate('PostDetailScreen')}>
      <Image style={styles.image} source={data.image} />
      <View style={styles.textContainer}>
        {/* Title and ReviewButton */}
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>{data.title}</Text>
          {data.status === '거래완료' && (
            <ReviewButton onPress={() => console.log(`후기 보기 for item ${data.id}`)} />
          )}
        </View>
        <Text style={styles.titleText}>{data.title}</Text>
        <Text style={styles.priceText}>
          {data.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        </Text>

        <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
          <Image source={locationIcon} style={styles.locationIcon} />
          <Text style={styles.locationText}>{data.location}</Text>
        </View>
        {data.type && (
          <View style={{ marginTop: 10 }}>
            <TypeTag type={data.type === 'sharer' ? 'sharer' : 'borrower'} />
          </View>
        )}
      </View>
    </TouchableOpacity >
  ) : (
    <TouchableOpacity style={styles.container}>
      {/* Title and ReviewButton */}
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>{data.title}</Text>
        {data.status === '거래완료' && (
          <ReviewButton onPress={() => console.log(`리뷰 보기 for ${data.title}`)} />
        )}
      </View>
      <Text style={styles.priceText}>
        {data.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
      </Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
          <Image source={locationIcon} style={styles.locationIcon} />
          <Text style={styles.locationText}>{data.location}</Text>
        </View>

        {/* TypeTag */}
        {data.type && (
          <View style={{ marginTop: 10 }}>
            <TypeTag type={data.type === 'sharer' ? 'sharer' : 'borrower'} />
          </View>
        )}
      </View>
    </TouchableOpacity >
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 20,
    borderWidth: 1,
    borderColor: colors.gray2,
    borderRadius: 40,
    overflow: 'hidden',
  },
  imageContainer: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: colors.gray2,
    borderRadius: 40,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    borderRadius: 30,
  },
  textContainer: {
    flex: 1.3,
    marginLeft: 20,
    justifyContent: 'space-between',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', // 수직 정렬
  },
  titleText: {
    fontSize: 16,
    fontWeight: 700,
  },
  priceText: {
    fontSize: 20,
    fontWeight: 700,
    color: colors.themeColor,
  },
  locationText: {
    fontSize: 15,
    fontWeight: 500,
    color: colors.gray4,
  },
  locationIcon: {
    width: 13,
    height: 25,
    resizeMode: 'contain',
  },
});
export default PostPreviewItem;
