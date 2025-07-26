import { useRouter } from 'expo-router';
import React, { useContext, useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { AppContext } from '../context/AppContext';

// Define color palettes for both themes
const Colors = {
    light: {
        background: '#f7f7f7',
        text: '#333',
        subtitle: '#666',
        inputBg: '#fff',
        inputBorder: '#ddd',
        primary: '#007BFF',
        primaryText: '#fff',
    },
    dark: {
        background: '#121212',
        text: '#fff',
        subtitle: '#a0a0a0',
        inputBg: '#1e1e1e',
        inputBorder: '#3a3a3c',
        primary: '#0A84FF',
        primaryText: '#fff',
    },
};

// Define a type for our theme object
type Theme = typeof Colors.light;

export default function LoginPage() {
    const router = useRouter();
    const context = useContext(AppContext);
    
    // State variables to hold the username and password
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    if (!context) {
        return <Text>Loading...</Text>;
    }

    const { colorScheme } = context;
    const theme = Colors[colorScheme];
    const styles = dynamicStyles(theme);

    const handleLogin = () => {
        console.log('Username:', username);
        console.log('Password:', password);
        router.replace('/(tabs)');
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <View style={styles.inner}>
                {/* --- UPDATED TEXT --- */}
                <Text style={styles.title}>UNIBUDDY!</Text>
                <Text style={styles.subtitle}>CREATE NEW THINGS YOU WISH EXISTED</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    placeholderTextColor="#999"
                    value={username}
                    onChangeText={setUsername}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="#999"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={true}
                />

                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

// Dynamic stylesheet function
const dynamicStyles = (theme: Theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.background,
    },
    inner: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
    },
    title: {
        fontSize: 40, // Increased font size for the main title
        fontWeight: 'bold',
        marginBottom: 10,
        color: theme.text,
    },
    subtitle: {
        fontSize: 16, // Smaller font size for the tagline
        fontStyle: 'italic', // Italicized font style
        color: theme.subtitle,
        marginBottom: 40,
        textAlign: 'center', // Center align the tagline
    },
    input: {
        width: '100%',
        height: 50,
        backgroundColor: theme.inputBg,
        borderWidth: 1,
        borderColor: theme.inputBorder,
        borderRadius: 8,
        paddingHorizontal: 15,
        fontSize: 16,
        marginBottom: 15,
        color: theme.text,
    },
    button: {
        width: '100%',
        height: 50,
        backgroundColor: theme.primary,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        marginTop: 10,
    },
    buttonText: {
        color: theme.primaryText,
        fontSize: 18,
        fontWeight: 'bold',
    },
});
