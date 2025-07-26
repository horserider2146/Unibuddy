import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withSequence, withTiming } from 'react-native-reanimated';

export default function LoadingScreen() {
    const router = useRouter();
    const scale = useSharedValue(1);
    const opacity = useSharedValue(0);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scale.value }],
            opacity: opacity.value,
        };
    });

    useEffect(() => {
        // Fade in the text
        opacity.value = withTiming(1, { duration: 1000 });
        
        // Create a gentle pulsing animation
        scale.value = withRepeat(
            withSequence(
                withTiming(1.1, { duration: 1500 }),
                withTiming(1, { duration: 1500 })
            ),
            -1, // Loop indefinitely
            true // Play the animation in reverse (pulse in and out)
        );

        // After a few seconds, navigate to the login screen
        const navigationTimer = setTimeout(() => {
            router.replace('/login');
        }, 4000); // 4-second delay

        // Clean up the timer when the component is unmounted
        return () => clearTimeout(navigationTimer);
    }, []);

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.textContainer, animatedStyle]}>
                <Text style={styles.text}>UNIBUDDY</Text>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1c1c1e', // A dark, modern background
    },
    textContainer: {
        padding: 20,
    },
    text: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#fff',
        letterSpacing: 2,
        textShadowColor: 'rgba(255, 255, 255, 0.2)',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 10,
    },
});
