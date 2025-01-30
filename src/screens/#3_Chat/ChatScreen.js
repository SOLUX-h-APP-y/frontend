import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform, ActivityIndicator, Alert } from 'react-native';
import colors from '../../styles/Colors';
import fontStyles from '../../styles/FontStyles';
import { NavigateHeader, PostHeader } from '../../components/CustomHeaders';
import ToastMessage from '../../components/ToastMessage';
import { getTokens } from '../../services/TokenManager';
import api, { setAuthToken } from '../../services/api';


const ChatScreen = ({ route, navigation }) => {
    const { chatRoomId, isCompleted, toastMessage, postId, ownerId } = route.params || {};
    console.log("🚀 Received route params:", route.params);
    console.log("📌 postId:", postId);
    console.log("📌 ownerId (writerId):", ownerId);
    console.log("📌 chatRoomId:", chatRoomId);
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');
    const [postData, setPostData] = useState(null);
    const [loadingPost, setLoadingPost] = useState(true); // Post 데이터 로딩 상태
    const flatListRef = React.useRef();
    const [chatRoomData, setChatRoomData] = useState(null); // 채팅방 상세 데이터 상태
    const [loadingChat, setLoadingChat] = useState(true); // 채팅 데이터 로딩 상태
    const [loadingSend, setLoadingSend] = useState(false); // 메시지 전송 로딩 상태 추가
    const [renterId, setRenterId] = useState(null); // 로그인한 사용자 ID

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
                setRenterId(response.data.userId); // 🔥 로그인한 사용자 ID 설정

                console.log("✅ 로그인한 사용자 ID (renterId):", response.data.userId);
            } catch (error) {
                Alert.alert('오류', '로그인 사용자 정보를 가져오는 데 실패했습니다.');
                console.error('🚨 Failed to fetch logged-in user ID:', error);
            }
        };

        fetchLoggedInUserId();
    }, []);

    // 채팅방 상세 데이터 가져오기
    const fetchChatDetails = async () => {
        try {
            setLoadingChat(true);
            const tokens = await getTokens();
            if (!tokens || !tokens.accessToken) {
                Alert.alert('로그인이 필요합니다', '다시 로그인해주세요.');
                return;
            }

            if (!chatRoomId) {
                console.warn("⚠️ fetchChatDetails: chatRoomId is undefined.");
                return;
            }

            console.log("📌 chatRoomId:", chatRoomId);  // chatRoomId 콘솔 확인
            console.log("📌 Token:", tokens.accessToken); // 토큰 확인

            setAuthToken(tokens.accessToken);
            const response = await api.get(`/chat/rooms/${chatRoomId}/details`, {
                headers: {
                    Authorization: `Bearer ${tokens.accessToken}`,
                },
            });

            console.log("📌 Chat Room Data Response:", response.data); // API 응답 확인

            if (response.status === 200) {
                setChatRoomData(response.data);
                setMessages(response.data.messages); // 메시지 리스트 업데이트
            }
        } catch (error) {
            console.error('🚨 Failed to fetch chat details:', error);
            Alert.alert('오류', '채팅 정보를 불러오는 데 실패했습니다.');
        } finally {
            setLoadingChat(false);
        }
    };

    // chatRoomId가 변경될 때마다 채팅방 상세 정보 가져오기
    useEffect(() => {
        fetchChatDetails();
    }, [chatRoomId]);

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

        const tokens = await getTokens();
        if (!tokens || !tokens.accessToken) {
            Alert.alert('로그인이 필요합니다', '다시 로그인해주세요.');
            return;
        }

        setAuthToken(tokens.accessToken);

        // ChatRoomId가 없는 경우 -> 새로운 채팅방 생성
        const requestBody = {
            postId,
            ownerId,
            renterId,
            content: inputText,
        };

        // ChatRoomId가 있는 경우 -> 기존 채팅방 메시지 전송
        if (chatRoomId) {
            requestBody.chatRoomId = chatRoomId; // 기존 채팅방이면 chatRoomId 추가
        }
        console.log("📌 Sending Message Request:", requestBody);

        try {
            setLoadingSend(true);
            const response = await api.post('/messages/send', requestBody);
            console.log("📌 Send Message Response:", response.data);

            if (response.status === 200) {
                const newMessage = {
                    id: messages.length + 1,
                    chatroom_id: chatRoomId || response.data.chatRoomId, // 응답에서 chatRoomId 가져오기
                    sender_id: renterId, // 본인이 보낸 메시지
                    content: inputText,
                    // is_read: 0,
                    create_at: new Date().toISOString(),
                };

                setMessages([...messages, newMessage]);
                setInputText('');
            }
        } catch (error) {
            console.error('Failed to send message:', error);
            // 403 오류 세부 로그 확인
            if (error.response) {
                console.error("🚨 Response Data:", error.response.data);
                console.error("🚨 Status Code:", error.response.status);
                console.error("🚨 Headers:", error.response.headers);
            }
            Alert.alert('오류', '메시지를 보내는 데 실패했습니다.');
        } finally {
            setLoadingSend(false);
        }
    };

    const renderItem = ({ item, index }) => {
        const currentDate = new Date(item.create_at).toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        }).replace(/\.$/, '');
        const prevDate =
            index > 0
                ? new Date(messages[index - 1].create_at).toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                }).replace(/\.$/, '')
                : null;

        const showDate = currentDate !== prevDate;

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
                        item.sender_id === renterId ? styles.myMessage : styles.otherMessage,
                    ]}
                >
                    {item.sender_id !== renterId && (
                        <Image
                            source={{ uri: 'https://via.placeholder.com/40' }}
                            style={styles.profileImage}
                        />
                    )}
                    <View
                        style={[
                            styles.messageBubble,
                            item.sender_id === renterId
                                ? styles.myMessageBubble
                                : styles.otherMessageBubble,
                        ]}
                    >
                        <Text style={styles.messageText}>{item.content}</Text>
                    </View>
                    {item.sender_id === renterId && (
                        <View style={styles.myMessageMeta}>
                            <Text style={styles.readStatus}>
                                {item.is_read ? '' : '1'} {/* 안읽은 메시지 1로 표시 */}
                            </Text>
                            <Text style={styles.messageTime}>
                                {new Date(item.create_at).toLocaleTimeString([], {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    hour12: false,
                                })}
                            </Text>
                        </View>
                    )}
                    {item.sender_id !== renterId && (
                        <Text style={styles.messageTime}>
                            {new Date(item.create_at).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: false,
                            })}
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
                    keyExtractor={(item) => item.id.toString()}
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
