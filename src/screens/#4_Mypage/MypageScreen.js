import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    SafeAreaView,
} from 'react-native';
import fontStyles from '../../styles/FontStyles';
import PostPreviewItem from '../../components/PostPreviewItem';
import UserProfile from '../../components/UserProfile';
import Tabs from '../../components/Tabs';
import { ReviewButton } from '../../components/Buttons';
import LevelProgress from '../../components/LevelProgress';

const MypageScreen = () => {
    const [activeTab, setActiveTab] = useState('거래중');
    const [isNotificationOn, setIsNotificationOn] = useState(true);
    const tabs = ['거래중', '사용중', '거래완료'];

    const [userData, setUserData] = useState({
        name: '민지',
        intro: '안녕하세요 지구를 사랑하는 민지예요',
        rental_count: 80, // 거래 완료 횟수
        level: '씨앗', // 초기 레벨
    });

    const handleLevelChange = (newLevel) => {
        // 레벨이 변경될 때만 업데이트
        if (userData.level !== newLevel) {
            setUserData((prevData) => ({
                ...prevData,
                level: newLevel,
            }));
        }
    };

    const posts = [
        { id: 1, title: '원피스형 정장 빌려드려요', price: 2500, location: '청파동2가', type: 'borrower', status: '거래중' },
        { id: 2, title: '카메라 빌려드립니다', price: 8500, location: '청파동2가', type: 'borrower', status: '사용중' },
        { id: 3, title: '헤드폰 빌려드립니다', price: 4500, location: '청파동2가', type: 'sharer', status: '거래완료' },
        { id: 4, title: '가방 빌려드립니다', price: 3500, location: '청파동2가', type: 'sharer', status: '거래완료' },
    ];

    const filteredPosts = posts.filter((post) => post.status === activeTab); // 활성화된 탭에 따라 필터링

    const renderPost = ({ item }) => (
        <View style={styles.postCardContainer}>
            {item.status === '거래완료' && (
                <ReviewButton onPress={() => console.log(`후기 보기 for item ${item.id}`)} />
            )}
            <PostPreviewItem data={item} />
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={filteredPosts}
                renderItem={renderPost}
                keyExtractor={(item) => item.id.toString()}
                style={styles.transactionList}
                ListHeaderComponent={
                    <>
                        <UserProfile
                            userData={userData}
                            isNotificationOn={isNotificationOn}
                            setIsNotificationOn={setIsNotificationOn}
                        />
                        <LevelProgress
                            rentalCount={userData.rental_count} // 거래 완료 횟수 전달
                            onLevelChange={handleLevelChange} // 레벨 변경 시 콜백 함수 전달
                        />
                        <View style={styles.tabsContainer}>
                            <Text style={styles.tabsTitle}>내 글 보기</Text>
                        </View>
                        <Tabs
                            tabs={tabs}
                            activeTab={activeTab}
                            setActiveTab={setActiveTab}
                        />
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
    tabsContainer: {
        flexDirection: 'row',
        marginTop: 40,
    },
    tabsTitle: {
        marginLeft: 7,
        ...fontStyles.blackSemiBold24,
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
        position: 'relative',
    },
});

export default MypageScreen; 