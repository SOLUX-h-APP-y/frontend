import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView } from 'react-native';
import ToastMessage from '../../components/ToastMessage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigateHeader } from '../../components/CustomHeaders';
import { useNavigation } from '@react-navigation/native';
import { PlainInputField } from '../../components/InputFields';
import { SubmitButton } from '../../components/Buttons';

const EditMypageScreen = () => {

    const navigation = useNavigation();

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <SafeAreaView style={styles.container}>
                <View style={{ paddingHorizontal: 20 }}>
                    <NavigateHeader navigation={navigation} title="내 정보" />
                </View>
                <View style={styles.profileContainer}>
                    <Image
                        source={{ uri: 'https://via.placeholder.com/100' }}
                        style={styles.profileImage}
                    />
                    <TouchableOpacity style={styles.editButton}>
                        <Image source={require('../../assets/icons/editpencilIcon.png')} style={styles.editpencilIcon} />
                    </TouchableOpacity>
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>닉네임</Text>
                    <PlainInputField placeholder="닉네임을 입력해주세요" />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>소개글</Text>
                    <PlainInputField placeholder="닉네임을 입력해주세요" />
                </View>
                <SubmitButton title='저장하기' />
                <ToastMessage />
            </SafeAreaView>
        </KeyboardAvoidingView >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    profileContainer: {
        alignItems: 'center',
        marginBottom: 32,
        marginTop: 30,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    editButton: {
        position: 'absolute',
        top: 70,
        right: 130,
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 0,
    },
    editpencilIcon: {
        width: 40,
        height: 40,
    },
    inputContainer: {
        marginBottom: 16,
    },
    label: {
        fontSize: 16,
        color: '#555555',
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        backgroundColor: '#F8F8F8',
    },
    saveButton: {
        backgroundColor: '#561689',
        paddingVertical: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    saveButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default EditMypageScreen;
