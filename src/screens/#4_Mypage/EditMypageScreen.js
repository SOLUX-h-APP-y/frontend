import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image,
    KeyboardAvoidingView,
    ScrollView,
    Platform,
    Keyboard,
    Animated,
} from 'react-native';
import ToastMessage from '../../components/ToastMessage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigateHeader } from '../../components/CustomHeaders';
import { useNavigation } from '@react-navigation/native';
import { SubmitButton } from '../../components/Buttons';
import colors from '../../styles/Colors';
import Toast from 'react-native-toast-message';
import fontStyles from '../../styles/FontStyles';
import { launchImageLibrary } from 'react-native-image-picker';

const EditMypageScreen = () => {
    const navigation = useNavigation();

    const [nickname, setNickname] = useState('');
    const [intro, setIntro] = useState('');
    const [profileImage, setProfileImage] = useState('https://via.placeholder.com/100');
    const fadeAnim = new Animated.Value(1); // 버튼 투명도 초기값

    useEffect(() => {
        const showSubscription = Keyboard.addListener('keyboardWillShow', () => {
            Animated.timing(fadeAnim, {
                toValue: 0, // 버튼을 투명하게
                duration: 100, // 애니메이션 속도
                useNativeDriver: true,
            }).start();
        });
        const hideSubscription = Keyboard.addListener('keyboardWillHide', () => {
            Animated.timing(fadeAnim, {
                toValue: 1, // 버튼을 다시 보이게
                duration: 100, // 애니메이션 속도
                useNativeDriver: true,
            }).start();
        });

        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, [fadeAnim]);

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
                    <View style={styles.profileContainer}>
                        <Image
                            source={{ uri: profileImage }}
                            style={styles.profileImage}
                        />
                        <TouchableOpacity style={styles.editButton} onPress={handleEditProfileImage}>
                            <Image source={require('../../assets/icons/editpencilIcon.png')} style={styles.editpencilIcon} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>닉네임</Text>
                        <View style={styles.inputWithClear}>
                            <TextInput
                                style={styles.input}
                                value={nickname}
                                onChangeText={setNickname}
                            />
                            {nickname.length > 0 && (
                                <TouchableOpacity onPress={() => setNickname('')} style={styles.clearButton}>
                                    <Image
                                        source={require('../../assets/icons/clearIcon.png')}
                                        style={styles.clearIcon}
                                    />
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>소개글</Text>
                        <View style={styles.inputWithClear}>
                            <TextInput
                                style={styles.input}
                                value={intro}
                                onChangeText={setIntro}
                            />
                            {intro.length > 0 && (
                                <TouchableOpacity onPress={() => setIntro('')} style={styles.clearButton}>
                                    <Image
                                        source={require('../../assets/icons/clearIcon.png')}
                                        style={styles.clearIcon}
                                    />
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>
                </ScrollView>
                <Animated.View style={[styles.submitButtonContainer, { opacity: fadeAnim }]}>
                    <SubmitButton onPress={handleSubmitProfile} title="저장하기" />
                </Animated.View>
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
    profileContainer: {
        alignItems: 'center',
        marginBottom: 40,
        marginTop: 25,
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
        marginBottom: 20,
        marginHorizontal: 16,
    },
    label: {
        ...fontStyles.blackSemiBold20,
        marginBottom: 8,
    },
    inputWithClear: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: colors.gray2,
        borderRadius: 30,
        paddingHorizontal: 20,
    },
    input: {
        flex: 1,
        height: 48,
        ...fontStyles.lightBlackMedium14,
    },
    clearButton: {
        padding: 0,
    },
    clearIcon: {
        width: 20,
        height: 20,
    },
    submitButtonContainer: {
        paddingHorizontal: 16,
        paddingBottom: 16,
        paddingTop: 20,
    },
});

export default EditMypageScreen;
