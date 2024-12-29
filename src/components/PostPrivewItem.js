import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import colors from '../styles/Colors';

function PostPreviewItem({data}) {
  return data.image ? (
    <TouchableOpacity style={styles.imageContainer}>
      <Image style={styles.image} source={data.image} />
      <View style={styles.textContainer}>
        <Text style={styles.titleText}>{data.title}</Text>
        <Text style={styles.priceText}>{data.price}</Text>
        <Text style={styles.locationText}>{data.location}</Text>
      </View>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity style={styles.container}>
      <Text style={styles.titleText}>{data.title}</Text>
      <Text style={styles.priceText}>
        {data.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
      </Text>
      <Text style={styles.locationText}>{data.location}</Text>
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
    flex: 1,
    borderRadius: 40,
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
});
export default PostPreviewItem;
