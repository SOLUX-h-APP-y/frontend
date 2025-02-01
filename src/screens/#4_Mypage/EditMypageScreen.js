import React, { useEffect, useState } from 'react';
import {
    View,
    StyleSheet,
    KeyboardAvoidingView,
    ScrollView,
    Platform,
    Text,
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
import colors from '../../styles/Colors';
import api from '../../services/api';
import fontStyles from '../../styles/FontStyles';


const EditMypageScreen = () => {
    const navigation = useNavigation();

    const [nickname, setNickname] = useState('');
    const [intro, setIntro] = useState('');
    const [profileImage, setProfileImage] = useState(require('../../assets/images/defaultProfile.png'));
    const [loading, setLoading] = useState(false);
    const [isNicknameValid, setIsNicknameValid] = useState(null); // 닉네임 중복 체크 상태
    const [checkingNickname, setCheckingNickname] = useState(false); // 닉네임 중복 체크 로딩

    useEffect(() => {
        const fetchProfile = async () => {
            setLoading(true);
            try {
                const tokens = await getTokens();
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
                setIsNicknameValid(true);
            } catch (error) {
                console.error('프로필 불러오기 실패:', error.message);
                Alert.alert('오류', '프로필을 불러오는 데 실패했습니다. 다시 시도해주세요.');
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [navigation]);

    const checkNicknameAvailability = async (newNickname) => {
        if (!newNickname.trim()) {
            setIsNicknameValid(null);
            return;
        }
        setCheckingNickname(true);
        try {
            const response = await api.post(`/auth/check-nickname`, {
                nickname: newNickname,
            });
            setIsNicknameValid(!response.data.isDuplicate);
        } catch (error) {
            console.error('닉네임 중복 검사 실패:', error.message);
        } finally {
            setCheckingNickname(false);
        }
    };

    const handleNicknameChange = (text) => {
        setNickname(text.trim());
        checkNicknameAvailability(text.trim());
    };

    const handleSubmitProfile = async () => {
        if (!isNicknameValid) return;

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
                        onChangeText={handleNicknameChange}
                        placeholder="닉네임을 입력해주세요"
                        onClear={() => {
                            setNickname('');
                            setIsNicknameValid(null);
                        }}
                    />
                    {isNicknameValid !== null && (
                        <Text style={[styles.message, { color: isNicknameValid ? '#00C147' : colors.error }]}>
                            {isNicknameValid ? '사용가능한 닉네임입니다' : '이미 사용중인 닉네임입니다'}
                        </Text>
                    )}
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
                        disabled={loading || !isNicknameValid}
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
    message: {
        paddingHorizontal: 30,
        ...fontStyles.Medium14,
        marginBottom: 12,
    },
});

export default EditMypageScreen;
