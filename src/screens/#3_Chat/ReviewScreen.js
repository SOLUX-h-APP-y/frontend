import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    KeyboardAvoidingView,
    Platform,
    Keyboard,
    ScrollView,
    TouchableWithoutFeedback,
} from 'react-native';
import { PlainInputField } from '../../components/InputFields';
import colors from '../../styles/Colors';
import fontStyles from '../../styles/FontStyles';
import { SubmitButton } from '../../components/Buttons';
import Toast from 'react-native-toast-message';
import { NavigateHeader, PostHeader } from '../../components/CustomHeaders';
import { getTokens } from '../../services/TokenManager';
import axios from 'axios';
import { API_BASE_URL } from 'react-native-dotenv'
import { setAuthToken } from '../../services/api';

const ReviewScreen = ({ route, navigation }) => {
    const { postId, revieweeId, postData } = route.params; // API 요청에 필요한 데이터 전달
    const [loadingPost, setLoadingPost] = useState(false);

    const [rating, setRating] = useState(0); // 초기 별점 값
    const [reviewText, setReviewText] = useState('');
    const [loading, setLoading] = useState(false); // 로딩 상태 추가

    const handleStarPress = (value) => {
        setRating(value);
    };

    const handleSubmitReview = async () => {
        setLoading(true);
        try {
            const tokens = await getTokens();

            const accessToken = tokens.accessToken;
            setAuthToken(accessToken);

            console.log('Authorization Header:', `Bearer ${accessToken}`);
            console.log('Request Body:', { revieweeId, rate: rating, content: reviewText });

            // 리뷰 작성 API 호출
            const response = await axios.post(
                `${API_BASE_URL}/reviews/${postId}`,
                {
                    revieweeId,
                    rate: rating,
                    content: reviewText,
                },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (response.status === 200) {
                Toast.show({
                    type: 'success',
                    text1: '후기 작성 완료',
                });
                navigation.goBack(); // 작성 완료 후 이전 화면으로 이동
            }
        } catch (error) {
            console.error('🚨 후기 작성 실패:', error.response?.data || error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ paddingHorizontal: 20 }}>
                <NavigateHeader navigation={navigation} title="후기 작성" />
            </View>
            {loadingPost ? (
                <ActivityIndicator size="large" color={colors.themeColor} style={{ marginTop: 20 }} />
            ) : (
                postData && (
                    <PostHeader
                        post={{
                            id: postData.postId,
                            title: postData.title,
                            image: postData.previewImage,
                            location: postData.locationName,
                            status: postData.postStatus,
                        }}
                    />
                )
            )}
            {/* 키보드가 올라왔을 때 키보드 영역 외의 다른 영역을 터치하면 키보드가 내려감 */}
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView // 키보드가 올라와도 화면이 가려지지 않도록 키보드 뷰 사용
                    style={styles.avoidingView}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                >
                    <ScrollView // 키보드가 올라와도 화면이 가려지지 않도록 스크롤뷰 사용
                        contentContainerStyle={styles.scrollContainer}
                        showsVerticalScrollIndicator={false}
                    >
                        <View style={styles.reviewContainer}>
                            <Text style={styles.reviewTitle}>
                                거래가 완료되었습니다{'\n'}별점을 입력해주세요
                            </Text>
                            <View style={styles.starsContainer}>
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <TouchableOpacity
                                        key={star}
                                        onPress={() => handleStarPress(star)}
                                    >
                                        <Text
                                            style={[
                                                styles.star,
                                                rating >= star && styles.activeStar,
                                            ]}
                                        >
                                            ★
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                            <Text style={styles.ratingText}>{rating}점</Text>
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.inputLabel}>후기 입력 (선택)</Text>
                            <PlainInputField
                                placeholder="ex) 감사합니다!"
                                value={reviewText}
                                onChangeText={setReviewText}
                                isTextarea={false} // 한 줄 입력
                            />
                        </View>
                    </ScrollView>
                    {/* 저장하기 버튼을 하단에 고정 */}
                    <View style={styles.fixedButtonContainer}>
                        <SubmitButton onPress={handleSubmitReview} title="저장하기" disabled={rating === 0} />
                    </View>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    avoidingView: {
        flex: 1,
    },
    scrollContainer: {
        flexGrow: 1,
        paddingBottom: 80, // 저장 버튼과의 공간 확보
    },
    reviewContainer: {
        alignItems: 'center',
        marginTop: 15,
        marginBottom: 25,
        padding: 30,
        borderWidth: 1,
        borderColor: colors.gray2,
        borderRadius: 30,
        marginHorizontal: 16,
    },
    reviewTitle: {
        ...fontStyles.blackSemiBold16,
        textAlign: 'center',
        marginBottom: 20,
    },
    starsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 10,
    },
    star: {
        fontSize: 40,
        color: colors.gray2,
        marginHorizontal: 10,
    },
    activeStar: {
        color: colors.themeColor,
    },
    ratingText: {
        ...fontStyles.blackSemiBold20,
        marginTop: 10,
    },
    inputContainer: {
        marginHorizontal: 16,
        marginBottom: 20,
    },
    inputLabel: {
        ...fontStyles.blackSemiBold20,
        marginBottom: 8,
    },
    fixedButtonContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 16,
        backgroundColor: 'transparent',
    },
});

export default ReviewScreen;
