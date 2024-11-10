import {Text, StyleSheet} from 'react-native';
import colors from '../styles/Colors';
import styles from '../styles/ButtonStyle';
import {TouchableOpacity} from 'react-native-gesture-handler';

function DefaultButton({title, color}) {
  return (
    <TouchableOpacity style={[styles.container, {backgroundColor: color}]}>
      <Text
        style={[
          styles.text,
          {color: color === colors.buttonBlue ? 'white' : 'black'},
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

export default DefaultButton;
