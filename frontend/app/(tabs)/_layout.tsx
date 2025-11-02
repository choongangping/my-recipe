import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';

// 하단 탭 레이아웃 (각 탭별 텍스트, 아이콘, 라우트 설정 등)
export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index" // app/(tabs)/index.tsx
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? 'home' : 'home-outline'} size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Login" // app/(tabs)/Login.tsx
        options={{
          title: 'Login',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? 'log-in' : 'log-in-outline'} size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}