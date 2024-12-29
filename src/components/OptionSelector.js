import {StyleSheet, FlatList, View, Text} from 'react-native';
import colors from '../styles/Colors';

const data = {
  distance: [0, 3, 5, 10],
  category: ['전체', '헬스', '패션', '엔터', '학업', '기타'],
};

function OptionSelector() {
  console.log(data);
  return (
    <View>
      <Text>hi</Text>
      <FlatList
        style={styles.container}
        data={data}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={item => console.log(item)}
            style={styles.item}>
            <View>{}</View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,

    width: '100%',
    height: 100,
    borderWidth: 1,
    borderTopWidth: 0,
    borderBottomLeftRadius: 20,
    borderColor: colors.gray1,
    backgroundColor: 'red',
    zIndex: 1,
  },
  item: {
    borderWidth: 2,
    borderColor: 'red',
  },
});

export default OptionSelector;
