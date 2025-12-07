import { LoginScreen } from '../features/auth/LoginScreen';
import { useRouter } from 'expo-router';

export default function LoginPage() {
  const router = useRouter();

  return (
    <LoginScreen 
      onSwitchToSignup={() => router.push('/Signup')}
      onLogoClick={() => router.push('/(tabs)')}
      onLoginSuccess={() => router.push('/(tabs)')}
      onFindIdClick={() => router.push('/FindId')}
      onFindPasswordClick={() => router.push('/FindPassword')}
    />
  );
}
