// In app/_layout.tsx

import { Stack } from 'expo-router';
import { AppProvider } from '../context/AppContext';

export default function RootLayout() {
  return (
    <AppProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="login" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="calendar" />
        <Stack.Screen name="streaks" />
        <Stack.Screen name="settings" />{/* <-- THIS LINE IS ESSENTIAL */}
        <Stack.Screen name="edit-profile" />
      </Stack>
    </AppProvider>
  );
}