import { useRouter } from 'expo-router';
import React, { useContext } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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
    },
    dark: {
        background: '#000',
        text: '#fff',
        header: '#1c1c1e',
        border: '#3a3a3c',
        card: '#1c1c1e',
        primary: '#0A84FF',
    },
};

// Define a type for our theme object
type Theme = typeof Colors.light;

export default function AppearanceScreen() {
    const router = useRouter();
    const context = useContext(AppContext);

    if (!context) {
        return <Text>Error: App context is not available.</Text>;
    }

    // This line is updated to be more explicit for TypeScript
    const { colorScheme, setColorScheme } = context;
    const theme = Colors[colorScheme]; // Get the current theme's colors

    // Create styles dynamically based on the selected theme
    const styles = dynamicStyles(theme);

    const options = [
        { key: 'light', title: 'Light' },
        { key: 'dark', title: 'Dark' },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Appearance</Text>
                <TouchableOpacity onPress={() => router.back()}>
                    <Text style={styles.doneButton}>Done</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.content}>
                {options.map((option) => (
                    <TouchableOpacity
                        key={option.key}
                        style={styles.option}
                        onPress={() => setColorScheme(option.key as 'light' | 'dark')}
                    >
                        <Text style={styles.optionText}>{option.title}</Text>
                        {colorScheme === option.key && <Text style={styles.check}>✓</Text>}
                    </TouchableOpacity>
                ))}
            </View>
        </SafeAreaView>
    );
}

// This function now has an explicit type for the 'theme' parameter
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
    content: { paddingTop: 20 },
    option: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 20,
        backgroundColor: theme.card,
        borderBottomWidth: 1,
        borderBottomColor: theme.border,
    },
    optionText: { fontSize: 18, color: theme.text },
    check: { fontSize: 20, color: theme.primary },
});
