import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import colors from '../styles/Colors';
import fontStyles from '../styles/FontStyles';

const Tabs = ({ tabs, activeTab, setActiveTab }) => {
    return (
        <View style={styles.tabs}>
            {['거래중', '대여중', '거래완료'].map((tab) => (
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
    );
};

const styles = StyleSheet.create({
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
});

export default Tabs;