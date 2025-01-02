import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import colors from '../../styles/Colors';
import fontStyles from '../../styles/FontStyles';
import { ChatHeader, PostHeader } from '../../components/CustomHeader';
import ToastMessage from '../../components/ToastMessage';


const ChatScreen = ({ route, navigation }) => {
    const { chatRoomId, isCompleted, toastMessage } = route.params || {};

    const post = {
        id: 101,
        title: '카메라 빌려드려요',
        image: 'https://via.placeholder.com/50',
        location: '청파동2가',
    };

    const [messages, setMessages] = useState([
        {
            id: 1,
            chatroom_id: 1,
            sender_id: 2,
            content: '안녕하세요. 카메라 한달동안 빌리고 싶은데 하루 5000원으로 가능할까요? ㅎㅎ',
            is_read: 0,
            create_at: '2024-12-25T11:40:00',
        },
        {
            id: 2,
            chatroom_id: 1,
            sender_id: 1,
            content: '넵 가능합니다',
            is_read: 1,
            create_at: '2024-12-25T11:41:00',
        },
        {
            id: 3,
            chatroom_id: 1,
            sender_id: 2,
            content: '네 감사합니다 \n내일 3시에 청파초 앞에서 봬요!',
            is_read: 0,
            create_at: '2024-12-26T09:30:00',
        },
    ]);

    const [inputText, setInputText] = useState('');
    const flatListRef = React.useRef();

    useEffect(() => {
        if (flatListRef.current) {
            setTimeout(() => {
                flatListRef.current.scrollToEnd({ animated: true });
            }, 100);
        }
    }, [messages]);

    useEffect(() => {
        if (toastMessage) {
            Toast.show({
                type: 'success',
                text1: toastMessage,
                position: 'top',
            });
        }
    }, [toastMessage]);

    const handleSend = () => {
        if (!inputText.trim()) return;

        const newMessage = {
            id: messages.length + 1,
            chatroom_id: chatRoomId,
            sender_id: 1,
            content: inputText,
            is_read: 0,
            create_at: new Date().toISOString(),
        };

        setMessages([...messages, newMessage]);
        setInputText('');
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
                        item.sender_id === 1 ? styles.myMessage : styles.otherMessage,
                    ]}
                >
                    {item.sender_id !== 1 && (
                        <Image
                            source={{ uri: 'https://via.placeholder.com/40' }}
                            style={styles.profileImage}
                        />
                    )}
                    <View
                        style={[
                            styles.messageBubble,
                            item.sender_id === 1
                                ? styles.myMessageBubble
                                : styles.otherMessageBubble,
                        ]}
                    >
                        <Text style={styles.messageText}>{item.content}</Text>
                    </View>
                    {item.sender_id === 1 && (
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
                    {item.sender_id !== 1 && (
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
                <ChatHeader navigation={navigation} title="채팅" />
                <PostHeader post={post} />
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
                    <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
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
