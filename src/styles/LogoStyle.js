import {StyleSheet} from 'react-native';
import colors from '../styles/Colors';

export default StyleSheet.create({
  container: {
    width: 180,
    height: 180,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    //android shadow
    elevation: 3,
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    color: colors.logoBlue,
  },
  subTitle: {
    fontSize: 25,
    color: colors.logoBlue,
  },
  content: {
    fontSize: 12,
  },
});
