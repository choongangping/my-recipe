import { StyleSheet, Text, View } from 'react-native';

// 홈화면 컴포넌트
export default function HomeScreen() {
  return <View style={styles.container}>
    <Text>My New Home Screen</Text>
  </View>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});