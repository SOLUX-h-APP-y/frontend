import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Modal,
    TouchableOpacity,
    Image
} from 'react-native';
import fontStyles from '../styles/FontStyles';
import colors from '../styles/Colors';

const ReviewModal = ({ visible, onClose, reviews }) => {
    const renderReview = (item) => (
        <View style={styles.reviewContainer}>
            {/* 별점 점수 */}
            <View style={styles.ratingSection}>
                <Text style={styles.rateLabel}>별점</Text>
                <Text style={styles.rateValue}>{item.rate}점</Text>
            </View>

            {/* 별 UI 섹션 */}
            <View style={styles.ratingCard}>
                <View style={styles.starsContainer}>
                    {Array.from({ length: 5 }, (_, index) => (
                        <Text
                            key={index}
                            style={[
                                styles.star,
                                { color: index < item.rate ? colors.themeColor : colors.gray2 },
                            ]}
                        >
                            ★
                        </Text>
                    ))}
                </View>
            </View>

            {/* 후기 카드 */}
            <Text style={styles.reviewTitle}>후기</Text>
            <View style={styles.reviewCard}>
                <Text style={styles.reviewContent}>{item.content}</Text>
            </View>
        </View>
    );

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="slide"
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    {/* 닫기 버튼 */}
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={onClose}
                    >
                        <Image
                            source={require('../assets/images/close.png')} // close.png 경로를 프로젝트에 맞게 수정
                            style={styles.closeButton}
                        />
                    </TouchableOpacity>

                    {/* 리뷰 렌더링 */}
                    {reviews.map((item, index) => (
                        <View key={index}>{renderReview(item)}</View>
                    ))}
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 36,
        padding: 15,
        alignItems: 'center',
    },
    closeButton: {
        alignSelf: 'flex-end',
        marginTop: 5,
        marginRight: 5,
        width: 12,
        height: 12,
    },
    reviewContainer: {
        marginTop: 20,
    },
    ratingSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        marginLeft: 7,
    },
    ratingCard: {
        backgroundColor: 'white',
        borderRadius: 30,
        height: 58,
        marginBottom: 15,
        width: 288,
        borderWidth: 1,
        borderColor: colors.gray2,
        justifyContent: 'center',
        alignItems: 'center', // 별점 카드는 중앙 정렬
    },
    rateLabel: {
        ...fontStyles.lightBlackSemiBold14,
    },
    rateValue: {
        ...fontStyles.lightBlackSemiBold20,
        marginLeft: 10,
    },
    starsContainer: {
        marginTop: 7,
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        height: '100%',
    },
    star: {
        fontSize: 40,
        marginHorizontal: 3,
        textAlign: 'center',
    },
    reviewCard: {
        backgroundColor: 'white',
        borderRadius: 30,
        padding: 15,
        marginBottom: 30,
        width: '100%',
        borderWidth: 1,
        borderColor: colors.gray2,
        alignItems: 'flex-start', // 후기 카드는 왼쪽 정렬
    },
    reviewTitle: {
        ...fontStyles.lightBlackSemiBold14,
        marginTop: 10,
        marginBottom: 5,
        marginLeft: 7,
    },
    reviewContent: {
        ...fontStyles.lightBlackMedium14,
        marginLeft: 7,
    },
});

export default ReviewModal;
