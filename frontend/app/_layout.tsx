import { Ionicons } from '@expo/vector-icons';
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import 'react-native-reanimated';

export const unstable_settings = {
  anchor: '(tabs)',
};

function CustomHeaderTitle() {
  const router = useRouter();

  return (
    <Pressable onPress={() => router.push('/')}>
      <View style={styles.headerContainer}>
        <Ionicons name="restaurant-outline" size={24} color="black" />
        <Text style={styles.headerTitle}>마이레시피</Text>
      </View>
    </Pressable>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider value={DefaultTheme}>
      <Stack
        screenOptions={{
          headerTitle: () => <CustomHeaderTitle />,
          headerShadowVisible: false,
        }}>
        <Stack.Screen name="(tabs)" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
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
