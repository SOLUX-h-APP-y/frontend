import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import colors from '../styles/Colors';
import { useNavigation } from '@react-navigation/native';
import locationIcon from '../assets/icons/locationIcon.png';
import { TypeTag } from './Tags';

function PostPreviewItem({ data }) {
  const navigation = useNavigation();

  return data.image ? (
    <TouchableOpacity
      style={styles.imageContainer}
      onPress={() => navigation.navigate('PostDetailScreen')}>
      <Image style={styles.image} source={data.image} />
      <View style={styles.textContainer}>
        <Text style={styles.titleText}>{data.title}</Text>
        <Text style={styles.priceText}>
          {data.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        </Text>

        <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
          <Image source={locationIcon} style={styles.locationIcon} />
          <Text style={styles.locationText}>{data.location}</Text>
        </View>
        <View
          style={{
            width: '100%',
            alignItems: 'flex-end',
          }}>
          {data.type ? (
            data.type == 'sharer' ? (
              <TypeTag type="sharer" />
            ) : (
              <TypeTag type="borrower" />
            )
          ) : null}
        </View>
      </View>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity style={styles.container}>
      <Text style={styles.titleText}>{data.title}</Text>
      <Text style={styles.priceText}>
        {data.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
      </Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
          <Image source={locationIcon} style={styles.locationIcon} />
          <Text style={styles.locationText}>{data.location}</Text>
        </View>
        {data.type ? (
          data.type == 'sharer' ? (
            <TypeTag type="sharer" />
          ) : (
            <TypeTag type="borrower" />
          )
        ) : null}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    gap: 5,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.gray2,
    borderRadius: 40,
    // overflow: 'hidden',
  },
  imageContainer: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: colors.gray2,
    borderRadius: 40,
    flexDirection: 'row',
    //alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    borderRadius: 30,
  },
  textContainer: {
    flex: 1.3,
    gap: 5,
    padding: 10,
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
