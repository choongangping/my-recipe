import { NoticeDetailScreen } from '../../features/notice/NoticeDetailScreen';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function NoticeDetailPage() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const noticeId = Number(id);

  return (
    <NoticeDetailScreen 
      noticeId={noticeId}
      onBack={() => router.back()}
      onNoticeClick={(newId) => router.replace(`/notice/${newId}` as any)}
    />
  );
}
