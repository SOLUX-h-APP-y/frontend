import {StyleSheet} from 'react-native';
import colors from './Colors';

export const DefaultBtn = StyleSheet.create({
  container: {
    width: '100%',
    height: 60,
    borderRadius: 50,
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export const blueBtn = StyleSheet.create({
  container: {
    width: '100%',
    height: 60,
    borderRadius: 50,
    justifyContent: 'center',
    backgroundColor: colors.buttonBlue,
  },
  text: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
  },
});

export const whiteBtn = StyleSheet.create({
  container: {
    width: '100%',
    height: 60,
    borderRadius: 50,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  text: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
  },
});
