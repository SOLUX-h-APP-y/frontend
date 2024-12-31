import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import fontStyles from '../styles/FontStyles';
import { useNavigation } from '@react-navigation/native';

const NavigateHeader = ({ title, type }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image
          source={
            type
              ? require('../assets/icons/whiteBackIcon.png')
              : require('../assets/icons/backIcon.png')
          }
          style={styles.backIcon}
        />
      </TouchableOpacity>
      <Text style={styles.headerText}>{title}</Text>
      <View style={styles.backIcon}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 56,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  backIcon: {
    width: 8.64,
    height: 14,
  },
  headerText: {
    ...fontStyles.blackSemiBold20,
  },
});

export default NavigateHeader;
