import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface LogoProps {
  onClick?: () => void;
}

export function Logo({ onClick }: LogoProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity 
        onPress={onClick}
        activeOpacity={0.8}
        style={styles.logoBox}
      >
        <Text style={styles.logoText}>M</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  logoBox: {
    width: 64, // w-16
    height: 64, // h-16
    backgroundColor: 'black',
    borderRadius: 8, // rounded-lg
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16, // mb-4
  },
  logoText: {
    color: 'white',
    fontSize: 24, // text-2xl
    fontWeight: 'bold',
  },
});
