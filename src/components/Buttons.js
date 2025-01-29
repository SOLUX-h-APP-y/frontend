import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import colors from '../styles/Colors';
import { useNavigation } from '@react-navigation/native';
import plusIcon from '../assets/icons/plusIcon.png';
import fontStyles from '../styles/FontStyles';
import ReviewModal from './ReviewModal';
import { useState } from 'react';

const reviewData = [
  {
    reviewer_id: 1,
    reviewee_id: 0,
    rate: 5,
    content: '좋은 상품 감사합니다',
  },
  {
    reviewer_id: 2,
    reviewee_id: 1,
    rate: 3,
    content: '상품이 조금 더럽네요',
  },
];

function BottomButton({ title, active, onPress }) {
  return (
    <TouchableOpacity
      style={active ? styles.activeBottomButton : styles.inactiveBottomButton}
      onPress={onPress}
      disabled={!active}>
      <Text style={active ? styles.whiteText : styles.grayText}>{title}</Text>
    </TouchableOpacity>
  );
}

function CreatePostButton({ name, actionType }) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.createPostButton}
      onPress={() => navigation.navigate(name, { actionType })}>
      <Image source={plusIcon} />
    </TouchableOpacity>
  );
}

function CategoryButton({ title, active, onPress }) {
  return (
    <TouchableOpacity
      style={
        active ? styles.activeCategoryButton : styles.inactiveCategoryButton
      }
      onPress={onPress}>
      <Text style={active ? { color: 'white' } : null}>{title}</Text>
    </TouchableOpacity>
  );
}

function NavigateButton({ title, name }) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.navigateButton}
      onPress={() => navigation.navigate(name)}>
      <Text>{title}</Text>
    </TouchableOpacity>
  );
}

function NavigateButtonTheme({ title, name, chatRoomId, isCompleted }) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.activeCategoryButton}
      onPress={() => navigation.navigate(name, { chatRoomId, isCompleted })}>
      <Text style={{ color: 'white', fontWeight: 700 }}>{title}</Text>
    </TouchableOpacity>
  );
}

function AddPhotoButton() {
  return (
    <TouchableOpacity style={styles.addPhotoButton}>
      <Image source={plusIcon} />
    </TouchableOpacity>
  );
}

function FreeButton({ active, onPress }) {
  return (
    <TouchableOpacity
      style={active ? styles.activeFreeButton : styles.inactiveFreeButton}
      onPress={onPress}>
      <Text style={{ color: active ? 'white' : colors.themeColor }}>
        무료나눔
      </Text>
    </TouchableOpacity>
  );
}

function SubmitButton({ onPress, title, disabled }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.submitButton,
        disabled ? styles.disabledSubmitButton : styles.activeSubmitButton,
      ]}>
      <Text
        style={[
          styles.buttonText,
          disabled ? styles.disabledButtonText : styles.activeButtonText,
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

function ReviewButton({ revieweeId }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedReviews, setSelectedReviews] = useState([]);

  const handleShowReviews = () => {
    const filteredReviews = reviewData.filter(
      review => review.reviewee_id === revieweeId,
    );
    setSelectedReviews(filteredReviews);
    setModalVisible(true);
  };

  return (
    <>
      <TouchableOpacity
        style={ReviewButtonstyles.reviewButton}
        onPress={handleShowReviews}>
        <Text style={ReviewButtonstyles.reviewButtonText}>후기 보기</Text>
      </TouchableOpacity>

      {/* 모달 */}
      <ReviewModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        reviews={selectedReviews}
      />
    </>
  );
}

const EncourageButton = ({
  totalCount = 0,
  profileOwnerId,
  currentUserId,
  onPress,
}) => {
  const isMyProfile = profileOwnerId === currentUserId; // 내 프로필 여부 확인

  const handlePress = () => {
    if (isMyProfile) {
      Alert.alert('알림', '자신에게는 응원할 수 없습니다.');
    } else if (onPress) {
      onPress();
    }
  };

  return (
    <TouchableOpacity
      style={[
        EncourageButtonstyles.button,
        isMyProfile && EncourageButtonstyles.disabledButton, // 내 프로필일 경우 버튼 스타일 비활성화
      ]}
      onPress={handlePress} // 버튼 클릭 이벤트 처리
    >
      <View style={EncourageButtonstyles.textContainer}>
        <Text style={EncourageButtonstyles.buttonText}>응원하기</Text>
        <Text
          style={EncourageButtonstyles.totalCountText}>{`${totalCount}`}</Text>
      </View>
    </TouchableOpacity>
  );
};

function BasicButton({ title, onPress }) {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: colors.themeColor,
        height: 32,
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
      }}
      onPress={onPress}>
      <Text style={{ color: 'white' }}>{title}</Text>
    </TouchableOpacity>
  );
}

//active, inactive backgroundColor만 달라서 하나로 통일할지 고민
const styles = StyleSheet.create({
  activeBottomButton: {
    width: '100%',
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    backgroundColor: colors.themeColor,
  },
  inactiveBottomButton: {
    width: '100%',
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    backgroundColor: colors.gray1,
  },
  whiteText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 700,
  },
  grayText: {
    color: colors.gray2,
    fontSize: 16,
    fontWeight: 700,
  },
  createPostButton: {
    position: 'absolute',
    bottom: 50,
    right: 50,
    width: 50,
    height: 50,
    backgroundColor: colors.themeColor,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeCategoryButton: {
    height: 40,
    backgroundColor: colors.themeColor,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    paddingHorizontal: 21,
  },
  inactiveCategoryButton: {
    height: 40,
    backgroundColor: 'white',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: colors.gray2,
  },
  navigateButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 20,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.gray2,
  },
  addPhotoButton: {
    width: 90,
    height: 90,
    backgroundColor: colors.vPale,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inactiveFreeButton: {
    width: 90,
    height: 40,
    borderWidth: 1,
    borderColor: colors.vPale,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeFreeButton: {
    width: 90,
    height: 40,
    backgroundColor: colors.themeColor,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButton: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
    paddingVertical: 13,
    paddingHorizontal: 28,
    borderRadius: 25,
    alignItems: 'center',
  },
  activeSubmitButton: {
    backgroundColor: colors.themeColor,
  },
  disabledSubmitButton: {
    backgroundColor: colors.gray1,
  },
  buttonText: {},
  activeButtonText: {
    ...fontStyles.whiteSemiBold14,
  },
  disabledButtonText: {
    ...fontStyles.gray2SemiBold14,
  },
});

const ReviewButtonstyles = StyleSheet.create({
  reviewButton: {
    backgroundColor: colors.themeColor,
    height: 32,
    paddingHorizontal: 16,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: 90,
  },
  reviewButtonText: {
    ...fontStyles.whiteSemiBold14,
  },
});

const EncourageButtonstyles = StyleSheet.create({
  button: {
    alignSelf: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: colors.vPale,
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 20,
    marginVertical: 10,
    position: 'absolute', // 겹치는 위치 설정
    top: '11%',
    left: '50%',
    transform: [{ translateX: -50 }, { translateY: -50 }], // 버튼을 중앙에 정렬
    zIndex: 1,
  },
  disabledButton: {
    backgroundColor: 'white', // 비활성화 상태 색상
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    ...fontStyles.themeMedium14,
  },
  totalCountText: {
    ...fontStyles.themeSemibold16,
    marginLeft: 10,
  },
});

export {
  BottomButton,
  CreatePostButton,
  CategoryButton,
  NavigateButton,
  AddPhotoButton,
  FreeButton,
  NavigateButtonTheme,
  SubmitButton,
  ReviewButton,
  BasicButton,
  EncourageButton,
};
