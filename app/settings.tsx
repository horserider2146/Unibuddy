import { useRouter } from 'expo-router';
import React, { useContext, useState } from 'react';
import { Alert, Linking, Modal, SafeAreaView, ScrollView, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { AppContext } from '../context/AppContext';

// Define color palettes for both themes
const Colors = {
    light: {
        background: '#f0f2f5',
        text: '#1c1c1e',
        header: '#fff',
        border: '#ddd',
        card: '#fff',
        primary: '#007BFF',
        switchThumb: '#f4f3f4',
        switchTrackFalse: '#767577',
        switchTrackTrue: '#81b0ff',
        sectionTitle: '#666',
        logoutText: '#ff4d4f',
        logoutBorder: '#ff4d4f',
        modalBg: 'rgba(0, 0, 0, 0.5)',
        modalView: '#fff',
        modalInput: '#ddd',
        placeholder: '#888',
        cancelButton: '#6c757d',
    },
    dark: {
        background: '#000',
        text: '#fff',
        header: '#1c1c1e',
        border: '#3a3a3c',
        card: '#1c1c1e',
        primary: '#0A84FF',
        switchThumb: '#f4f3f4',
        switchTrackFalse: '#3a3a3c',
        switchTrackTrue: '#0A84FF',
        sectionTitle: '#a0a0a0',
        logoutText: '#ff6961',
        logoutBorder: '#ff6961',
        modalBg: 'rgba(0, 0, 0, 0.7)',
        modalView: '#2c2c2e',
        modalInput: '#545458',
        placeholder: '#6e6e72',
        cancelButton: '#545458',
    },
};

// Define a type for our theme object
type Theme = typeof Colors.light;

export default function SettingsScreen() {
    const router = useRouter();
    const context = useContext(AppContext);

    const [notificationsEnabled, setNotificationsEnabled] = useState(false);
    const [feedbackModalVisible, setFeedbackModalVisible] = useState(false);
    const [feedbackText, setFeedbackText] = useState('');

    if (!context) {
        return <Text>Loading...</Text>;
    }

    const { colorScheme } = context;
    const theme = Colors[colorScheme];
    const styles = dynamicStyles(theme);

    const handleHelpPress = async () => {
        const email = 'ritarshiroy@gmail.com';
        const url = `mailto:${email}?subject=UniBuddy App Help & Support`;
        const supported = await Linking.canOpenURL(url);

        if (supported) {
            await Linking.openURL(url);
        } else {
            Alert.alert('Cannot open Email', `Please send your support request to ${email}.`);
        }
    };

    const handleSendFeedback = () => {
        if (!feedbackText.trim()) {
            Alert.alert('Empty Feedback', 'Please enter your feedback before submitting.');
            return;
        }

        // In a real app, you would send this to a server.
        // We will simulate this by logging it.
        console.log('--- Feedback Submitted ---');
        console.log(feedbackText);
        console.log('--------------------------');

        setFeedbackModalVisible(false);
        setFeedbackText('');
        Alert.alert('Thank You!', 'Your feedback has been sent.');
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Settings</Text>
                <TouchableOpacity onPress={() => router.back()}>
                    <Text style={styles.doneButton}>Done</Text>
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Text style={styles.sectionTitle}>Account</Text>
                <TouchableOpacity style={styles.option} onPress={() => router.push('/edit-profile')}>
                    <Text style={styles.optionText}>Edit Profile</Text>
                </TouchableOpacity>

                <Text style={styles.sectionTitle}>Preferences</Text>
                <View style={styles.option}>
                    <Text style={styles.optionText}>Notifications</Text>
                    <Switch
                        value={notificationsEnabled}
                        onValueChange={setNotificationsEnabled}
                        trackColor={{ false: theme.switchTrackFalse, true: theme.switchTrackTrue }}
                        thumbColor={notificationsEnabled ? theme.primary : theme.switchThumb}
                    />
                </View>
                <TouchableOpacity style={styles.option} onPress={() => router.push('/appearance')}>
                    <Text style={styles.optionText}>Appearance</Text>
                </TouchableOpacity>

                <Text style={styles.sectionTitle}>Support</Text>
                <TouchableOpacity style={styles.option} onPress={handleHelpPress}>
                    <Text style={styles.optionText}>Help & Support</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.option} onPress={() => setFeedbackModalVisible(true)}>
                    <Text style={styles.optionText}>Send Feedback</Text>
                </TouchableOpacity>
            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity style={styles.logoutButton} onPress={() => router.replace('/login')}>
                    <Text style={styles.logoutButtonText}>Logout</Text>
                </TouchableOpacity>
            </View>

            {/* --- NEW FEEDBACK MODAL --- */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={feedbackModalVisible}
                onRequestClose={() => setFeedbackModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalTitle}>Send Us Your Feedback</Text>
                        <TextInput
                            style={styles.modalInput}
                            placeholder="Tell us what you think..."
                            placeholderTextColor={theme.placeholder}
                            value={feedbackText}
                            onChangeText={setFeedbackText}
                            multiline={true}
                        />
                        <View style={styles.modalButtonContainer}>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.cancelButton]}
                                onPress={() => setFeedbackModalVisible(false)}
                            >
                                <Text style={styles.modalButtonText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.saveButton]}
                                onPress={handleSendFeedback}
                            >
                                <Text style={styles.modalButtonText}>Submit</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

const dynamicStyles = (theme: Theme) => StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.background },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: theme.border,
        backgroundColor: theme.header,
    },
    headerTitle: { fontSize: 22, fontWeight: 'bold', color: theme.text },
    doneButton: { fontSize: 18, color: theme.primary, fontWeight: '600' },
    scrollContent: { paddingBottom: 20 },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: theme.sectionTitle,
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 10,
    },
    option: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 20,
        backgroundColor: theme.card,
        borderBottomWidth: 1,
        borderBottomColor: theme.border,
    },
    optionText: { fontSize: 18, color: theme.text },
    footer: {
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: theme.border,
    },
    logoutButton: {
        backgroundColor: 'transparent',
        padding: 15,
        borderRadius: 12,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: theme.logoutBorder,
    },
    logoutButtonText: {
        color: theme.logoutText,
        fontSize: 18,
        fontWeight: 'bold',
    },
    // Modal Styles
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.modalBg,
    },
    modalView: {
        width: '90%',
        backgroundColor: theme.modalView,
        borderRadius: 20,
        padding: 25,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        color: theme.text,
    },
    modalInput: {
        width: '100%',
        height: 120,
        backgroundColor: theme.background,
        borderColor: theme.modalInput,
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingTop: 15,
        marginBottom: 20,
        color: theme.text,
        textAlignVertical: 'top',
    },
    modalButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    modalButton: {
        borderRadius: 10,
        padding: 12,
        elevation: 2,
        width: '48%',
        alignItems: 'center',
    },
    cancelButton: {
        backgroundColor: theme.cancelButton,
    },
    saveButton: {
        backgroundColor: theme.primary,
    },
    modalButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});
