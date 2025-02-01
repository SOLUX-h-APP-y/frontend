import React, { useEffect, useState } from 'react';
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
import { getTokens } from '../../services/TokenManager';
import axios from 'axios';
import { API_BASE_URL } from 'react-native-dotenv';


const EditMypageScreen = () => {
    const navigation = useNavigation();

    const [nickname, setNickname] = useState('');
    const [intro, setIntro] = useState('');
    const [profileImage, setProfileImage] = useState(require('../../assets/images/defaultProfile.png'));
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            setLoading(true);
            try {
                const tokens = await getTokens();

                if (!tokens || !tokens.accessToken) {
                    Alert.alert('로그인이 필요합니다', '다시 로그인해주세요.', [
                        { text: '확인', onPress: () => navigation.navigate('LoginScreen') },
                    ]);
                    return;
                }

                const accessToken = tokens.accessToken;

                const response = await axios.get(`${API_BASE_URL}/profiles/me`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                const { nickname, bio, profileImage } = response.data;
                setNickname(nickname);
                setIntro(bio);
                setProfileImage(profileImage);
            } catch (error) {
                console.error('프로필 불러오기 실패:', error.message);
                Alert.alert('오류', '프로필을 불러오는 데 실패했습니다. 다시 시도해주세요.');
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [navigation]);

    const handleSubmitProfile = async () => {
        setLoading(true);
        try {
            const tokens = await getTokens();

            if (!tokens || !tokens.accessToken) {
                Alert.alert('로그인이 필요합니다', '다시 로그인해주세요.', [
                    { text: '확인', onPress: () => navigation.navigate('LoginScreen') },
                ]);
                return;
            }

            const accessToken = tokens.accessToken;

            // FormData 생성
            const formData = new FormData();
            formData.append('nickname', nickname);
            formData.append('bio', intro || '');

            if (profileImage && profileImage !== require('../../assets/images/defaultProfile.png')) {
                formData.append('profileImageFile', {
                    uri: profileImage,
                    name: 'profile_image.jpg',
                    type: 'image/jpeg',
                });
            }

            // PATCH 요청
            const response = await axios.patch(`${API_BASE_URL}/profiles/me`, formData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('Response:', response.data);

            Toast.show({
                type: 'success',
                text1: '저장되었습니다',
            });
        } catch (error) {
            if (error.response) {
                console.error('프로필 업데이트 실패:', error.response.data);
                Alert.alert('오류', '프로필 업데이트에 실패했습니다. 다시 시도해주세요.');
            } else {
                console.error('프로필 업데이트 실패:', error.message);
                Alert.alert('오류', '프로필 업데이트에 실패했습니다. 다시 시도해주세요.');
            }
        } finally {
            setLoading(false);
        }
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
                    <SubmitButton
                        onPress={handleSubmitProfile}
                        title={loading ? '저장 중...' : '저장하기'}
                        disabled={loading}
                    />
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
