import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import colors from '../../styles/Colors';
import fontStyles from '../../styles/FontStyles';

const ChatScreen = ({ route, navigation }) => {
    const { chatRoomId, isCompleted } = route.params; // 거래완료여부 props 전달 받음

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
            is_read: 1,
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
            is_read: 1,
            create_at: '2024-12-26T09:30:00',
        },
    ]);

    const [inputText, setInputText] = useState('');
    const flatListRef = React.useRef(); // FlatList 스크롤을 위한 Ref

    // 메세지 나올 때마다 자동 스크롤
    useEffect(() => {
        if (flatListRef.current) {
            setTimeout(() => {
                flatListRef.current.scrollToEnd({ animated: true });
            }, 100); // 약간의 지연 추가
        }
    }, [messages]);


    const handleSend = () => {
        if (!inputText.trim()) return;

        const newMessage = {
            id: messages.length + 1, // 임시로 id를 생성 (실제로는 서버에서 생성)
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
                            <Text style={styles.messageTime}>
                                {new Date(item.create_at).toLocaleTimeString([], {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    hour12: false,
                                })}
                            </Text>
                            <Text style={styles.readStatus}>
                                {item.is_read ? '' : '1'}  {/* 안읽은 메세지 1로 표시 */}
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
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <Image source={require('../../assets/images/backIcon.png')} style={styles.backIcon} />
                    </TouchableOpacity>
                    <Text style={styles.headerText}>채팅</Text>
                </View>
                <View style={styles.postDetails}>
                    <Image source={{ uri: post.image }} style={styles.postImage} />
                    <View>
                        <Text style={styles.postTitle}>{post.title}</Text>
                        <View style={styles.locationContainer}>
                            <Image
                                source={require('../../assets/images/locationIcon.png')}
                                style={styles.locationIcon}
                            />
                            <Text style={styles.postLocation}>{post.location}</Text>
                        </View>
                    </View>
                </View>
                <FlatList
                    ref={flatListRef} // Ref 연결
                    data={messages}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                    style={styles.messageList}
                />
                {isCompleted && (
                    <View style={styles.reviewContainer}>
                        <Text style={styles.reviewText}>
                            거래가 어떠셨나요?{'\n'}
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
                        <Image source={require('../../assets/images/sendIcon.png')} style={styles.sendIcon} />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        height: 56,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: colors.gray2,
        position: 'relative',
    },
    backButton: {
        position: 'absolute',
        left: 15,
        top: 23,
    },
    backIcon: {
        width: 8.64,
        height: 14,
    },
    headerText: {
        ...fontStyles.blackSemiBold20,
    },
    postDetails: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 76,
        padding: 10,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: colors.gray2,
    },
    postImage: {
        width: 53,
        height: 53,
        borderRadius: 12,
        marginRight: 10,
        marginLeft: 5,
    },
    postTitle: {
        ...fontStyles.lightBlackSemiBold14,
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 3,
    },
    locationIcon: {
        width: 9.33,
        height: 13.33,
        marginRight: 5,
    },
    postLocation: {
        ...fontStyles.gray4Medium14,
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
    messageTime: {
        ...fontStyles.gray3Medium14,
        marginHorizontal: 5,
    },
    readStatus: {
        fontSize: 10,
        color: colors.themeColor,
        marginLeft: 5,
    },
    reviewContainer: {
        width: '330',
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
