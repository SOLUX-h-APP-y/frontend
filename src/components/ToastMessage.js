import React from 'react';
import Toast from 'react-native-toast-message';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../styles/Colors';
import fontStyles from '../styles/FontStyles';

function ToastMessage() {
    const toastConfig = {
        success: ({ text1 }) => (
            <View style={[styles.toastContainer, styles.success]}>
                <Text style={styles.toastTitle}>{text1}</Text>
            </View>
        ),
    };

    return <Toast config={toastConfig} position="top" topOffset={33} visibilityTime={2000} />;
};

const styles = StyleSheet.create({
    toastContainer: {
        width: '50%',
        height: 30,
        borderRadius: 30,
        marginHorizontal: '5%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    success: {
        backgroundColor: colors.lightBlack,
    },
    toastTitle: {
        ...fontStyles.whiteSemiBold14,
    },
});

export default ToastMessage;
