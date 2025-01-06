import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { runOnUI, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import colors from '../styles/Colors';
import fontStyles from '../styles/FontStyles';

const LevelProgress = ({ rentalCount, onLevelChange }) => {
    const levelImages = {
        '씨앗': require('../assets/images/level_seed.png'),
        '새싹': require('../assets/images/level_sprout.png'),
        '풀': require('../assets/images/level_grass.png'),
        '나무': require('../assets/images/level_tree.png'),
        '숲': require('../assets/images/level_forest.png'),
        '지구': require('../assets/images/level_earth.png'),
    };

    const thresholds = [10, 30, 60, 80, 100]; // 각 레벨의 기준값
    const levels = ['씨앗', '새싹', '풀', '나무', '숲', '지구'];

    // 현재 레벨 계산
    const getLevel = (count) => {
        for (let i = 0; i < thresholds.length; i++) {
            if (count < thresholds[i]) return levels[i];
        }
        return levels[levels.length - 1];
    };

    // 프로그래스 바의 전체 퍼센트 계산
    const getProgress = (count) => {
        if (count >= 100) return 100; // 100 이상일 경우 프로그래스 바 고정
        const currentThreshold = thresholds.find((value) => count < value) || 100;
        const previousThreshold = thresholds[thresholds.indexOf(currentThreshold) - 1] || 0;

        // 각 레벨 내에서 퍼센트 계산
        const levelProgress = ((count - previousThreshold) / (currentThreshold - previousThreshold)) * 20;
        const baseProgress = (thresholds.indexOf(currentThreshold) * 20);
        return baseProgress + levelProgress;
    };

    // 다음 레벨까지 남은 정보
    const getNextLevelInfo = (count) => {
        for (let i = 0; i < thresholds.length; i++) {
            if (count < thresholds[i]) {
                const remaining = thresholds[i] - count;
                return { nextLevel: levels[i + 1], remaining };
            }
        }
        return { nextLevel: '최고 레벨', remaining: 0 };
    };

    const level = getLevel(rentalCount);
    const progress = getProgress(rentalCount);
    const { nextLevel, remaining } = getNextLevelInfo(rentalCount);

    const levelScale = useSharedValue(1);

    useEffect(() => {
        if (onLevelChange) {
            onLevelChange(level); // 레벨 변경 시 콜백 함수 호출
        }
    }, [level, onLevelChange]);

    useEffect(() => {
        runOnUI(() => {
            'worklet';
            levelScale.value = withTiming(1.2, { duration: 500 }, () => {
                levelScale.value = withTiming(1, { duration: 500 });
            });
        })();
    }, [level]);

    const animatedStyle = useAnimatedStyle(() => {
        'worklet';
        return {
            transform: [{ scale: levelScale.value }],
        };
    });

    return (
        <View style={styles.levelContainer}>
            <Animatable.Image
                source={levelImages[level]}
                style={[styles.levelIcon, animatedStyle]}
                duration={2000}
                animation={[0, 10, 30, 60, 80, 100].includes(rentalCount) ? "tada" : undefined}
            />
            {level !== '지구' ? (
                <Text style={styles.nextlevelText}>{`${nextLevel}까지 ${remaining}건 남음`}</Text>
            ) : (
                <View style={styles.placeholderText} /> // 여백을 유지하기 위한 빈 View
            )}
            <View style={styles.levelProgressContainer}>
                <View style={styles.levelProgress}>
                    <View
                        style={[
                            styles.progressBar,
                            { width: `${progress}%` },
                        ]}
                    />
                </View>
                {['0%', '20%', '40%', '60%', '80%', '100%'].map((position, index) => {
                    const isCovered = parseInt(position) <= progress;
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
                        { left: `${progress}%` },
                    ]}
                >
                    <Text style={styles.progressIndicatorText}>
                        {rentalCount}
                    </Text>
                </View>
            </View>
            <View style={styles.levelLabels}>
                {['씨앗', '새싹', '풀', '나무', '숲', '지구'].map((label, index) => (
                    <Text key={index} style={[styles.levelLabel, label == level ? styles.activeLevelLabel : styles.inactiveLevelLabel,
                    ]}
                    >
                        {label}
                    </Text>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    levelContainer: {
        alignItems: 'center',
        justifyContent: 'flex-end',
        height: 400,
    },
    levelIcon: {
        width: 320,
        height: 320,
        marginBottom: 5,
    },
    nextlevelText: {
        ...fontStyles.lightBlackMedium14,
        marginBottom: 10,
    },
    placeholderText: {
        marginBottom: 30,
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
    activeLevelLabel: {
        ...fontStyles.lightBlackMedium14,
    },
    inactiveLevelLabel: {
        ...fontStyles.gray3Medium14,
    },
});

export default LevelProgress;