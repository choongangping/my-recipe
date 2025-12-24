import { HomeScreen } from '../../features/home/HomeScreen';
import { useRouter } from 'expo-router';
import { useState } from 'react';

export default function HomePage() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Global auth state management needed later

  const handleLogout = () => {
    setIsLoggedIn(false);
    // In a real app, clear tokens etc.
  };

  return (
    <HomeScreen 
      onLogoClick={() => {}} // Already on home
      onRecipeClick={(id) => router.push(`/recipe/${id}` as any)}
      isLoggedIn={isLoggedIn}
      onLogout={handleLogout}
      onLoginClick={() => router.push('/Login')}
      onWriteClick={() => {
        if (!isLoggedIn) {
            router.push('/Login');
            return;
        }
        router.push('/recipe/Write');
      }}
      onRecipeListClick={() => router.push('/(tabs)/Recipe')}
      onRefrigeratorClick={() => router.push('/(tabs)/Refrigerator')}
      onMealPlanClick={() => router.push('/(tabs)/MealPlan')}
      onProfileClick={() => router.push('/(tabs)/Profile')}
    />
  );
}
