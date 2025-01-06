import { StyleSheet } from 'react-native';
import colors from './Colors';

export const fontBlack = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: 700,
    color: 'black',
  },
});

export const fontWhite = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: 700,
    color: 'white',
  },
});

export const fontGray = StyleSheet.create({
  text: {
    fontSize: 14,
    fontWeight: 700,
    color: '#888888',
  },
});

// new font styles
export const fontStyles = StyleSheet.create({
  lightBlackSemiBold20: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 26,
    letterSpacing: -0.5,
    color: colors.lightBlack,
  },
  lightBlackSemiBold16: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 20.8,
    letterSpacing: -0.5,
    color: colors.lightBlack,
  },
  lightBlackSemiBold14: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 18.2,
    letterSpacing: -0.5,
    color: colors.lightBlack,
  },
  lightBlackMedium14: {
    fontFamily: 'Pretendard-Medium',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 18.2,
    letterSpacing: -0.5,
    color: colors.lightBlack,
  },
  blackSemiBold16: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 20.8,
    letterSpacing: -0.5,
    color: 'black',
  },
  blackSemiBold20: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 26,
    letterSpacing: -0.5,
    color: 'black',
  },
  blackSemiBold24: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 33.6,
    letterSpacing: -0.5,
    color: 'black',
  },
  blackMedium14: {
    fontFamily: 'Pretendard-Medium',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 18.2,
    letterSpacing: -0.5,
    color: colors.lightBlack,
  },
  whiteMedium14: {
    fontFamily: 'Pretendard-Medium',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 18.2,
    letterSpacing: -0.5,
    color: 'white',
  },
  whiteSemiBold14: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 18.2,
    letterSpacing: -0.5,
    color: 'white',
  },
  gray3Medium14: {
    fontFamily: 'Pretendard-Medium',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 18.2,
    letterSpacing: -0.5,
    color: colors.gray3,
  },
  gray4Medium14: {
    fontFamily: 'Pretendard-Medium',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 18.2,
    letterSpacing: -0.5,
    color: colors.gray4,
  },
  gray4Medium12: {
    fontFamily: 'Pretendard-Medium',
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 15.6,
    letterSpacing: -0.5,
    color: colors.gray4,
  },
  gray4SemiBold16: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 20.8,
    letterSpacing: -0.5,
    color: colors.gray4,
  },
  gray2Medium14: {
    fontFamily: 'Pretendard-Medium',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 18.2,
    letterSpacing: -0.5,
    color: colors.gray2,
  },
  themeMedium14: {
    fontFamily: 'Pretendard-Medium',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 18.2,
    letterSpacing: -0.5,
    color: colors.themeColor,
  },
  themeSemibold20: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 26,
    letterSpacing: -0.5,
    color: colors.themeColor,
  },
  Medium14: {
    fontFamily: 'Pretendard-Medium',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 18.2,
    letterSpacing: -0.5,
  }
});

export default fontStyles;