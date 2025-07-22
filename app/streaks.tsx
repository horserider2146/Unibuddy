import { differenceInCalendarDays, format, parseISO, subDays } from 'date-fns';
import { useRouter } from 'expo-router';
import React, { useContext, useMemo } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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

// Helper function to calculate a single overall streak
const calculateStreaks = (activityDates: string[]) => {
    if (activityDates.length === 0) {
        return { currentStreak: 0, longestStreak: 0 };
    }

    const sortedDates = activityDates
        .map(dateString => parseISO(dateString))
        .sort((a, b) => a.getTime() - b.getTime());

    let longestStreak = 0;
    let currentRun = 0;
    for (let i = 0; i < sortedDates.length; i++) {
        if (i > 0 && differenceInCalendarDays(sortedDates[i], sortedDates[i - 1]) === 1) {
            currentRun++;
        } else {
            currentRun = 1;
        }
        if (currentRun > longestStreak) {
            longestStreak = currentRun;
        }
    }

    let currentStreak = 0;
    const today = new Date();
    const todayStr = format(today, 'yyyy-MM-dd');
    const yesterdayStr = format(subDays(today, 1), 'yyyy-MM-dd');
    const lastActivityStr = format(sortedDates[sortedDates.length - 1], 'yyyy-MM-dd');

    if (lastActivityStr === todayStr || lastActivityStr === yesterdayStr) {
        currentStreak = 1;
        for (let i = sortedDates.length - 2; i >= 0; i--) {
            if (differenceInCalendarDays(sortedDates[i + 1], sortedDates[i]) === 1) {
                currentStreak++;
            } else {
                break;
            }
        }
    }

    return { currentStreak, longestStreak };
};


export default function StreaksScreen() {
    const router = useRouter();
    const context = useContext(AppContext);

    if (!context) {
        return <Text>Loading...</Text>;
    }

    const { items, colorScheme } = context;
    const theme = Colors[colorScheme];
    const styles = dynamicStyles(theme);

    const streaks = useMemo(() => {
        const activityDates = Object.keys(items).filter(date => items[date]?.length > 0);
        return calculateStreaks(activityDates);
    }, [items]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Teaching Streak</Text>
                <TouchableOpacity onPress={() => router.back()}>
                    <Text style={styles.doneButton}>Done</Text>
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.streakCard}>
                    <Text style={styles.streakEmoji}>🔥</Text>
                    <View style={styles.streakInfo}>
                        <Text style={styles.streakTitle}>Current Streak</Text>
                        <Text style={styles.streakText}>{streaks.currentStreak} days</Text>
                    </View>
                </View>

                <View style={styles.streakCard}>
                    <Text style={styles.streakEmoji}>🏆</Text>
                    <View style={styles.streakInfo}>
                        <Text style={styles.streakTitle}>Longest Streak</Text>
                        <Text style={styles.streakText}>{streaks.longestStreak} days</Text>
                    </View>
                </View>
            </ScrollView>
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
    content: { padding: 20 },
    streakCard: {
        backgroundColor: theme.card,
        borderRadius: 12,
        padding: 20,
        marginBottom: 15,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 3,
    },
    streakEmoji: { fontSize: 40, marginRight: 20 },
    streakInfo: { flex: 1 },
    streakTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 5, color: theme.text },
    streakText: { fontSize: 24, color: theme.text, fontWeight: '500' },
});
