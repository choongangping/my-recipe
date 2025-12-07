import { Ionicons } from '@expo/vector-icons';
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';
// import * as NavigationBar from 'expo-navigation-bar'; // Not needed for standard edge-to-edge with SafeArea
import { useEffect } from 'react';

// ...

export default function RootLayout() {
  // Edge-to-Edge is enabled by default in Expo SDK 50+.
  // We don't need to manually configure NavigationBar positions for standard behavior.
  // Layout overlap is handled by SafeAreaView in individual screens.

  return (
    <SafeAreaProvider>
      <ThemeProvider value={DefaultTheme}>
      <Stack
        screenOptions={{
          headerShown: false, // Default to hidden, individual screens can enable/customize
        }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        {/* Auth Stack */}
        <Stack.Screen name="Login" options={{ headerShown: false }} />
        <Stack.Screen name="Signup" options={{ headerShown: false }} />
        <Stack.Screen name="FindId" options={{ headerShown: false }} />
        <Stack.Screen name="FindPassword" options={{ headerShown: false }} />
        
        {/* Feature Stacks */}
        <Stack.Screen name="recipe/[id]" options={{ headerShown: false }} />
        <Stack.Screen name="recipe/Write" options={{ headerShown: false }} />
        <Stack.Screen name="notice/List" options={{ headerShown: false }} />
        <Stack.Screen name="notice/[id]" options={{ headerShown: false }} />
        
        {/* Profile Stacks */}
        <Stack.Screen name="profile/Edit" options={{ headerShown: false }} />
        <Stack.Screen name="profile/MyRecipes" options={{ headerShown: false }} />
        <Stack.Screen name="profile/MyComments" options={{ headerShown: false }} />
        <Stack.Screen name="profile/MyLikes" options={{ headerShown: false }} />
        <Stack.Screen name="profile/MyBookmarks" options={{ headerShown: false }} />
        <Stack.Screen name="profile/Inquiry" options={{ headerShown: false }} />
        <Stack.Screen name="profile/Terms" options={{ headerShown: false }} />
        <Stack.Screen name="profile/InfluencerRegister" options={{ headerShown: false }} />
      </Stack>
    <StatusBar style="dark" />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
