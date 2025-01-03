import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    FlatList,
    SafeAreaView,
} from 'react-native';
import colors from '../../styles/Colors';
import fontStyles from '../../styles/FontStyles';
import * as Animatable from 'react-native-animatable';
import { runOnUI, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import PostPreviewItem from '../../components/PostPreviewItem';

const MypageScreen = () => {
    const [activeTab, setActiveTab] = useState('거래중');

    const userData = {
        name: '민지',
        intro: '안녕하세요 지구를 사랑하는 민지예요',
        level: '지구 단계',
        levelProgress: 60,
        nextLevel: '새싹까지 2건 남음',
    };

    const posts = [
        { id: 1, title: '원피스형 정장 빌려드려요', price: 2500, location: '청파동2가', type: 'borrower', status: '거래중' },
        { id: 2, title: '카메라 빌려드립니다', price: 8500, location: '청파동2가', type: 'borrower', status: '사용중' },
        { id: 3, title: '헤드폰 빌려드립니다', price: 4500, location: '청파동2가', type: 'sharer', status: '거래완료' },
        { id: 4, title: '가방 빌려드립니다', price: 3500, location: '청파동2가', type: 'sharer', status: '거래완료' },
    ];

    const filteredPosts = posts.filter((post) => post.status === activeTab);

    const renderPost = ({ item }) => (
        <View style={styles.postCardContainer}>
            {item.status === '거래완료' && (
                <TouchableOpacity style={styles.reviewButton}>
                    <Text style={styles.reviewButtonText}>후기 보기</Text>
                </TouchableOpacity>
            )}
            <PostPreviewItem data={item} />
        </View>
    );

    const levelImages = {
        '씨앗 단계': require('../../assets/images/level_seed.png'),
        '새싹 단계': require('../../assets/images/level_sprout.png'),
        '풀 단계': require('../../assets/images/level_grass.png'),
        '나무 단계': require('../../assets/images/level_tree.png'),
        '숲 단계': require('../../assets/images/level_forest.png'),
        '지구 단계': require('../../assets/images/level_earth.png'),
    };

    const levelScale = useSharedValue(1);

    useEffect(() => {
        runOnUI(() => {
            'worklet';
            levelScale.value = withTiming(1.2, { duration: 500 }, () => {
                levelScale.value = withTiming(1, { duration: 500 });
            });
        })();
    }, [userData.level]);

    const animatedStyle = useAnimatedStyle(() => {
        'worklet';
        return {
            transform: [{ scale: levelScale.value }],
        };
    });

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={filteredPosts}
                renderItem={renderPost}
                keyExtractor={(item) => item.id.toString()}
                style={styles.transactionList}
                ListHeaderComponent={
                    <>
                        <View style={styles.header}>
                            <Image
                                source={{ uri: 'https://via.placeholder.com/50' }}
                                style={styles.profileImage}
                            />
                            <View style={styles.userInfo}>
                                <TouchableOpacity>
                                    <View style={styles.editContainer}>
                                        <Text style={styles.editInfo}>내 정보 수정하기</Text>
                                        <Image
                                            source={require('../../assets/icons/editIcon.png')}
                                            style={styles.editIcon}
                                        />
                                    </View>
                                </TouchableOpacity>
                                <View style={styles.userNameLevelContainer}>
                                    <Text style={styles.userName}>{userData.name}</Text>
                                    <Text style={styles.userLevel}>{userData.level}</Text>
                                </View>
                                <Text style={styles.userIntro}>{userData.intro}</Text>
                            </View>
                            <TouchableOpacity>
                                <Image
                                    source={require('../../assets/icons/bellIcon.png')}
                                    style={styles.notificationIcon}
                                />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.levelContainer}>
                            <Animatable.Image
                                source={levelImages[userData.level]}
                                style={[styles.levelIcon, animatedStyle]}
                                duration={1000}
                                animation="zoomIn"
                            />
                            <Text style={styles.levelText}>{userData.nextLevel}</Text>
                            <View style={styles.levelProgressContainer}>
                                <View style={styles.levelProgress}>
                                    <View
                                        style={[
                                            styles.progressBar,
                                            { width: `${userData.levelProgress}%` },
                                        ]}
                                    />
                                </View>
                                {['1%', '20%', '40%', '60%', '80%', '99%'].map((position, index) => {
                                    const isCovered = parseInt(position) <= userData.levelProgress;
                                    return (
                                        <View
                                            key={index}
                                            style={[
                                                styles.progressDot,
                                                { left: position, opacity: isCovered ? 0 : 1 },
                                            ]}
                                        />
                                    );
                                })}
                                <View
                                    style={[
                                        styles.progressIndicator,
                                        { left: `${userData.levelProgress}%` },
                                    ]}
                                >
                                    <Text style={styles.progressIndicatorText}>
                                        {userData.levelProgress}%
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.levelLabels}>
                                {['씨앗', '새싹', '풀', '나무', '숲', '지구'].map((label, index) => (
                                    <Text key={index} style={styles.levelLabel}>
                                        {label}
                                    </Text>
                                ))}
                            </View>
                        </View>

                        <View style={styles.tabsContainer}>
                            <Text style={styles.tabsTitle}>내 글 보기</Text>
                        </View>
                        <View style={styles.tabs}>
                            {['거래중', '사용중', '거래완료'].map((tab) => (
                                <TouchableOpacity
                                    key={tab}
                                    style={[
                                        styles.tab,
                                        activeTab === tab && styles.activeTab,
                                        { width: `${100 / 3}%` },
                                        activeTab == tab ? styles.activeTab : styles.inactiveTab,
                                    ]}
                                    onPress={() => setActiveTab(tab)}
                                >
                                    <Text
                                        style={[
                                            styles.tabText,
                                            activeTab === tab && styles.activeTabText,
                                        ]}
                                    >
                                        {tab}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </>
                }
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 3,
        borderBottomColor: colors.gray1,
    },
    profileImage: {
        width: 72,
        height: 72,
        borderRadius: 40,
    },
    userInfo: {
        flex: 1,
        marginLeft: 15,
    },
    editContainer: {
        flexDirection: 'row', // 가로 방향 배치
        alignItems: 'center', // 수직 정렬
    },
    editInfo: {
        ...fontStyles.gray3Medium14,
    },
    editIcon: {
        width: 4.2, // 아이콘 크기
        height: 9.1,
        marginLeft: 10, // 텍스트와 아이콘 간격
    },
    userNameLevelContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    userName: {
        ...fontStyles.blackSemiBold20,
    },
    userLevel: {
        ...fontStyles.gray4SemiBold16,
        marginLeft: 5,
    },
    userIntro: {
        ...fontStyles.lightBlackMedium14,
    },
    notificationIcon: {
        width: 16,
        height: 19.5,
        marginRight: 10,
        marginBottom: 50,
    },
    levelContainer: {
        alignItems: 'center',
        justifyContent: 'flex-end', // 아래쪽으로 정렬
        height: 400,
    },
    levelIcon: {
        width: 100,
        height: 100,
        marginBottom: 25,
    },
    levelText: {
        ...fontStyles.lightBlackMedium14,
        marginBottom: 20,
    },
    levelProgressContainer: {
        position: 'relative',
        width: '87%',
        alignItems: 'center',
    },
    progressDot: {
        position: 'absolute',
        top: 0,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: colors.gray2,
        zIndex: 3,
        transition: 'opacity 0.2s ease-in-out', // 애니메이션 효과
    },
    levelProgress: {
        height: 8,
        width: '100%',
        backgroundColor: colors.gray1,
        marginBottom: 8,
        position: 'relative',
        borderRadius: 10,
        zIndex: 1,
    },
    progressBar: {
        height: '100%',
        backgroundColor: colors.themeColor,
        position: 'relative',
        borderRadius: 10,
        zIndex: 2,
    },
    progressIndicator: {
        position: 'absolute',
        top: -10,
        width: 30,
        height: 30,
        transform: [{ translateX: -13 }],
        borderRadius: 20,
        backgroundColor: colors.vPale,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 4,
    },
    progressIndicatorText: {
        ...fontStyles.themeMedium14,
    },
    levelLabels: {
        ...fontStyles.gray3Medium14,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '95%',
        marginTop: 15,
    },
    levelLabel: {
        ...fontStyles.lightBlackMedium14,
    },
    tabsContainer: {
        flexDirection: 'row',
        marginTop: 40,
    },
    tabsTitle: {
        marginLeft: 7,
        ...fontStyles.blackSemiBold24,
    },
    tabs: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        ...fontStyles.gray3Medium14,
        marginBottom: 15,
    },
    tab: {
        padding: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 3,
    },
    activeTab: {
        borderBottomWidth: 2,
        borderBottomColor: colors.themeColor,
    },
    inactiveTab: {
        borderBottomWidth: 2,
        borderBottomColor: colors.gray1,
        ...fontStyles.gray3Medium14,
    },
    tabText: {
        ...fontStyles.gray3Medium14,
    },
    activeTabText: {
        ...fontStyles.lightBlackMedium14,
    },
    transactionList: {
        flex: 1,
        padding: 16,
    },
    list: {
        padding: 10,
    },
    postCardContainer: {
        marginBottom: 20,
        position: 'relative', // "후기 보기" 버튼 위치를 조정하기 위해 사용
    },
    reviewButton: {
        position: 'absolute',
        top: 25, // "PostPreviewItem" 위에 배치
        right: 20,
        backgroundColor: colors.themeColor,
        paddingVertical: 8,
        paddingHorizontal: 25,
        borderRadius: 20,
        zIndex: 10, // 항상 위에 표시되도록 설정
    },
    reviewButtonText: {
        ...fontStyles.whiteSemiBold14,
    },
});

export default MypageScreen; 