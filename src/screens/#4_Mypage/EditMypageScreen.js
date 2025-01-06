import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    KeyboardAvoidingView,
    ScrollView,
    Platform,
} from 'react-native';
import ToastMessage from '../../components/ToastMessage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigateHeader } from '../../components/CustomHeaders';
import { useNavigation } from '@react-navigation/native';
import { SubmitButton } from '../../components/Buttons';
import Toast from 'react-native-toast-message';
import { launchImageLibrary } from 'react-native-image-picker';
import UserProfileImage from '../../components/UserProfileImage';
import { InputFieldWithClear } from '../../components/InputFields';

const EditMypageScreen = () => {
    const navigation = useNavigation();

    const [nickname, setNickname] = useState('');
    const [intro, setIntro] = useState('');
    const [profileImage, setProfileImage] = useState('https://via.placeholder.com/100');

    const handleSubmitProfile = () => {
        console.log('닉네임:', nickname);
        console.log('소개글:', intro);
        console.log('프로필 이미지:', profileImage);
        Toast.show({
            type: 'success',
            text1: '저장되었습니다',
        });
    };

    const handleEditProfileImage = () => {
        launchImageLibrary(
            {
                mediaType: 'photo',
                maxWidth: 300,
                maxHeight: 300,
                quality: 0.8,
            },
            (response) => {
                if (response.didCancel) {
                    console.log('사용자가 이미지 선택을 취소했습니다.');
                } else if (response.errorCode) {
                    console.error('이미지 선택 에러:', response.errorMessage);
                } else if (response.assets && response.assets.length > 0) {
                    const selectedImage = response.assets[0].uri;
                    setProfileImage(selectedImage);
                }
            }
        );
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <SafeAreaView style={styles.container}>
                <ScrollView
                    contentContainerStyle={styles.scrollViewContent}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={{ paddingHorizontal: 20 }}>
                        <NavigateHeader navigation={navigation} title="내 정보" />
                    </View>
                    <UserProfileImage profileImage={profileImage} onEditProfileImage={handleEditProfileImage} />
                    <InputFieldWithClear
                        label="닉네임"
                        value={nickname}
                        onChangeText={setNickname}
                        placeholder="닉네임을 입력해주세요"
                        onClear={() => setNickname('')}
                    />
                    <InputFieldWithClear
                        label="소개글"
                        value={intro}
                        onChangeText={setIntro}
                        placeholder="자기소개를 입력해주세요"
                        onClear={() => setIntro('')}
                    />
                </ScrollView>
                <View style={styles.submitButtonContainer}>
                    <SubmitButton onPress={handleSubmitProfile} title="저장하기" />
                </View>
                <ToastMessage />
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    scrollViewContent: {
        paddingBottom: 20,
    },
    submitButtonContainer: {
        paddingHorizontal: 16,
        paddingBottom: 16,
        paddingTop: 20,
    },
});

export default EditMypageScreen;
