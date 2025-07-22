import { useRouter } from 'expo-router';
import React, { useContext, useState } from 'react';
import { Alert, SafeAreaView, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { AppContext } from './context/AppContext';

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
        logoutText: '#ff4d4f', // New color for logout text
        logoutBorder: '#ff4d4f', // New color for logout border
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
        logoutText: '#ff6961', // New color for logout text
        logoutBorder: '#ff6961', // New color for logout border
    },
};

// Define a type for our theme object
type Theme = typeof Colors.light;

export default function SettingsScreen() {
    const router = useRouter();
    const context = useContext(AppContext);

    const [notificationsEnabled, setNotificationsEnabled] = useState(false);

    if (!context) {
        return <Text>Loading...</Text>;
    }

    const { colorScheme } = context;
    const theme = Colors[colorScheme];
    const styles = dynamicStyles(theme);

    const handlePressOption = (optionName: string) => {
        Alert.alert('Placeholder', `This is where the "${optionName}" feature will go.`);
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

                <Text style={styles.sectionTitle}>About</Text>
                <TouchableOpacity style={styles.option} onPress={() => handlePressOption('About UniBuddy')}>
                    <Text style={styles.optionText}>About UniBuddy</Text>
                </TouchableOpacity>
            </ScrollView>

            {/* --- UPDATED LOGOUT BUTTON --- */}
            <View style={styles.footer}>
                <TouchableOpacity style={styles.logoutButton} onPress={() => router.replace('/login')}>
                    <Text style={styles.logoutButtonText}>Logout</Text>
                </TouchableOpacity>
            </View>
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
});
