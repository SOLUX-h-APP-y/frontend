import React, { useState } from 'react';
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
import { ScrollView } from 'react-native-gesture-handler';

const MypageScreen = () => {
    const [activeTab, setActiveTab] = useState('거래중');

    const userData = {
        name: '민지',
        intro: '안녕하세요 지구를 사랑하는 민지예요',
        level: '씨앗 단계',
        levelProgress: 20,
        nextLevel: '새싹까지 2건 남음',
    };

    const transactions = [
        {
            id: 1,
            title: '원피스형 정장 빌려드려요',
            price: 2500,
            location: '청파동2가',
        },
        {
            id: 2,
            title: '카메라 빌려드립니다',
            price: 8500,
            location: '청파동2가',
        },
        {
            id: 3,
            title: '헤드폰 빌려드립니다',
            price: 4500,
            location: '청파동2가',
        },
    ];

    const renderTransaction = ({ item }) => (
        <View style={styles.transactionCard}>
            <View>
                <Text style={styles.transactionTitle}>{item.title}</Text>
                <Text style={styles.transactionLocation}>{item.location}</Text>
            </View>
            <View style={styles.transactionDetails}>
                <Text style={styles.transactionPrice}>{item.price.toLocaleString()} 원</Text>
                <TouchableOpacity style={styles.transactionButton}>
                    <Text style={styles.transactionButtonText}>빌려주세요</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={transactions}
                renderItem={renderTransaction}
                keyExtractor={(item) => item.id.toString()}
                style={styles.transactionList}
                ListHeaderComponent={
                    <>
                        {/* ProfileHeader */}
                        <View style={styles.header}>
                            <Image
                                source={{
                                    uri: 'https://via.placeholder.com/50', // 프로필 이미지 URL
                                }}
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
                                    source={require('../../assets/icons/bellIcon.png')} // 알림 아이콘
                                    style={styles.notificationIcon}
                                />
                            </TouchableOpacity>
                        </View>

                        {/* Level Progress */}
                        <View style={styles.levelContainer}>
                            <Image
                                source={require('../../assets/images/level_1.png')} // 씨앗 아이콘
                                style={styles.levelIcon}
                            />
                            <Text style={styles.levelText}>{userData.nextLevel}</Text>
                            <View style={styles.levelProgressContainer}>
                                {/* Background Bar */}
                                <View style={styles.levelProgress}>
                                    {/* Progress Bar */}
                                    <View style={[styles.progressBar, { width: `${userData.levelProgress}%` }]} />
                                </View>

                                {/* Dots */}
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

                                {/* Progress Indicator */}
                                <View style={[styles.progressIndicator, { left: `${userData.levelProgress}%` }]}>
                                    <Text style={styles.progressIndicatorText}>{userData.levelProgress}</Text>
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

                        {/* Tabs */}
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
        marginRight: 20,
        marginBottom: 30,
    },
    levelContainer: {
        alignItems: 'center',
        justifyContent: 'flex-end', // 아래쪽으로 정렬
        height: 400,
    },
    levelIcon: {
        width: 54,
        height: 54,
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
    transactionCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: colors.gray2,
    },
    transactionTitle: {
        ...fontStyles.blackBold16,
    },
    transactionLocation: {
        ...fontStyles.gray3Medium12,
    },
    transactionDetails: {
        alignItems: 'flex-end',
    },
    transactionPrice: {
        ...fontStyles.blackBold16,
    },
    transactionButton: {
        backgroundColor: colors.themeColor,
        borderRadius: 20,
        paddingVertical: 4,
        paddingHorizontal: 12,
        marginTop: 8,
    },
    transactionButtonText: {
        ...fontStyles.whiteMedium14,
    },
});

export default MypageScreen;
