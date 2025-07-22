import { useRouter } from 'expo-router';
import React, { useContext } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AppContext } from '../context/AppContext';

// Define color palettes for both themes
const Colors = {
    light: {
        background: '#f0f2f5',
        text: '#1c1c1e',
        buttonBg: '#007BFF',
        buttonText: '#fff',
        cardBg: '#fff',
        cardSubtleText: '#666',
        primary: '#007BFF',
        border: '#ddd',
    },
    dark: {
        background: '#000',
        text: '#fff',
        buttonBg: '#0A84FF',
        buttonText: '#fff',
        cardBg: '#1c1c1e',
        cardSubtleText: '#a0a0a0',
        primary: '#0A84FF',
        border: '#3a3a3c',
    },
};

// Define a type for our theme object
type Theme = typeof Colors.light;

export default function DashboardScreen() {
    const router = useRouter();
    const context = useContext(AppContext);

    if (!context) {
        return <Text>Loading...</Text>;
    }

    const { colorScheme, name, subjects, stream, branch, year } = context;
    const theme = Colors[colorScheme];
    const styles = dynamicStyles(theme);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>UniBuddy Dashboard</Text>
                <TouchableOpacity onPress={() => router.push('/settings')}>
                    <Text style={styles.settingsIcon}>...</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.content}>
                <View style={styles.infoCard}>
                    <Text style={styles.infoCardName}>{name}</Text>
                    <Text style={styles.infoCardSubject}>{(subjects || []).join(', ')}</Text>
                    <View style={styles.infoCardDetailsRow}>
                        <Text style={styles.infoCardDetailText}>{stream} - {branch}</Text>
                        <Text style={styles.infoCardDetailText}>Year: {year}</Text>
                    </View>
                </View>

                <TouchableOpacity style={styles.button} onPress={() => router.push('/calendar')}>
                    <Text style={styles.buttonText}>My Calendar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => router.push('/streaks')}>
                    <Text style={styles.buttonText}>Streak Performance</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

// Dynamic stylesheet function
const dynamicStyles = (theme: Theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.background,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingTop: 20,
        paddingBottom: 10,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: theme.text,
    },
    settingsIcon: {
        fontSize: 36,
        fontWeight: 'bold',
        color: theme.cardSubtleText,
        lineHeight: 28, // Helps with vertical alignment
    },
    content: {
        flex: 1,
        paddingHorizontal: 24,
    },
    infoCard: {
        backgroundColor: theme.cardBg,
        borderRadius: 12,
        padding: 20,
        marginBottom: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    infoCardName: {
        fontSize: 22,
        fontWeight: 'bold',
        color: theme.text,
    },
    infoCardSubject: {
        fontSize: 16,
        color: theme.primary,
        fontWeight: '600',
        marginTop: 4,
        marginBottom: 12,
        lineHeight: 22,
    },
    infoCardDetailsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: theme.border,
        paddingTop: 12,
    },
    infoCardDetailText: {
        fontSize: 14,
        color: theme.cardSubtleText,
    },
    button: {
        backgroundColor: 'transparent',
        padding: 20,
        borderRadius: 12,
        alignItems: 'center',
        marginBottom: 15,
        borderWidth: 1.5,
        borderColor: theme.buttonBg,
    },
    buttonText: {
        color: theme.buttonBg,
        fontSize: 18,
        fontWeight: '600',
    },
});
