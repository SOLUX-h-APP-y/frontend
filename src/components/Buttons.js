import {Text, TouchableOpacity} from 'react-native';
import {blueBtn, whiteBtn} from '../styles/ButtonStyles';

function WhiteButton({title, width, height, onPress}) {
  return (
    <TouchableOpacity
      style={[
        whiteBtn.container,
        width ? {width: width} : null,
        height ? {height: height} : null,
      ]}
      onPress={onPress ? onPress : () => console.log(title, 'click')}>
      <Text style={whiteBtn.text}>{title}</Text>
    </TouchableOpacity>
  );
}

function BlueButton({title, width, height, onPress}) {
  return (
    <TouchableOpacity
      style={[
        blueBtn.container,
        width ? {width: width} : null,
        height ? {height: height} : null,
      ]}
      onPress={onPress ? onPress : () => console.log(title, 'click')}>
      <Text style={blueBtn.text}>{title}</Text>
    </TouchableOpacity>
  );
}

export {BlueButton, WhiteButton};
