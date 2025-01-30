import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform, ActivityIndicator, Alert } from 'react-native';
import colors from '../../styles/Colors';
import fontStyles from '../../styles/FontStyles';
import { NavigateHeader, PostHeader } from '../../components/CustomHeaders';
import ToastMessage from '../../components/ToastMessage';
import { getTokens } from '../../services/TokenManager';
import api, { setAuthToken } from '../../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ChatScreen = ({ route, navigation }) => {
    const { isCompleted, toastMessage, postId, ownerId } = route.params || {};
    console.log("🚀 Received route params:", route.params);
    console.log("📌 postId:", postId);
    console.log("📌 ownerId (writerId):", ownerId);
    console.log("📌 chatRoomId:", chatRoomId);
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');
    const [postData, setPostData] = useState(null);
    const [loadingPost, setLoadingPost] = useState(true); // Post 데이터 로딩 상태
    const flatListRef = React.useRef();
    const [renterId, setRenterId] = useState(null);
    const [loggedInId, setLoggedInId] = useState(null); // 로그인한 사용자 ID
    const [chatRoomId, setChatRoomId] = useState(null); // 채팅방 ID 상태 추가
    const [otherUserProfileImage, setOtherUserProfileImage] = useState(null);

    // 🔹 앱이 실행될 때 `AsyncStorage`에서 `chatRoomId` 불러오기
    useEffect(() => {
        const loadChatRoomId = async () => {
            try {
                const storedChatRoomId = await AsyncStorage.getItem(`chatRoomId-${postId}`);
                if (storedChatRoomId) {
                    setChatRoomId(parseInt(storedChatRoomId, 10)); // 🔥 문자열을 숫자로 변환
                    console.log("🔄 기존 chatRoomId 불러옴:", storedChatRoomId);
                }
            } catch (error) {
                console.error("❌ chatRoomId 불러오기 실패:", error);
            }
        };
        loadChatRoomId();
    }, [postId]);

    useEffect(() => {
        if (chatRoomId) {
            fetchChatDetails(chatRoomId);
        }
    }, [chatRoomId]);

    useEffect(() => {
        const fetchLoggedInUserId = async () => {
            try {
                const tokens = await getTokens();
                if (!tokens || !tokens.accessToken) {
                    Alert.alert('로그인이 필요합니다', '다시 로그인해주세요.');
                    navigation.navigate('LoginScreen');
                    return;
                }

                setAuthToken(tokens.accessToken);

                // 로그인한 사용자 정보 가져오기
                const response = await api.get('/profiles/me');
                setLoggedInId(response.data.userId); // 🔥 로그인한 사용자 ID 설정

                console.log("✅ 로그인한 사용자 ID (loggedInId):", response.data.userId);
            } catch (error) {
                Alert.alert('오류', '로그인 사용자 정보를 가져오는 데 실패했습니다.');
                console.error('🚨 Failed to fetch logged-in user ID:', error);
            }
        };

        fetchLoggedInUserId();
    }, []);

    const fetchChatDetails = async (roomId) => {
        try {
            const tokens = await getTokens();
            if (!tokens || !tokens.accessToken) {
                Alert.alert('로그인이 필요합니다', '다시 로그인해주세요.');
                return;
            }

            console.log("📌 fetchChatDetails - chatRoomId:", roomId);
            setAuthToken(tokens.accessToken);
            const response = await api.get(`/chat/rooms/${roomId}/details`);

            console.log("📌 Chat Details Response:", response.data);

            if (response.status === 200) {
                const { messages } = response.data; // 메시지 배열 가져오기
                setOtherUserProfileImage(otherUserProfileImage);
                const formattedMessages = messages.map(msg => ({
                    ...msg,
                    createAt: msg.createAt && !isNaN(Date.parse(msg.createAt))
                        ? new Date(msg.createAt)
                        : new Date(), // ✅ 유효하지 않으면 현재 날짜로 대체
                }));

                setMessages(formattedMessages); // 변환된 메시지 저장
            }
        } catch (error) {
            console.error('🚨 채팅 정보를 불러오는 데 실패:', error);
        }
    };

    // 게시글 정보 불러오기 
    const fetchPostData = async () => {
        try {
            setLoadingPost(true);
            const tokens = await getTokens();
            if (!tokens || !tokens.accessToken) {
                Alert.alert('로그인이 필요합니다', '다시 로그인해주세요.');
                return;
            }

            if (!postId) {
                console.warn("⚠️ fetchPostData: postId is undefined.");
                return;
            }

            console.log("📌 postId:", postId);  // postId 콘솔 확인
            console.log("📌 Token:", tokens.accessToken); // 토큰 확인

            setAuthToken(tokens.accessToken);
            const response = await api.get(`/chat/rooms/post/${postId}`, {
                headers: {
                    Authorization: `Bearer ${tokens.accessToken}`,
                },
            });

            console.log("📌 Post Data Response:", response.data); // API 응답 확인

            if (response.status === 200) {
                setPostData(response.data);
            }
        } catch (error) {
            console.error('🚨 Failed to fetch post data:', error);
            Alert.alert('오류', '게시글 정보를 불러오는 데 실패했습니다.');
        } finally {
            setLoadingPost(false);
        }
    };

    useEffect(() => {
        fetchPostData();
    }, [postId]);

    useEffect(() => {
        if (toastMessage) {
            Toast.show({
                type: 'success',
                text1: toastMessage,
                position: 'top',
            });
        }
    }, [toastMessage]);

    useEffect(() => {
        if (flatListRef.current) {
            setTimeout(() => {
                flatListRef.current.scrollToEnd({ animated: true });
            }, 100);
        }
    }, [messages]);

    const handleSendMessage = async () => {
        if (!inputText.trim()) return;

        try {
            const tokens = await getTokens();
            if (!tokens || !tokens.accessToken) {
                Alert.alert('로그인이 필요합니다', '다시 로그인해주세요.');
                return;
            }

            setAuthToken(tokens.accessToken);

            let requestBody = {
                postId,
                ownerId,
                renterId,
                content: inputText,
            };

            if (chatRoomId) {
                // 기존 채팅방이 있을 경우 chatRoomId 포함
                requestBody.chatRoomId = chatRoomId;

                // 🔄 두 번째 대화부터는 ownerId와 renterId를 서로 변경
                requestBody.ownerId = loggedInId;
                requestBody.renterId = ownerId;
            } else {
                // 새로운 채팅 시작 시 renterId를 현재 로그인한 사용자로 설정
                requestBody.renterId = loggedInId;
            }

            console.log("📌 메시지 전송 요청:", requestBody);
            const response = await api.post('/messages/send', requestBody);

            if (response.status === 200) {
                const newChatRoomId = response.data.chatRoomId || chatRoomId;

                if (!chatRoomId && newChatRoomId) {
                    setChatRoomId(newChatRoomId); // 🔥 chatRoomId 상태 업데이트
                    await AsyncStorage.setItem(`chatRoomId-${postId}`, newChatRoomId.toString());
                    console.log("✅ chatRoomId 저장됨:", newChatRoomId);
                }

                const newMessage = {
                    id: messages.length + 1,
                    chatroom_id: newChatRoomId,
                    senderUserId: loggedInId, // 메시지 보낸 사람 ID
                    content: inputText,
                    create_at: new Date().toISOString(),
                };

                setMessages([...messages, newMessage]);
                setInputText('');
            }
        } catch (error) {
            console.error('❌ 메시지 전송 실패:', error);
            Alert.alert('오류', '메시지를 보내는 데 실패했습니다.');
        }
    };

    const renderItem = ({ item, index }) => {
        const currentDate = item.createAt && !isNaN(item.createAt)
            ? new Date(item.createAt).toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
            }).replace(/\.$/, '')
            : '';

        const prevDate =
            index > 0 && messages[index - 1].createAt && !isNaN(messages[index - 1].createAt)
                ? new Date(messages[index - 1].createAt).toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                }).replace(/\.$/, '')
                : null;

        const showDate = currentDate !== prevDate;
        const isMyMessage = item.senderUserId === loggedInId; // ✅ 내 메시지인지 확인

        return (
            <View>
                {showDate && (
                    <View style={styles.dateContainer}>
                        <Text style={styles.dateText}>{currentDate}</Text>
                    </View>
                )}
                <View
                    style={[
                        styles.messageContainer,
                        isMyMessage ? styles.myMessage : styles.otherMessage,
                    ]}
                >
                    {!isMyMessage && (
                        <Image
                            source={otherUserProfileImage ? { uri: otherUserProfileImage } : require('../../assets/images/defaultProfile.png')}
                            style={styles.profileImage}
                        />
                    )}
                    <View
                        style={[
                            styles.messageBubble,
                            isMyMessage
                                ? styles.myMessageBubble
                                : styles.otherMessageBubble,
                        ]}
                    >
                        <Text style={styles.messageText}>{item.content}</Text>
                    </View>
                    {isMyMessage && (
                        <View style={styles.myMessageMeta}>
                            <Text style={styles.readStatus}>
                                {item.is_read ? '' : '1'} {/* 안읽은 메시지 1로 표시 */}
                            </Text>
                            <Text style={styles.messageTime}>
                                {item.createAt && !isNaN(item.createAt)
                                    ? new Date(item.createAt).toLocaleTimeString([], {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        hour12: false,
                                    })
                                    : ''}
                            </Text>
                        </View>
                    )}
                    {!isMyMessage && (
                        <Text style={styles.messageTime}>
                            {item.createAt && !isNaN(item.createAt)
                                ? new Date(item.createAt).toLocaleTimeString([], {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    hour12: false,
                                })
                                : ''}
                        </Text>
                    )}
                </View>
            </View>
        );
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <SafeAreaView style={styles.container}>
                <View style={{ paddingHorizontal: 20 }}>
                    <NavigateHeader navigation={navigation} title="채팅" />
                </View>
                {/* 📌 PostHeader 데이터 로딩 시 로딩 표시 */}
                {loadingPost ? (
                    <ActivityIndicator size="large" color={colors.themeColor} style={{ marginTop: 20 }} />
                ) : (
                    postData && (
                        <PostHeader
                            post={{
                                id: postData.postId,
                                title: postData.title,
                                image: postData.previewImage,
                                location: postData.locationName,
                                status: postData.postStatus,
                            }}
                        />
                    )
                )}
                <FlatList
                    ref={flatListRef}
                    data={messages}
                    renderItem={renderItem}
                    // keyExtractor={(item) => item.id.toString()}
                    style={styles.messageList}
                />
                {isCompleted && (
                    <View style={styles.reviewContainer}>
                        <Text style={styles.reviewText}>
                            거래는 어떠셨나요?{'\n'}
                            아래 버튼을 눌러 후기를 남겨주세요!
                        </Text>
                        <TouchableOpacity
                            style={styles.reviewButton}
                            onPress={() => navigation.navigate('ReviewScreen', { chatRoomId })}
                        >
                            <Text style={styles.reviewButtonText}>거래후기 작성하기</Text>
                        </TouchableOpacity>
                    </View>
                )}
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="메시지를 입력하세요."
                        value={inputText}
                        onChangeText={setInputText}
                    />
                    <TouchableOpacity onPress={handleSendMessage} style={styles.sendButton}>
                        <Image source={require('../../assets/icons/sendIcon.png')} style={styles.sendIcon} />
                    </TouchableOpacity>
                </View>
                <ToastMessage />
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    dateContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
        backgroundColor: 'white',
        width: 93,
        height: 22,
        borderRadius: 11,
        borderWidth: 1,
        alignSelf: 'center',
        borderColor: colors.gray2,
    },
    dateText: {
        ...fontStyles.gray4Medium12,
    },
    messageList: {
        flex: 1,
    },
    messageContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginVertical: 10,
        marginHorizontal: 15,
    },
    myMessage: {
        justifyContent: 'flex-end',
        alignSelf: 'flex-end',
        flexDirection: 'row-reverse',
    },
    otherMessage: {
        justifyContent: 'flex-start',
        alignSelf: 'flex-start',
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    messageBubble: {
        padding: 10,
        borderRadius: 8,
        maxWidth: '60%',
    },
    myMessageBubble: {
        backgroundColor: colors.vPale,
        alignSelf: 'flex-end',
    },
    otherMessageBubble: {
        backgroundColor: colors.gray1,
        alignSelf: 'flex-start',
    },
    messageText: {
        ...fontStyles.lightBlackMedium14,
        flexWrap: 'wrap',
    },
    myMessageMeta: {
        alignItems: 'flex-end',
        marginTop: 5,
    },
    readStatus: {
        fontSize: 12,
        color: colors.themeColor,
        marginHorizontal: 2,
    },
    messageTime: {
        ...fontStyles.gray3Medium14,
        marginHorizontal: 5,
    },
    otherMessageMeta: {
        alignItems: 'flex-start',
        marginTop: 5,
    },
    reviewContainer: {
        width: 330,
        height: 112,
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: colors.themeColor,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        marginBottom: 15,
        backgroundColor: 'white',
    },
    reviewText: {
        ...fontStyles.lightBlackMedium14,
        marginBottom: 10,
        textAlign: 'center',
    },
    reviewButton: {
        backgroundColor: colors.themeColor,
        paddingVertical: 7,
        paddingHorizontal: 16,
        borderRadius: 20,
    },
    reviewButtonText: {
        ...fontStyles.whiteMedium14,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: colors.gray1,
        height: 48,
    },
    input: {
        flex: 1,
        height: 24,
        backgroundColor: 'white',
        borderRadius: 20,
        paddingHorizontal: 10,
        marginHorizontal: 10,
    },
    sendButton: {
        padding: 5,
        marginRight: 10,
    },
    sendIcon: {
        width: 24,
        height: 24,
    },
});

export default ChatScreen;

