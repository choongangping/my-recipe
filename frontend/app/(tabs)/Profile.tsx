import { ProfileScreen } from '../../features/profile/ProfileScreen';
import { useRouter } from 'expo-router';

export default function ProfilePage() {
  const router = useRouter();

  return (
    <ProfileScreen 
      onBack={() => router.back()}
      onEditProfileClick={() => router.push('/profile/Edit')}
      onMyRecipesClick={() => router.push('/profile/MyRecipes')}
      onMyCommentsClick={() => router.push('/profile/MyComments')}
      onMyLikesClick={() => router.push('/profile/MyLikes')}
      onMyBookmarksClick={() => router.push('/profile/MyBookmarks')}
      onNoticeClick={() => router.push('/notice/List')}
      onTermsClick={() => router.push('/profile/Terms')}
      onInquiryClick={() => router.push('/profile/Inquiry')}
      onInfluencerRegisterClick={() => router.push('/profile/InfluencerRegister')}
    />
  );
}
