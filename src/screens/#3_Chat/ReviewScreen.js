import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { PlainInputField } from '../../components/InputFields';
import colors from '../../styles/Colors';
import fontStyles from '../../styles/FontStyles';
import { SubmitButton } from '../../components/Buttons';
import Toast from 'react-native-toast-message';
import { ChatHeader, PostHeader } from '../../components/CustomHeader';


const ReviewScreen = ({ route, navigation }) => {
    const { chatRoomId } = route.params;

    const post = {
        id: 101,
        title: '카메라 빌려드려요',
        image: 'https://via.placeholder.com/50',
        location: '청파동2가',
    };

    const [rating, setRating] = useState(5); // 초기 별점 값
    const [reviewText, setReviewText] = useState('');

    const handleStarPress = (value) => {
        setRating(value);
    };

    const handleSubmitReview = () => {
        console.log('후기 작성:', { rating, reviewText });
        navigation.goBack(); // 작성 완료 후 이전 화면으로 이동
        Toast.show({
            type: 'success',
            text1: '후기 작성 완료',
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            <ChatHeader navigation={navigation} title="후기 작성" />
            <PostHeader post={post} />
            <View style={styles.reviewContainer}>
                <Text style={styles.reviewTitle}>거래가 완료되었습니다{'\n'}별점을 입력해주세요</Text>
                <View style={styles.starsContainer}>
                    {[1, 2, 3, 4, 5].map((star) => (
                        <TouchableOpacity key={star} onPress={() => handleStarPress(star)}>
                            <Text style={[styles.star, rating >= star && styles.activeStar]}>★</Text>
                        </TouchableOpacity>
                    ))}
                </View>
                <Text style={styles.ratingText}>{rating}점</Text>
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>후기 입력</Text>
                <PlainInputField
                    placeholder="ex) 감사합니다!"
                    value={reviewText}
                    onChangeText={setReviewText}
                    isTextarea={false} // 한 줄 입력
                />
            </View>
            <SubmitButton onPress={handleSubmitReview} title="저장하기" />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
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
});

export default ReviewScreen;
