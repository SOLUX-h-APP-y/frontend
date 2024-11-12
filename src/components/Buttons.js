import { Text, TouchableOpacity } from 'react-native';
import { blueBtn, whiteBtn } from '../styles/ButtonStyles';


function WhiteButton({ title, width, height, navigation }) {
  return (
    <TouchableOpacity
      style={[
        whiteBtn.container,
        width ? { width: width } : null,
        height ? { height: height } : null,
      ]}
      onPress={() => navigation.navigate('Home')}>
      <Text style={whiteBtn.text}>{title}</Text>
    </TouchableOpacity>
  );
}

function BlueButton({ title, width, height }) {
  return (
    <TouchableOpacity
      style={[
        blueBtn.container,
        width ? { width: width } : null,
        height ? { height: height } : null,
      ]}
      onPress={() => console.log(title, 'click')}>
      <Text style={blueBtn.text}>{title}</Text>
    </TouchableOpacity>
  );
}

export { BlueButton, WhiteButton };
