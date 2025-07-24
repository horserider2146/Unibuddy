import { useRouter } from 'expo-router';
import { addDoc, collection, getFirestore, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { FlatList, KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { app } from '../firebaseConfig'; // We will create this file next
import { AppContext, User } from './context/AppContext';

// Define color palettes for both themes
const Colors = {
    light: {
        background: '#f0f2f5',
        text: '#1c1c1e',
        header: '#fff',
        border: '#ddd',
        card: '#fff',
        primary: '#007BFF',
        inputBg: '#fff',
        placeholder: '#888',
        timestamp: '#666',
    },
    dark: {
        background: '#000',
        text: '#fff',
        header: '#1c1c1e',
        border: '#3a3a3c',
        card: '#1c1c1e',
        primary: '#0A84FF',
        inputBg: '#1c1c1e',
        placeholder: '#6e6e72',
        timestamp: '#a0a0a0',
    },
};

type Theme = typeof Colors.light;

interface Message {
    id: string;
    text: string;
    createdAt: any;
    user: User;
}

export default function ForumScreen() {
    const router = useRouter();
    const context = useContext(AppContext);
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const flatListRef = useRef<FlatList>(null);

    const db = getFirestore(app);

    useEffect(() => {
        const q = query(collection(db, "forumMessages"), orderBy("createdAt", "asc"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const msgs: Message[] = [];
            querySnapshot.forEach((doc) => {
                msgs.push({ id: doc.id, ...doc.data() } as Message);
            });
            setMessages(msgs);
        });

        return () => unsubscribe();
    }, []);

    if (!context) {
        return <Text>Loading...</Text>;
    }

    const { colorScheme, user } = context;
    const theme = Colors[colorScheme];
    const styles = dynamicStyles(theme);

    const handleSend = async () => {
        if (newMessage.trim() === '' || !user) return;

        await addDoc(collection(db, "forumMessages"), {
            text: newMessage,
            createdAt: serverTimestamp(),
            user: {
                uid: user.uid,
                name: user.name,
            }
        });

        setNewMessage('');
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Public Forum</Text>
                <TouchableOpacity onPress={() => router.back()}>
                    <Text style={styles.doneButton}>Done</Text>
                </TouchableOpacity>
            </View>
            <KeyboardAvoidingView 
                style={{ flex: 1 }} 
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
            >
                <FlatList
                    ref={flatListRef}
                    data={messages}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <View style={[styles.messageBubble, item.user.uid === user?.uid ? styles.myMessage : styles.theirMessage]}>
                            <Text style={styles.messageUser}>{item.user.name}</Text>
                            <Text style={styles.messageText}>{item.text}</Text>
                            <Text style={styles.messageTime}>
                                {item.createdAt?.toDate().toLocaleTimeString()}
                            </Text>
                        </View>
                    )}
                    contentContainerStyle={styles.messagesContainer}
                    onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
                />
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        value={newMessage}
                        onChangeText={setNewMessage}
                        placeholder="Type a message..."
                        placeholderTextColor={theme.placeholder}
                    />
                    <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
                        <Text style={styles.sendButtonText}>Send</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const dynamicStyles = (theme: Theme) => StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.background },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 15, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: theme.border, backgroundColor: theme.header },
    headerTitle: { fontSize: 22, fontWeight: 'bold', color: theme.text },
    doneButton: { fontSize: 18, color: theme.primary, fontWeight: '600' },
    messagesContainer: { padding: 10 },
    messageBubble: { maxWidth: '80%', padding: 10, borderRadius: 15, marginBottom: 10 },
    myMessage: { backgroundColor: theme.primary, alignSelf: 'flex-end' },
    theirMessage: { backgroundColor: theme.card, alignSelf: 'flex-start' },
    messageUser: { fontWeight: 'bold', marginBottom: 5, color: '#fff' },
    messageText: { fontSize: 16, color: '#fff' },
    messageTime: { fontSize: 12, color: '#e0e0e0', alignSelf: 'flex-end', marginTop: 5 },
    inputContainer: { flexDirection: 'row', padding: 10, borderTopWidth: 1, borderTopColor: theme.border, backgroundColor: theme.header },
    input: { flex: 1, backgroundColor: theme.inputBg, borderRadius: 20, paddingHorizontal: 15, paddingVertical: 10, fontSize: 16, color: theme.text, borderWidth: 1, borderColor: theme.border },
    sendButton: { marginLeft: 10, justifyContent: 'center', alignItems: 'center' },
    sendButtonText: { color: theme.primary, fontSize: 16, fontWeight: 'bold' },
});
