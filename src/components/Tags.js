import { StyleSheet, View, Text } from 'react-native';
import colors from '../styles/Colors';

function CategoryTag({ title }) {
  return (
    <View style={styles.categoryTag}>
      <Text style={{ color: colors.gray4 }}>{title}</Text>
    </View>
  );
}

function StateTag({ title }) {
  return (
    <View style={styles.stateTag}>
      <Text style={{ color: 'white' }}>{title}</Text>
    </View>
  );
}

function TypeTag({ type }) {
  return (
    <View
      style={type == 'sharer' ? styles.typeTagSharer : styles.typeTagBorrower}>
      <Text style={{ color: colors.themeColor }}>
        {type == 'sharer' ? '빌려드려요' : '빌려주세요'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  categoryTag: {
    width: 50,
    height: 25,
    borderWidth: 1,
    borderColor: colors.gray2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12.5,
  },
  stateTag: {
    width: 60,
    height: 25,
    backgroundColor: colors.themeColor,
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12.5,
  },
  typeTagSharer: {
    width: 90,
    height: 25,
    borderWidth: 1,
    borderColor: colors.themeColor,

    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12.5,
  },
  typeTagBorrower: {
    width: 90,
    height: 25,
    backgroundColor: colors.vPale,

    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12.5,
  },
});

export { CategoryTag, StateTag, TypeTag };
