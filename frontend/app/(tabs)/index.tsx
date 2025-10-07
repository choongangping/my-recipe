// 이 파일은 라우팅을 위한 진입점(entry point) 역할을 합니다.
// 실제 화면 구현은 @/features/home/screens/HomeScreen.tsx 에 있습니다.
import HomeScreen from '@/features/home/HomeScreen';

export default function HomePage() {
  // 실제 화면 컴포넌트를 반환합니다.
  // 이 파일을 직접 수정하기보다는, 실제 로직이 담긴 HomeScreen 컴포넌트를 수정하는 것이 좋습니다.
  return <HomeScreen />;
}
