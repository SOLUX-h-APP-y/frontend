import { StyleSheet, Text, View } from 'react-native';
import colors from '../styles/Colors';
import { NavigateButton, NavigateButtonTheme } from './Buttons';

function BottomBar({ price, title, postId, writerId }) {
  console.log("🚀 BottomBar - postId:", postId);  // ✅ postId 확인용 로그 추가
  console.log("🚀 BottomBar - writerId:", writerId);  // ✅ writerId 확인용 로그 추가

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        1일 /{' '}
        <Text style={{ color: colors.themeColor }}>
          {price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        </Text>
      </Text>
      {title === '재업로드' ? (
        <NavigateButtonTheme
          title={title}
          name="CreatePostScreen"
          chatRoomId={1}
          isCompleted={false}
        />
      ) : (
        <NavigateButtonTheme
          title={title}
          name="ChatScreen"
          // chatRoomId={1}
          postId={postId}
          ownerId={writerId}
          isCompleted={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 100,
    borderWidth: 1,
    borderColor: 0,
    borderTopColor: colors.gray1,
    boxShadow: '4px 0px 8px 4px rgba(0, 0, 0, 0.04)',
    flexDirection: 'row',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontWeight: 700,
    fontSize: 20,
  },
});

export default BottomBar;
