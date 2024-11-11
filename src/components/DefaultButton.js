import {Text, TouchableOpacity} from 'react-native';
import colors from '../styles/Colors';
import styles from '../styles/ButtonStyle';

function DefaultButton({title, color}) {
  return (
    <TouchableOpacity
      style={[styles.container, {backgroundColor: color}]}
      onPress={() => console.log(title, 'click')}>
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
